"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import styled from "styled-components";

// Extend the Window interface to include the `wallet` property
declare global {
  interface Window {
    wallet?: {
      isConnected: boolean;
      address?: string;
    };
  }
}

// Define the options for the dropdown
const tokenOptions = [
  { label: "Vara", value: "Vara" },
  { label: "WrappedETH", value: "WrappedETH" },
  { label: "WrappedBTC", value: "WrappedBTC" },
];

const BucketComponent = () => {
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [percentages, setPercentages] = useState<{ [key: string]: number }>({});
  const [error, setError] = useState<string>("");
  const [buckets, setBuckets] = useState<Array<{ [key: string]: number }>>([]);
  const [investmentAmount, setInvestmentAmount] = useState<number | "">("");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    // Set wallet address if connected
    if (window.wallet?.isConnected) {
      setWalletAddress(window.wallet.address || null);
    }
  }, []);

  const handleTokenChange = (selected: any) => {
    const selectedValues = selected ? selected.map((item: { value: string }) => item.value) : [];
    setSelectedTokens(selectedValues);
  };

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>, token: string) => {
    const value = e.target.value;
    if (!value || /^\d+$/.test(value)) {
      setPercentages((prev) => ({ ...prev, [token]: value ? Number(value) : 0 }));
    }
  };

  const handleSubmit = () => {
    const total = Object.values(percentages).reduce((acc, value) => acc + value, 0);
    if (total !== 100) {
      setError("The total percentage must add up to 100.");
      return;
    }
    setError("");
    setBuckets((prev) => [...prev, percentages]);
    setPercentages({});
    setSelectedTokens([]);
  };

  const handleInvest = async (bucketIndex: number) => {
    if (!walletAddress) {
      alert("Please connect your wallet to proceed.");
      return;
    }

    if (!investmentAmount) {
      alert("Please enter the investment amount.");
      return;
    }

    const bucket = buckets[bucketIndex];
    try {
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bucket,
          amount: investmentAmount,
          walletAddress, // Include wallet address in the transaction
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Transaction created:", result);
        alert("Transaction successfully created!");
      } else {
        console.error("Error creating transaction:", result.error);
        alert("Failed to create transaction. Check console for details.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An error occurred. Check the console for details.");
    }
  };

  return (
    <Container>
      <Title>Create a Token Bucket</Title>
      <Select
        isMulti
        options={tokenOptions}
        onChange={handleTokenChange}
        value={tokenOptions.filter((option) => selectedTokens.includes(option.value))}
        placeholder="Select Tokens"
        styles={customSelectStyles}
      />
      {selectedTokens.map((token) => (
        <InputWrapper key={token}>
          <Label>{token} Percentage:</Label>
          <PercentageInput
            type="number"
            value={percentages[token] || 0}
            onChange={(e) => handlePercentageChange(e, token)}
            min={0}
            max={100}
          />
        </InputWrapper>
      ))}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ButtonWrapper>
        <SubmitButton onClick={handleSubmit}>Create Bucket</SubmitButton>
      </ButtonWrapper>
      <BucketsWrapper>
        {buckets.map((bucket, index) => (
          <BucketDiv key={index}>
            <BucketTitle>Bucket #{index + 1}</BucketTitle>
            <TokenList>
              {Object.entries(bucket).map(([token, percentage]) => (
                <TokenItem key={token}>
                  {token}: {percentage}%
                </TokenItem>
              ))}
            </TokenList>
            <InputWrapper>
              <Label>Investment Amount:</Label>
              <PercentageInput
                type="number"
                value={investmentAmount || ""}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                min={0}
              />
            </InputWrapper>
            <InvestButton onClick={() => handleInvest(index)}>Invest</InvestButton>
          </BucketDiv>
        ))}
      </BucketsWrapper>
    </Container>
  );
};

export default BucketComponent;

// Styled components
const InvestmentSection = styled.div`
  margin-top: 20px;
`;


// Styled components
const Container = styled.div`
  background-color: #1f1f1f;
  color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  width: 400px;
  margin: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #ffffff;
  font-size: 24px;
  margin-bottom: 30px;
`;

const customSelectStyles = {
  control: (base: any) => ({
    ...base,
    background: '#2a2a2a',
    borderRadius: '8px',
    borderColor: '#444',
    color: '#ffffff',
    '&:hover': {
      borderColor: '#00c9b7',
    },
  }),
  singleValue: (base: any) => ({
    ...base,
    color: '#ffffff',
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: '#00c9b7',
    color: '#2a2a2a',
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: '#2a2a2a',
  }),
  option: (base: any) => ({
    ...base,
    color: '#ffffff',
    fontWeight: 'bold',
    backgroundColor: '#2a2a2a',
    '&:hover': {
      backgroundColor: '#00c9b7',
      color: '#ffffff',
    },
  }),
};

const InputWrapper = styled.div`
  margin-top: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #ffffff;
`;

const PercentageInput = styled.input`
  background-color: #2a2a2a;
  border: 1px solid #444;
  color: #ffffff;
  border-radius: 6px;
  padding: 10px;
  margin-left: 10px;
  width: 60px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #00c9b7;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4040;
  font-size: 14px;
  margin-top: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  background-color: #00c9b7;
  color: #2a2a2a;
  padding: 12px 24px;
  border-radius: 6px;
  width: 100%;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #009f8b;
  }
`;

const BucketsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;
`;

const BucketDiv = styled.div`
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 8px;
  width: 45%;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BucketTitle = styled.h2`
  color: #ffffff;
  font-size: 18px;
  margin-bottom: 10px;
`;

const TokenList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TokenItem = styled.li`
  color: #ffffff;
  font-size: 16px;
`;

const InvestButton = styled.button`
  background-color: #00c9b7;
  color: #2a2a2a;
  padding: 8px 16px;
  border-radius: 6px;
  margin-top: 10px;
  width: 100%;
  border: none;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #009f8b;
  }
`;