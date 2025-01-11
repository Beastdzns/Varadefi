import { ApiPromise, WsProvider } from '@polkadot/api';
import twilio from 'twilio';
import axios from 'axios';
import Web3 from 'web3';

// Twilio credentials
const accountSid = '';  // Twilio Account SID
const authToken = '';    // Twilio Auth Token
const twilioPhoneNumber = '';  // Your Twilio phone number
const toPhoneNumber = '';  // Your phone number (make sure it's verified in Twilio)

// The Polkadot address you want to check balance for
const address = '5CvbeMNoxZapSqk8gmdUxHQ4m85FdcHhsydG18ZWKTYRUzhv';  // Replace with your Polkadot address

// Ethereum Mainnet ERC20 Token Contract Address
const tokenAddress = '0xee60cC37640540233b658466579004De4A0136e5'; // Your ERC20 Token contract address
const tokenSymbol = 'ETH'; // Token symbol (e.g., "USDT", "ETH", "DAI")

// Gemini API key
const GEMINI_API_KEY = ''; // Your Gemini API Key
const geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'; // Gemini API URL

// Initialize web3 with an Infura or Alchemy endpoint (Ethereum Mainnet)
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/'));

// ERC20 Token ABI (Standard ABI for ERC20 token balanceOf method)
const erc20Abi = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

// Initialize the ERC20 contract
const tokenContract = new web3.eth.Contract(erc20Abi, tokenAddress);

// Function to get balance from Polkadot testnet
async function getBalance() {
    try {
        // Connect to the Vara testnet
        const provider = new WsProvider('wss://testnet.vara.network');
        const api = await ApiPromise.create({ provider });

        // Fetch the balance of the provided address
        const { data: balance } = await api.query.system.account(address);

        // Extract the free and reserved balances
        const freeBalance = balance.free.toString();
        const reservedBalance = balance.reserved.toString();

        console.log(`Free balance: ${freeBalance}`);
        console.log(`Reserved balance: ${reservedBalance}`);

        // Get the ERC20 token balance for the specified address
        const erc20Balance = await getERC20Balance(address);
        console.log(`ERC20 Balance for ${tokenSymbol}: ${erc20Balance}`);

        // Call Gemini API for content generation (e.g., explaining AI)
        const geminiResponse = await generateGeminiContent('Explain how AI works');
        
        // Make the Twilio call and send SMS with balance details, Gemini response, and ERC20 balance
        await makeCall(freeBalance, reservedBalance, geminiResponse, erc20Balance);
        await sendSMS(freeBalance, reservedBalance, geminiResponse, erc20Balance);

        // Disconnect the API
        await api.disconnect();
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}

// Function to get ERC20 token balance
async function getERC20Balance(address) {
    try {
        const balance = await tokenContract.methods.balanceOf(address).call();
        return web3.utils.fromWei(balance, 'ether');  // Convert balance from Wei to Ether
    } catch (error) {
        console.error('Error fetching ERC20 balance:', error);
        return '0';
    }
}

// Function to call Gemini API to generate content
async function generateGeminiContent(queryText) {
    try {
        const response = await axios.post(geminiApiUrl, {
            contents: [{
                parts: [{ text: queryText }]
            }]
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                key: GEMINI_API_KEY
            }
        });

        // Return the response content from Gemini
        const generatedText = response.data.generatedText || 'Sorry, I couldn\'t generate content.';
        return generatedText;
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        return 'Failed to get response from Gemini.';
    }
}

// Function to make the Twilio call
async function makeCall(freeBalance, reservedBalance, geminiResponse, erc20Balance) {
    try {
        // Create Twilio client
        const client = twilio(accountSid, authToken);

        // Create TwiML for the call
        const twiml = `<Response>
                          <Say voice="alice">Your Polkadot account balance is as follows.</Say>
                          <Say voice="alice">Free balance: ${freeBalance}.</Say>
                          <Say voice="alice">Reserved balance: ${reservedBalance}.</Say>
                          <Say voice="alice">Here is a response from Gemini AI: ${geminiResponse}</Say>
                          <Say voice="alice">Your ERC20 token balance for ${tokenSymbol} is: ${erc20Balance}</Say>
                      </Response>`;

        // Make the call
        const call = await client.calls.create({
            to: `+91${toPhoneNumber}`,  // Phone number to receive the call (with country code for India)
            from: twilioPhoneNumber,  // Twilio phone number
            twiml: twiml  // TwiML for the call
        });

        console.log('Call initiated:', call.sid);
    } catch (error) {
        console.error('Error making Twilio call:', error);
    }
}

// Function to send SMS with balance details and Gemini response
async function sendSMS(freeBalance, reservedBalance, geminiResponse, erc20Balance) {
    try {
        // Create Twilio client
        const client = twilio(accountSid, authToken);

        // Send SMS with balance and Gemini response
        const message = await client.messages.create({
            to: `+91${toPhoneNumber}`,  // Phone number to receive the SMS (with country code for India)
            from: twilioPhoneNumber,  // Twilio phone number
            body: `Your Polkadot account balance is as follows:\nFree balance: ${freeBalance}\nReserved balance: ${reservedBalance}\nGemini AI response: ${geminiResponse}\nYour ERC20 token balance for ${tokenSymbol}: ${erc20Balance}` // SMS content
        });

        console.log('SMS sent:', message.sid);
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
}

// Run the function to fetch balance, call Gemini API, and make the call
getBalance();
//  fetch the balance
