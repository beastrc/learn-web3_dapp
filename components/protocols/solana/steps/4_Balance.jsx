import { useState } from 'react';
import { Alert, Col, Input, Button, Space, Typography } from 'antd';
import { Connection, PublicKey } from "@solana/web3.js";

import { getDatahubNodeURL } from "utils/datahub-utils";
import { getAccountExplorerURL } from "../utils";

const { Text } = Typography;

const DECIMAL_OFFSET = 1000000000;

const Balance = () => {
  const [value, setValue] = useState("");
  const [balance, setBalance] = useState(null);

  const getBalance = () => {
    alert("Implement the getBalance() function!");

    const url = getDatahubNodeURL(CHAINS.SOLANA, SOLANA_NETWORKS.DEVNET, SOLANA_PROTOCOLS.RPC)
    const connection = new Connection(url);
    
    // Create a PublicKey from the input value
    // Call getBalance
    // Set balance using setBalance and DECIMAL_OFFSET
  }

  const explorerUrl = getAccountExplorerURL(value);

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>Paste the address you generated previously:</Text>
          <Input placeholder="Enter an address" onChange={(e) => setValue(e.target.value) } style={{ width: "500px" }} />
          <Button type="primary" onClick={getBalance}>Check Balance</Button>
        </Space>
        {balance &&
          <Alert
            message={
              <Text strong>{`This address has a balance of ◎${balance}`}</Text>
            }
            description={
              <a href={explorerUrl} target="_blank" rel="noreferrer">View the address on Solana Explorer</a>
            }
            type="success"
            showIcon
          />
        }
      </Space>
    </Col>
  );
}

export default Balance