from flask import Flask, request, jsonify, session
from flask_cors import CORS
from settings import Settings
from twilio.routes import twilio_routes

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/')
def index():
    return "test"

app.register_blueprint(twilio_routes, url_prefix='/email')
