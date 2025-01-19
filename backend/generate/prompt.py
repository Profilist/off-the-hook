from generate.client import OpenAIClient
from typing import Tuple

def generate_victim_story(name: str, amount: int) -> Tuple[str, int]:
    client = OpenAIClient()
    
    prompt = f"""Create a sad story (4 sentences max) about a student named {name} struggling with money that was just lost ${amount} through phishing. Make it sad and impactful, possibilities include:
- What they dreamt of buying since they were a child
- Family being poor and dependent on them
- Unable to pay rent/tuition and took out loans
Make it creative. Remember, 4 sentences at most."""

    try:
        response = client.generate_text(
            prompt=prompt,
            max_tokens=150,
            temperature=0.8
        )
        
        return response['text'].strip(), response['usage']
        
    except Exception as e:
        print(f"[ERROR] Failed to generate victim story: {str(e)}")
        fallback = f"{name} lost ${amount} to a phishing scam, devastating their hopes of paying this semester's tuition."
        return fallback, 0
