import {Alert, Button, Col, Space, Typography} from 'antd';
import {useAppState} from '@avalanche/context';
import {useEffect, useState} from 'react';
import {useGlobalState} from 'context';
import axios from 'axios';

const {Text} = Typography;

const Account = () => {
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();
  const [address, setAddress] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const {state, dispatch} = useAppState();

  useEffect(() => {
    if (address) {
      if (globalState.valid < 2) {
        globalDispatch({
          type: 'SetValid',
          valid: 2,
        });
      }
    }
  }, [address, setAddress]);

  useEffect(() => {
    if (state?.address) {
      setAddress(state.address);
    }
  }, []);

  const generateKeypair = async () => {
    try {
      setFetching(true);
      const response = await axios.get(`/api/avalanche/account`);
      setAddress(response.data.address);
      setFetching(false);
      dispatch({
        type: 'SetSecret',
        secret: response.data.secret,
      });
      dispatch({
        type: 'SetAddress',
        address: response.data.address,
      });
    } catch (error) {
      console.error(error);
      setFetching(false);
    }
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Button
        type="primary"
        onClick={generateKeypair}
        style={{marginBottom: '20px'}}
        loading={fetching}
      >
        Generate a Keypair
      </Button>
      {address && (
        <Col>
          <Space direction="vertical">
            <Alert
              message={
                <Space>
                  <Text strong>Keypair generated!</Text>
                </Space>
              }
              description={
                <div>
                  <div>
                    This is the string representation of the public key <br />
                    <Text code>{address}</Text>.
                  </div>
                  <Text>
                    Accessible (and copyable) at the top right of this page.
                  </Text>
                </div>
              }
              type="success"
              showIcon
            />
            <Alert
              message={
                <Space>
                  <Text strong>Fund your new account</Text>
                </Space>
              }
              description={
                <a
                  href={`https://faucet.avax-test.network/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Go to the faucet
                </a>
              }
              type="warning"
              showIcon
            />
          </Space>
        </Col>
      )}
    </Col>
  );
};

export default Account;
