Project README
==============

Overview
--------

Our project aims to address several critical challenges in the crypto space by offering a crypto mutual fund solution. It allows users to invest in a diversified portfolio of tokens at a fixed investment price, simplifying the investment process. The project also integrates AI to help users optimize their portfolios and manage their wallets, offering personalized recommendations and insights for better decision-making. The integration of OpenAI and Gemini for advanced AI-driven portfolio management is facilitated through the use of the Goat SDK.

Additionally, the integration of a call bot for account management allows users to manage their investments via phone calls, providing an easy and accessible way to interact for those who prefer voice communication.

🚀 Project Overview
This project consists of three main components:

Frontend: The user interface to manage and monitor your investments.
Call AI Agent: A voice-based interaction system for managing accounts, powered by Twilio.
Rust Smart Contracts: High-performance blockchain contracts for secure, transparent operations.




Steps to Run the Project
🛠️ Setup Requirements
1. Frontend Prerequisites
Node.js (latest LTS version).
.env file in the frontend directory with the following key:
plaintext
Copy code
OPENAI_API_KEY=<your_openai_api_key>  
2. Call AI Agent Prerequisites
Python 3.9 or above.
Twilio credentials and phone numbers:
plaintext
Copy code
TWILIO_ACCOUNT_SID=<your_twilio_account_sid>  
TWILIO_AUTH_TOKEN=<your_twilio_auth_token>  
TWILIO_PHONE_NUMBER=<your_twilio_phone_number>  
USER_PHONE_NUMBER=<your_phone_number>  
Gemini API keys for integration:
plaintext
Copy code
GEMINI_API_KEY=<your_gemini_api_key>  
GEMINI_API_SECRET=<your_gemini_api_secret>  
3. Rust Smart Contracts Prerequisites
Rust (latest stable version).
Cargo (Rust package manager).
Tech Stack Used
---------------

*   **Vara Network**
    
*   **Rust**
    
*   **Sails Framework**
    
*   **Typescript**
    
*   **NextJS**
    
*   **Spline**
    
*   **Twilio**
  
*   **GoatSDK**

*   **Gemini**

*   **GPT-4**
