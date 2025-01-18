from flask import Flask, request, jsonify, session
from flask_cors import CORS
from settings import Settings
from twilio.routes import twilio_routes
from users.routes import user_routes

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.register_blueprint(twilio_routes, url_prefix='/email')
app.register_blueprint(user_routes, url_prefix='/users')

@app.route('/')
def index():
    return "test"
