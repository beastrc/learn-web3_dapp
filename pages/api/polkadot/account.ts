import type {NextApiRequest, NextApiResponse} from 'next';
import {PolkadotAccountResponse} from '@polka/types';

import {Keyring} from '@polkadot/api';
import {mnemonicGenerate, mnemonicValidate} from '@polkadot/util-crypto';

export default async function account(
  _req: NextApiRequest,
  res: NextApiResponse<PolkadotAccountResponse | string>,
) {
  try {
    const keyring = new Keyring({type: 'sr25519'});

    // Create mnemonic string
    const mnemonic = undefined;

    const isValidMnemonic = mnemonicValidate(mnemonic);
    if (!isValidMnemonic) {
      throw Error('Invalid Mnemonic');
    }

    // Add an account derived from the mnemonic
    const account = undefined;
    const address = undefined;
    const jsonWallet = undefined;
    res.status(200).json({
      address,
      mnemonic,
      jsonWallet,
    });
  } catch (error) {
    res.status(500).json('Account creation failed');
  }
}
