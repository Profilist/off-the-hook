from flask import Blueprint, request, jsonify, session
from settings import Settings
from flask_cors import cross_origin
from settings import Settings
import openai
from pymongo import MongoClient

genai_routes = Blueprint('genai_routes', __name__)

# Load configuration
config = Settings()

# Initialize MongoDB client
client = MongoClient(config.mongodb.uri)
db = client[config.mongodb.database_name]
users_collection = db['user_profiles']

@genai_routes.route('/generate_email', methods=['GET'])
@cross_origin()
def generate_email(user_id):
    # try:
    #     user_id = str(user_id)
    #     print(f"[DEBUG] Generating email for user_id: {user_id}")

    #     # Fetch user details from user_profiles
    #     users, info  = fetch_user_and_sessions(user_id)
    #     print(f"[DEBUG] User lookup result: {user}")

    #     if not user:
    #         print("[ERROR] User not found.")
    #         return jsonify({'error': 'User not found'}), 404

    #     # Generate email content
    #     email_subject = "Important Notice Regarding Your RBC Account"
    #     email_body = (
    #         f"Dear {user['fname']} {user['lname']},\n\n"
    #         f"We've noticed suspicious activity on your RBC account. "
    #         f"Please verify your account immediately by clicking the link below:\n\n"
    #         f"http://my-rbc.us/verify?user={user_id}\n\n"
    #         "If you do not verify within 24 hours, your account may be temporarily suspended.\n\n"
    #         "Best Regards,\nRBC Security Team"
    #     )

    #     print("[DEBUG] Email generated successfully.")

    #     return jsonify({
    #         'email_subject': email_subject,
    #         'email_body': email_body,
    #         'generated_for': f"{user['fname']} {user['lname']}"
    #     }), 200

    # except Exception as e:
    #     print(f"[ERROR] Exception in generate_email: {str(e)}")
    #     return jsonify({'error': str(e)}), 500