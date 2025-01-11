Project README
==============

Overview
--------

Our project aims to address several critical challenges in the crypto space by offering a crypto mutual fund solution. It allows users to invest in a diversified portfolio of tokens at a fixed investment price, simplifying the investment process. The project also integrates AI to help users optimize their portfolios and manage their wallets, offering personalized recommendations and insights for better decision-making. Additionally, the integration of a call bot for account management allows users to manage their investments via phone calls, providing an easy and accessible way to interact for those who prefer voice communication.

Steps to Run the Project
------------------------

### Frontend

1.  Navigate to the frontend/ directory.
    
2.  npm install
    
3.  npm run dev
    

### Deploying the Smart Contract

1.  Navigate to the contract/ directory.
    
2.  Download and install [Rust](https://www.rust-lang.org/).
    
3.  cargo build --release
    
4.  Go to the target/wasm32-unknown-unknown/release folder and upload app\_name.opt.wasm as the program on the Vara Network.
    
5.  Upload the .idl file as metadata.
    

Your smart contract is now deployed and ready to use.

Tech Stack Used
---------------

*   **Vara Network**
    
*   **Rust**
    
*   **Sails Framework**
    
*   **Typescript**
    
*   **NextJS**
    
*   **Spline**
    
*   **Twilio**
