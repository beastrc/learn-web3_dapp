import type {NextApiRequest, NextApiResponse} from 'next';
import {getSafeUrl} from 'components/protocols/secret/lib';
import {
  EnigmaUtils,
  SigningCosmWasmClient,
  Secp256k1Pen,
  pubkeyToAddress,
  encodeSecp256k1Pubkey,
} from 'secretjs';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const url = await getSafeUrl();
    const {mnemonic, contract} = req.body;
    const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic);
    const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);
    const address = pubkeyToAddress(pubkey, 'secret');

    const customFees = {
      exec: {
        amount: [{amount: '500000', denom: 'uscrt'}],
        gas: '500000',
      },
    };
    // Initialise client
    const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();
    const client = new SigningCosmWasmClient(
      url,
      address,
      (signBytes) => signingPen.sign(signBytes),
      txEncryptionSeed,
      customFees,
    );

    // Increment the counter
    const handleMsg = {increment: {}};
    const response = undefined;

    res.status(200).json(response.transactionHash);
  } catch (error) {
    console.log(error);
    res.status(500).json('set counter value failed');
  }
}
