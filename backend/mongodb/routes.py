from flask import Blueprint, jsonify, request
from pymongo import MongoClient
from datetime import datetime, timedelta, timezone
import uuid
import jwt
from settings import Settings

# Load configuration
config = Settings()

# Initialize MongoDB client and database
client = MongoClient(config.mongodb.uri)
db = client["db"]

# Create a Flask Blueprint for MongoDB-related routes
mongo_routes = Blueprint('mongo_routes', __name__)

# Route to generate a login URL for a user
@mongo_routes.route('/generate_login_url/<user_id>', methods=['GET'])
def generate_login_url(user_id):
    try:
        
        user = db.users.find_one({'user_id': '94fbc927-93d7-401d-9efe-a95521562ac3'})
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Generate a unique session ID and set expiration time
        session_id = str(uuid.uuid4())
        expiration_time = datetime.now(timezone.utc) + timedelta(days=1)
        # Create a JWT token with user details
        token = jwt.encode(
            {
                'user_id': user_id,
                'session_id': session_id,
                'exp': expiration_time
            },
            config.mongodb.JWTSettings.secret,
            algorithm=config.mongodb.JWTSettings.algorithm
        )
        
        # Update the user document with the new session details
        db.users.update_one(
            {'user_id': user_id},
            {
                '$set': {
                    'session_id': session_id,
                    'session_token': token,
                    'status': 'Active',
                    'expiration_time': expiration_time.isoformat()
                }
            }
        )

        # Generate the login URL
        login_url = f"http://my-rbc.us/login?token={token}"
        return jsonify({'login_url': login_url}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Route to handle auto-login using a token
@mongo_routes.route('/login', methods=['GET'])
def login():
    # Extract the token from the query parameters
    token = request.args.get('token')
    if not token:
        return jsonify({'error': 'Token is missing'}), 400

    try:
        # Decode the JWT token
        data = jwt.decode(
            token,
            config.mongodb.JWTSettings.secret,
            algorithms=[config.mongodb.JWTSettings.algorithm]
        )

        # Find the user in the database
        user_id = data['user_id']
        user = db.users.find_one({'user_id': user_id})
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Prepare user information to return
        user_info = {
            'name': f"{user['fname']} {user['lname']}",
            'balance': user['balance'],
            'phished': user['phished'],
            'session': {
                'token': user['session_token'],
                'session_id': user['session_id'],
                'status': user['status']
            }
        }

        return jsonify(user_info), 200

    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired'}), 400
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 400

# Route to fetch user details by user_id
@mongo_routes.route('/user/<user_id>', methods=['GET'])
def get_user(user_id):
    try:
        # Find the user in the database
        user = db.users.find_one({'user_id': user_id})
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Prepare user information to return
        user_info = {
            'name': f"{user['fname']} {user['lname']}",
            'balance': user['balance'],
            'phished': user['phished'],
            'session': {
                'token': user['session_token'],
                'session_id': user['session_id'],
                'status': user['status']
            }
        }

        return jsonify(user_info), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400