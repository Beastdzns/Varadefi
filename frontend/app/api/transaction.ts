import { NextApiRequest, NextApiResponse } from "next";
import { ApiPromise, WsProvider } from "@polkadot/api";

type TransactionRequestBody = {
  bucket: { [key: string]: number };
  amount: number;
  walletAddress: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { bucket, amount, walletAddress } = req.body as TransactionRequestBody;

  if (!bucket || !amount || !walletAddress) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Connect to the Vara network using a WebSocket provider
    const provider = new WsProvider("wss://<your-vara-node-endpoint>");
    const api = await ApiPromise.create({ provider });

    // Prepare the transaction payload
    const transfers = Object.entries(bucket).map(([token, percentage]) => ({
      token,
      amount: (percentage / 100) * amount,
    }));

    // Initiate the transactions (as extrinsics)
    const extrinsics = transfers.map(({ token, amount }) =>
      api.tx.assets.transfer(token, walletAddress, amount)
    );

    // Batch the transactions
    const batchExtrinsic = api.tx.utility.batch(extrinsics);

    // Sign and send the transaction
    const unsubscribe = await batchExtrinsic.signAndSend(walletAddress, (result) => {
      if (result.status.isInBlock) {
        console.log(`Transaction included in block ${result.status.asInBlock}`);
        res.status(200).json({ message: "Transaction successful", blockHash: result.status.asInBlock.toHex() });
        unsubscribe();
      } else if (result.status.isFinalized) {
        console.log(`Transaction finalized in block ${result.status.asFinalized}`);
      }
    });
  } catch (error) {
    console.error("Error processing transaction:", error);
    res.status(500).json({ error: "Transaction failed. Please try again later." });
  }
}
