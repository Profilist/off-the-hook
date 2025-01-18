import uuid
import random
import datetime
import json

# Function to generate a random session token
def generate_session_token():
    return str(uuid.uuid4()).replace("-", "")

# Function to generate a single user entry
def generate_user():
    first_names = ["John", "Jane", "Alice", "Bob", "Charlie", "Diana", "Evan", "Fiona", "George", "Hannah"]
    last_names = ["Doe", "Smith", "Johnson", "Brown", "Williams", "Taylor", "Anderson", "Thomas", "Moore", "Jackson"]
    statuses = ["Active", "Expired", "Revoked"]
    
    fname = random.choice(first_names)
    lname = random.choice(last_names)
    email = f"{fname.lower()}.{lname.lower()}{random.randint(1, 100)}@example.com"
    
    user_data = {
        "user_id": str(uuid.uuid4()),
        "fname": fname,
        "lname": lname,
        "email": email,
        "session_id": str(uuid.uuid4()),
        "session_token": generate_session_token(),
        "status": random.choice(statuses),
        "balance": round(random.uniform(100.0, 10000.0), 2),
        "expiration_time": (datetime.datetime.utcnow() + datetime.timedelta(minutes=random.randint(15, 120))).isoformat() + "Z",
        "phished": random.choice([True, False])
    }
    return user_data

# Generate 50 users
def generate_users(n=50):
    return [generate_user() for _ in range(n)]

# Generate and save to a JSON file
if __name__ == "__main__":
    users = generate_users(50)
    with open("sample_users.json", "w") as f:
        json.dump(users, f, indent=2)
    print("50 user records generated and saved to sample_users.json")