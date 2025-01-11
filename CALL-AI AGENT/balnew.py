import requests
from twilio.rest import Client

# Twilio credentials
account_sid = 'ACb06c9baad443fc7ec1381cbfebdd2722'  # Your Twilio Account SID
auth_token = '662af479bee5cd5ee54e611dcc82e012'   # Your Twilio Auth Token
twilio_phone_number = '+15704389358'  # Your Twilio phone number
to_phone_number = '885649368'  # Your verified phone number (with country code)

# Wallet address
wallet_address = '5CvbeMNoxZapSqk8gmdUxHQ4m85FdcHhsydG18ZWKTYRUzhv'

# Function to fetch the balance
def get_balance():
    url = "https://testnet.vara.network"
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "method": "state_getStorage",
        "params": [
            "0x0000000000000000000000000000000000000000000000000000000000000000",  # Change this with correct hex if needed
            wallet_address  # Using the wallet address provided
        ],
        "id": 1,
        "jsonrpc": "2.0"
    }
    
    # Send request to fetch the balance
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200:
        result = response.json()
        print(result)
        # Assuming you can fetch the balance from the response here
        return result  # Adjust this line according to the actual response format
    else:
        print(f"Error fetching balance: {response.status_code}")
        return None

# Function to make a call via Twilio
def make_call(free_balance, reserved_balance):
    client = Client(account_sid, auth_token)

    # Call the user and read out the balance
    call = client.calls.create(
        to=f"+91{to_phone_number}",  # Phone number to call with country code (India)
        from_=twilio_phone_number,
        twiml=f"<Response><Say>Your Polkadot account balance is as follows.</Say><Say>Free balance: {free_balance}.</Say><Say>Reserved balance: {reserved_balance}.</Say></Response>"
    )

    print(f"Call initiated: {call.sid}")

# Main function
def main():
    balance = get_balance()
    
    if balance:
        # Extract the balance values (you may need to parse the response based on your needs)
        free_balance = balance.get('free_balance', 'Not Available')  # Example, update based on actual response
        reserved_balance = balance.get('reserved_balance', 'Not Available')  # Example, update based on actual response
        make_call(free_balance, reserved_balance)

if __name__ == "__main__":
    main()
## extraxtnig the balance from the response and calling the user with the balance