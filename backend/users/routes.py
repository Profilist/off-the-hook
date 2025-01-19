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

user_routes = Blueprint('mongo_routes', __name__)

# --------------------------------------------------------------------------
# 1. generate_login_url: 
#    - Fetch user from user_profiles
#    - Create new session in session_data
#    - Return a login URL with JWT token
# --------------------------------------------------------------------------
@user_routes.route('/generate_login_url/', methods=['POST'])
def generate_login_url():
    """
    Generate a one-time login URL for the given user.
    - Looks up user in 'user_profiles' by user_id.
    - Creates a new session entry in 'session_data'.
    - Returns a login URL containing the JWT token.
    """
    try:
        data = request.get_json()
        
        required_fields = ['email', 'ref_id']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400     
        
        email = str(data['email'])
        referrer = str(data['ref_id'])
        # 1) Find user in user_profiles
        user = db.user_profiles.find_one({'email': email})
        print(f"[DEBUG] User lookup result: {user}")

        if not user:
            print(f"[ERROR] User with email {email} not found in user_profiles.")
            return jsonify({'error': 'User not found'}), 404
        if bool(user['phished']):
            print(f"[ERROR] User already phished.")
            return jsonify({'error' : 'User already phished'}), 404

        # 2) Generate session_id, expiration_time, and JWT token
        session_id = str(uuid.uuid4())
        expiration_time = datetime.now(timezone.utc) + timedelta(days=30)

        print("[DEBUG] Generating JWT token")
        print(f"[DEBUG] JWT Secret: {config.jwt.secret}")  # *Note: Avoid in production logs

        
        user_id = str(user['user_id'])
        user = db.user_profiles.find_one(
            {"user_id" : user_id}
        )
        
        db.user_profiles.update_one(
            {"user_id" : user_id},
            {"$set" : {
                "referral" : referrer
            }}
        )

        token_payload = {
            'user_id': user_id,
            'session_id': session_id,
            'exp': expiration_time
        }
        token = jwt.encode(
            token_payload,
            config.jwt.secret,
            algorithm=config.jwt.algorithm
        )
        print(f"[DEBUG] Generated JWT Token: {token}")

        # 3) Insert a new document into session_data
        session_doc = {
            'session_id': session_id,
            'user_id': user_id,
            'session_token': token,       # Store the JWT token in session_data
            'status': 'Active',
            'login_attempts': 0,
            'device': 'Unknown',
            'location': 'Unknown',
            'ip_address': request.remote_addr,
            'expiration_time': expiration_time.isoformat(),
            'last_active': datetime.now(timezone.utc).isoformat()
        }
        db.session_data.insert_one(session_doc)
        print("[DEBUG] Inserted new session document into session_data")

        # 4) Return the login URL
        login_url = f"http://my-rbc.us/login?token={token}"
        print(f"[DEBUG] Returning login URL: {login_url}")

        name = user['fname'] + " " + user['lname']

        return jsonify({'login_url': login_url, 'name' : name}), 200

    except Exception as e:
        print(f"[ERROR] Exception occurred in generate_login_url: {str(e)}")
        return jsonify({'error': str(e)}), 400

# --------------------------------------------------------------------------
# 2. login:
#    - Decode JWT token
#    - Validate user in user_profiles
#    - Validate and update session in session_data
#    - Return user + session info
# --------------------------------------------------------------------------
@user_routes.route('/login', methods=['GET'])
def login():
    """
    Handle auto-login from a JWT token (e.g., accessed via generated URL).
    - Decodes the token and finds matching session in session_data.
    - If valid, updates session status/last_active (and optionally other fields).
    - Returns user information plus session details.
    """
    token = request.args.get('token')
    print(f"[DEBUG] Received token: {token}")

    if not token:
        print("[ERROR] Token is missing from request")
        return jsonify({'error': 'Token is missing'}), 400

    try:
        print(f"[DEBUG] Decoding token with JWT Secret: {config.jwt.secret}")
        data = jwt.decode(token, config.jwt.secret, algorithms=[config.jwt.algorithm])
        print(f"[DEBUG] Decoded token data: {data}")

        # 1) Extract user_id and session_id from the token
        user_id = str(data['user_id'])
        session_id = str(data['session_id'])

        db.user_profiles.update_one(
            {'user_id': user_id},
            {'$set': {
                'phished': True
            }}
        )

        # 2) Find user in user_profiles
        user = db.user_profiles.find_one({'user_id': user_id})
        print(f"[DEBUG] user_profiles lookup result: {user}")
        if not user:
            print(f"[ERROR] User with user_id {user_id} not found in user_profiles.")
            return jsonify({'error': 'User not found'}), 404

        # 3) Find session in session_data
        session = db.session_data.find_one({'session_id': session_id, 'user_id': user_id})
        if not session:
            print(f"[ERROR] No matching session found for session_id={session_id}, user_id={user_id}")
            return jsonify({'error': 'Invalid session'}), 404

        # 4) Update session to reflect recent login activity
        #    e.g., set status to "Active", update last_active time, etc.
        db.session_data.update_one(
            {'session_id': session_id},
            {
                '$set': {
                    'status': 'Active',
                    'last_active': datetime.now(timezone.utc).isoformat()
                },
                '$inc': {
                    'login_attempts': 1  # Example: increment login attempts if desired
                }
            }
        )
        # 5) Build the response object
        user_info = {
            'user_id': user['user_id'],
            'name': f"{user['fname']} {user['lname']}",
            'email': user['email'],
            'phone_number': user['phone_number'],
            'balance' : user['balance'],
            'address': user['address'],
            'age': user['age'],
            'account_type': user['account_type'],
            'defense_score': user['defense_score'],
            'phished': user['phished'],
            'loot': user['loot'],
            'referral': user['referral'],
            'victims' : user['victims']
        }

        session_info = {
            'session_id': session['session_id'],
            'token': session['session_token'],
            'status': session['status'],
            'device': session['device'],
            'location': session['location'],
            'ip_address': session['ip_address'],
            'expiration_time': session['expiration_time'],
            'last_active': session['last_active']
        }

        referrer = db.user_profiles.find_one({'user_id': user['referral']});
        if not referrer:
            print(f"[DEBUG] Returning combined user & session info, no referral")
            return jsonify({
                'user': user_info,
                'session': session_info
            }), 200
        
        # user is the current user 
        # referrer is the person that referred the current user
        if not user.get('updated', False):  # If user has not been referred yet
            db.user_profiles.update_one(
                {'user_id': user['referral']},
                {'$inc': {'victims': 1}}
            )
            db.user_profiles.update_one(
                {'user_id': user_id},
                {'$set': {'updated': True}}
            )
       
        print(f"[DEBUG] Returning combined user & session info")
        return jsonify({
            'user': user_info,
            'session': session_info
        }), 200

    except jwt.ExpiredSignatureError:
        print("[ERROR] Token has expired")
        return jsonify({'error': 'Token has expired'}), 400
    except jwt.InvalidTokenError:
        print("[ERROR] Invalid token provided")
        return jsonify({'error': 'Invalid token'}), 400
    except Exception as e:
        print(f"[ERROR] Exception occurred in login: {str(e)}")
        return jsonify({'error': str(e)}), 400


# --------------------------------------------------------------------------
# 3. get_user:
#    - Return all user information from user_profiles
#    - Also return any sessions from session_data for that user
# --------------------------------------------------------------------------
def fetch_user_and_sessions(user_id):
    """
    Core logic to fetch user details by user_id (from user_profiles)
    and retrieve all session tokens from session_data.
    """
    user_id = str(user_id)
    print(f"[DEBUG] Fetching user info with user_id: {user_id}")

    # 1) Find the user in user_profiles
    user = db.user_profiles.find_one({'user_id': user_id})
    print(f"[DEBUG] user_profiles lookup result: {user}")

    if not user:
        print(f"[ERROR] User with user_id {user_id} not found in user_profiles.")
        return None, None

    # 2) Retrieve all sessions associated with this user from session_data
    sessions_cursor = db.session_data.find({'user_id': user_id})
    sessions = []
    for s in sessions_cursor:
        sessions.append({
            'session_id': s['session_id'],
            'token': s['session_token'],
            'status': s['status'],
            'login_attempts': s['login_attempts'],
            'device': s['device'],
            'location': s['location'],
            'ip_address': s['ip_address'],
            'expiration_time': s['expiration_time'],
            'last_active': s['last_active']
        })

    # 3) Prepare user information (all relevant fields)
    user_info = {
        'user_id': user['user_id'],
        'fname': user['fname'],
        'lname': user['lname'],
        'email': user['email'],
        'phone_number': user['phone_number'],
        'address': user['address'],
        'age': user['age'],
        'account_type': user['account_type'],
        'defense_score': user['defense_score'],
        'phished': user['phished'],
        'loot': user['loot'],
        'bank_cards': user.get('bank_cards', []),
    }

    return user_info, sessions

# called when they input email/pass
@user_routes.route('/update-loot', methods=['POST'])
def update_loot():
    try:
        data = request.get_json()
            
        required_fields = ['user_id']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400     
        
        user = db.user_profiles.find_one({'user_id': data['user_id']})
        
        print(user)
        if (bool(user['drained'])):
            return jsonify({'error' : 'User already bankrupt'}), 404
        

        db.user_profiles.update_one(
            {'user_id': user['referral']},
            {
                '$inc': {'loot': int(user['balance'])},
                '$set': {'last_hack': datetime.now(timezone.utc).isoformat()}
            }
        )

        db.user_profiles.update_one(
            {'user_id': data['user_id']},
            {
                '$set': {'drained': True}
            }
        )

        return jsonify({'success' : True}), 200
    except Exception as e:
        print(f"[ERROR] Exception occurred in update_loot: {str(e)}")
        return jsonify({'error': str(e)}), 400
    

@user_routes.route('/get-user/<user_id>', methods=['GET'])
def get_user(user_id):
    """
    Fetch user details by user_id (from user_profiles)
    and retrieve all session tokens from session_data.
    """
    try:
        user_info, sessions = fetch_user_and_sessions(user_id)
        if not user_info:
            return jsonify({'error': 'User not found'}), 404

        # Return user info + all sessions
        result = {
            'user': user_info,
            'sessions': sessions
        }

        print(f"[DEBUG] Returning user + session info: {result}")
        return jsonify(result), 200

    except Exception as e:
        print(f"[ERROR] Exception occurred in get_user: {str(e)}")
        return jsonify({'error': str(e)}), 400

# --------------------------------------------------------------------------
# 4. get_most_loot:
#    - Pull top users from user_profiles (sorted by loot desc).
# --------------------------------------------------------------------------
@user_routes.route('/most_loot', methods=['GET'])
def get_most_loot():
    """
    Fetch users from user_profiles, sorted by 'loot' descending,
    and return basic info (name, user_id, loot).
    """
    try:
        print("[DEBUG] Received request to fetch users with the most loot stolen")

        # 1) Query user_profiles, sort by loot descending
        users_cursor = db.user_profiles.find().sort('loot', -1)

        # 2) Build a list of user info
        users_info = []
        for user in users_cursor:
            users_info.append({
                'name': f"{user['fname']} {user['lname']}",
                'user_id': user['user_id'],
                'loot': user['loot']
            })

        print("[DEBUG] Returning most_loot info")
        return jsonify(users_info), 200

    except Exception as e:
        print(f"[ERROR] Exception occurred in get_most_loot: {str(e)}")
        return jsonify({'error': str(e)}), 400
