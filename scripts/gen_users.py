import uuid
import datetime
import json
import random

# Predefined unique lists to ensure no duplicates
FIRST_NAMES = ["John", "Jane", "Alice", "Bob", "Charlie", "Diana", "Evan", "Fiona", "George", "Hannah"]
LAST_NAMES = ["Doe", "Smith", "Johnson", "Brown", "Williams", "Taylor", "Anderson", "Thomas", "Moore", "Jackson"]
ACCOUNT_TYPES = ["Student Chequing", "Savings", "Credit", "Investment"]
CARD_TYPES = ["Visa Debit", "MasterCard", "AMEX"]
DEVICES = ["MacBook Pro", "iPhone 13", "Windows PC", "Android Phone"]
LOCATIONS = ["Toronto, ON", "Vancouver, BC", "Calgary, AB", "Montreal, QC"]

def generate_balance():
    """Generate a random balance between 1 and 10000."""
    return round(random.uniform(1, 10000), 2)

def generate_session_token():
    """Generate a unique session token by stripping '-' from a UUID."""
    return str(uuid.uuid4()).replace("-", "")

def generate_user_profiles(user_id, index):
    """Generate a unique user profile without any duplicates or empty fields."""
    fname = FIRST_NAMES[index % len(FIRST_NAMES)]
    lname = LAST_NAMES[index % len(LAST_NAMES)]
    email = f"{fname.lower()}.{lname.lower()}{index}@example.com"
    phone_number = f"+1-555-{100 + index % 900}-{1000 + index % 9000}"
    address = f"{100 + index} {['Main', 'Elm', 'Maple', 'Pine'][index % 4]} St, Toronto, ON"
    account_type = ACCOUNT_TYPES[index % len(ACCOUNT_TYPES)]
    card_type = CARD_TYPES[index % len(CARD_TYPES)]
    defense_score = 100 - index  # Ensure decreasing defense score
    loot = float((index + 1) * 100)  # Ensure increasing loot

    user_profiles = {
        "user_id": user_id,
        "fname": fname,
        "lname": lname,
        "email": email,
        "phone_number": phone_number,
        "address": address,
        "age": 18 + (index % 13),  # Age between 18 and 30
        "account_type": account_type,
        "bank_cards": [
            {
                "card_type": card_type,
                "card_number": f"**** **** **** {1000 + index}",
                "expiry_date": f"{(index % 12) + 1}/29"
            }
        ],
        "defense_score": defense_score,
        "phished": False if index % 2 == 0 else True,  # Alternating pattern
        "loot": loot,
        "referral": "",  # Empty referral upon initialization
        "victims" : 0,
        "balance": generate_balance()
    }
    return user_profiles

def generate_user_session(user_id, index):
    """Generate a unique user session with guaranteed data."""
    session_id = str(uuid.uuid4())
    session_token = generate_session_token()
    device = DEVICES[index % len(DEVICES)]
    location = LOCATIONS[index % len(LOCATIONS)]
    ip_address = f"192.168.{index // 256}.{index % 256}"
    
    user_session = {
        "session_id": session_id,
        "user_id": user_id,
        "session_token": session_token,
        "status": "Active",
        "login_attempts": 1,
        "device": device,
        "location": location,
        "ip_address": ip_address,
        "expiration_time": (
            datetime.datetime.utcnow() + datetime.timedelta(days=1)
        ).isoformat() + "Z",
        "last_active": datetime.datetime.utcnow().isoformat() + "Z"
    }
    return user_session

def generate_data(n=50):
    """Generate n unique user profiles and sessions."""
    user_profiles = []
    user_sessions = []

    for index in range(n):
        user_id = str(uuid.uuid4())
        user_profiles.append(generate_user_profiles(user_id, index))
        user_sessions.append(generate_user_session(user_id, index))

    return user_profiles, user_sessions

if __name__ == "__main__":
    profiles, sessions = generate_data(50)
    
    with open("user_profiles.json", "w") as f:
        json.dump(profiles, f, indent=2)
    
    with open("session_data.json", "w") as f:
        json.dump(sessions, f, indent=2)
    
    print("Generated 50 unique user profiles and sessions.")
