

---

# **Varadefi: Crypto Mutual Fund Solution**  

## **Overview**  

Varadefi aims to tackle key challenges in the cryptocurrency space by providing a streamlined, user-friendly crypto mutual fund solution. The platform allows users to invest in a diversified portfolio of tokens at a fixed investment price, simplifying the investment process and reducing risk. Additionally, Varadefi integrates AI-powered features to optimize portfolio management and provide personalized recommendations and insights for better decision-making. The project leverages **OpenAI** and **Gemini** for advanced AI-driven portfolio management through the **Goat SDK**.

A key feature of Varadefi is the **Call AI Agent**, which provides users with an easy and accessible way to manage their investments via phone calls. This ensures that users who prefer voice communication have a seamless experience.

---

## 🚀 **Project Overview**  

This project consists of three main components:

### **1. Frontend**  
The user interface that enables users to manage and monitor their crypto investments, offering a seamless, interactive experience.

### **2. Call AI Agent**  
A voice-based interaction system that allows users to manage their accounts and investments through phone calls, powered by **Twilio**.

### **3. Rust Smart Contracts**  
High-performance, secure blockchain contracts for transparent and efficient operations.  

---

## 🛠️ **Setup Requirements**  

### **1. Frontend Prerequisites**  
To run the frontend, ensure the following:

- **Node.js** (latest LTS version).  
- Create an `.env` file in the frontend directory and add your **OpenAI API key**:  
  ```plaintext  
  OPENAI_API_KEY=<your_openai_api_key>  
  ```

### **2. Call AI Agent Prerequisites**  
To use the call AI agent functionality, you need the following:

- **Python 3.9** or above.  
- **Twilio credentials and phone numbers**:  
  ```plaintext  
  TWILIO_ACCOUNT_SID=<your_twilio_account_sid>  
  TWILIO_AUTH_TOKEN=<your_twilio_auth_token>  
  TWILIO_PHONE_NUMBER=<your_twilio_phone_number>  
  USER_PHONE_NUMBER=<your_phone_number>  
  ```

- **Gemini API keys** for integration:  
  ```plaintext  
  GEMINI_API_KEY=<your_gemini_api_key>  
  GEMINI_API_SECRET=<your_gemini_api_secret>  
  ```

### **3. Rust Smart Contracts Prerequisites**  
For building and deploying Rust smart contracts, ensure the following:

- **Rust** (latest stable version).  
- **Cargo** (Rust package manager).

---

## 💻 **Tech Stack Used**  

Varadefi is built using the following technologies:

- **Vara Network**  
- **Rust**  
- **Sails Framework**  
- **Typescript**  
- **NextJS**  
- **Spline**  
- **Twilio**  
- **GoatSDK**  
- **Gemini**  
- **GPT-4**  

---

## 📋 **Final Notes**  

- Ensure all necessary API keys and environment variables are configured correctly in your `.env` files.  
- Each component (Frontend, Call AI Agent, and Rust Contracts) must be set up independently before testing the full system.  
- If you encounter any issues, ensure that your credentials for **Twilio** and **Gemini** are valid and up to date.  

---

Start your journey with **Varadefi**, and experience the future of crypto investing today! 🚀
