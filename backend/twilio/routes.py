from flask import Blueprint, request, jsonify, session
from settings import Settings
from flask_cors import cross_origin

twilio_routes = Blueprint('auth', __name__)
twilio_api_key = Settings.twilio_credentials.apiKey

@twilio_routes.route('/send', methods=['POST'])
def send():
   return "test"
