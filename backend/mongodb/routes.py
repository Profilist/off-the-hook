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
        print(f"[DEBUG] Received request to generate login URL for user_id: {user_id}")

        user = db.users.find_one({'user_id': str(user_id)})
        print(f"[DEBUG] User lookup result: {user}")

        if not user:
            print(f"[ERROR] User with user_id {user_id} not found in the database.")
            return jsonify({'error': 'User not found'}), 404

        # Generate a unique session ID and set expiration time
        session_id = str(uuid.uuid4())
        expiration_time = datetime.now(timezone.utc) + timedelta(days=1)
        
        # Debug JWT Secret
        print("[DEBUG] Generating JWT token")
        print(f"[DEBUG] JWT Secret: {config.jwt.secret}")

        # Create a JWT token with user details
        token = jwt.encode(
            {
                'user_id': user_id,
                'session_id': session_id,
                'exp': expiration_time
            },
            config.jwt.secret,
            algorithm=config.jwt.algorithm
        )

        print(f"[DEBUG] Generated JWT Token: {token}")

        # Update the user document with the new session details
        update_result = db.users.update_one(
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

        print(f"[DEBUG] MongoDB update result: {update_result.raw_result}")

        # Generate the login URL
        login_url = f"http://my-rbc.us/login?token={token}"
        print(f"[DEBUG] Generated login URL: {login_url}")

        return jsonify({'login_url': login_url}), 200

    except Exception as e:
        print(f"[ERROR] Exception occurred in generate_login_url: {str(e)}")
        return jsonify({'error': str(e)}), 400


# Route to handle auto-login using a token
@mongo_routes.route('/login', methods=['GET'])
def login():
    token = request.args.get('token')
    print(f"[DEBUG] Received token: {token}")

    if not token:
        print("[ERROR] Token is missing from request")
        return jsonify({'error': 'Token is missing'}), 400

    try:
        # Debug JWT Secret
        print(f"[DEBUG] Decoding token with JWT Secret: {config.jwt.secret}")

        # Decode the JWT token
        data = jwt.decode(
            token,
            config.jwt.secret,
            algorithms=[config.jwt.algorithm]
        )

        print(f"[DEBUG] Decoded token data: {data}")

        # Find the user in the database
        user_id = data['user_id']
        user = db.users.find_one({'user_id': user_id})
        print(f"[DEBUG] User lookup result: {user}")

        if not user:
            print(f"[ERROR] User with user_id {user_id} not found in the database.")
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

        print(f"[DEBUG] Returning user info: {user_info}")

        return jsonify(user_info), 200

    except jwt.ExpiredSignatureError:
        print("[ERROR] Token has expired")
        return jsonify({'error': 'Token has expired'}), 400
    except jwt.InvalidTokenError:
        print("[ERROR] Invalid token provided")
        return jsonify({'error': 'Invalid token'}), 400
    except Exception as e:
        print(f"[ERROR] Exception occurred in login: {str(e)}")
        return jsonify({'error': str(e)}), 400


# Route to fetch user details by user_id
@mongo_routes.route('/user/<user_id>', methods=['GET'])
def get_user(user_id):
    try:
        print(f"[DEBUG] Received request for user info with user_id: {user_id}")

        # Find the user in the database
        user = db.users.find_one({'user_id': str(user_id)})
        print(f"[DEBUG] User lookup result: {user}")

        if not user:
            print(f"[ERROR] User with user_id {user_id} not found in the database.")
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

        print(f"[DEBUG] Returning user info: {user_info}")

        return jsonify(user_info), 200

    except Exception as e:
        print(f"[ERROR] Exception occurred in get_user: {str(e)}")
        return jsonify({'error': str(e)}), 400

# Route to fetch users with the most loot stolen
@mongo_routes.route('/most_loot', methods=['GET'])
def get_most_loot():
    try:
        print("[DEBUG] Received request to fetch users with the most loot stolen")

        # Find users sorted by loot in descending order
        users = list(db.users.find().sort('loot', -1))
        
        # Prepare the list of users with required fields
        users_info = []
        for user in users:
            users_info.append({
                'name': f"{user['fname']} {user['lname']}",
                'user_id': user['user_id'],
                'loot': user['loot']
            })
        
        return jsonify(users_info), 200

    except Exception as e:
        print(f"[ERROR] Exception occurred in get_most_loot: {str(e)}")
        return jsonify({'error': str(e)}), 400
