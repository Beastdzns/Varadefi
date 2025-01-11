"use client";
import { GearApi } from '@gear-js/api';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { web3Accounts, web3Enable, web3EnablePromise, web3FromAddress } from '@polkadot/extension-dapp';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



export default function TransferTokensCard({params}:any){
    console.log(params);
    
    const [receiverWalletAddr,setReceiverWalletAddr]=useState(params.receiverWalletAddr || '5Ev9nUBbdPDb....oF8BrrArszxy');
    const [amount,setAmount]=useState(params.amount || 50);

    async function transferTokens(receiverWalletAddr:string,amount:number){
        const gearApi = await GearApi.create({
            providerAddress: 'wss://testnet.vara.network',
        });
        try{
            const allInjected = await web3Enable('TokenTechies');

            // Transfer Contract Address.
            const allAccounts = await web3Accounts();
    
            console.log(allAccounts);
    
            if (allAccounts.length === 0) {
                alert("Please Connect Wallet to Make Transaction.")
                return;
            }
            const signerAddr=allAccounts[0];
            const injector = await web3FromAddress(signerAddr.address);
            await gearApi.tx.balances
                            .transfer(receiverWalletAddr, amount)
                            .signAndSend(
                                signerAddr.address,
                                // @ts-ignore
                                { signer: injector.signer },
                                ({ status }) => {
                                    console.log(`Current status is ${status}`);
                                }
                            )
        }catch(error){
            console.error(error);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Transfer Tokens</CardTitle>
                <CardDescription className="">Transfer tokens to any wallet address.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 justify-center">

                <Input type="text" value={receiverWalletAddr} onChange={(e)=>{
                    // @ts-ignore
                    setReceiverWalletAddr(e.target.value)
                }} placeholder="Receiver Wallet Address"/>
                <Input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Amount"/>
                <Button
                    onClick={()=>{
                        // @ts-ignore
                        transferTokens(receiverWalletAddr,amount)
                    }}
                    className="w-full"
                    variant={"secondary"}
                >Transfer</Button>
            </CardContent>
        </Card>
    );

}