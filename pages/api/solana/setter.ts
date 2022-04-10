import {
  Connection,
  PublicKey,
  Keypair,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeURL} from '@figment-solana/lib';

export default async function setter(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {greeter, secret, programId, network} = req.body;
    const url = getNodeURL(network);
    const connection = new Connection(url, 'confirmed');

    const greeterPublicKey = new PublicKey(greeter);
    const programKey = new PublicKey(programId);

    const payerSecretKey = new Uint8Array(JSON.parse(secret));
    const payerKeypair = Keypair.fromSecretKey(payerSecretKey);

    // this your turn to figure out
    // how to create this instruction
    const instruction = new TransactionInstruction(undefined);

    // this your turn to figure out
    // how to create this transaction
    const hash = await sendAndConfirmTransaction(undefined);

    res.status(200).json(undefined);
  } catch (error) {
    console.error(error);
    res.status(500).json('Get balance failed');
  }
}
