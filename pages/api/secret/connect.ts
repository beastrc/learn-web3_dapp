import type { NextApiRequest, NextApiResponse } from 'next'
import { SECRET_NETWORKS } from 'types/types';
import { getDataHubSecretNodeUrl, getSafeUrl } from 'components/protocols/secret/lib';
import { CosmWasmClient } from 'secretjs';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    try {
        // const url = getDataHubSecretNodeUrl(SECRET_NETWORKS.TESTNET)
        const url = getSafeUrl()
        console.log(url)
        const client = new CosmWasmClient(url)
        const nodeInfo = await client.restClient.nodeInfo();
        const version = nodeInfo.application_version.version;
        console.log(version)
        res.status(200).json(version)
    } catch(error) {
        console.log(error)
        res.status(500).json('failed to connect to secret')
    }
}
