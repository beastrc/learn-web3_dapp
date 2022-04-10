import {Alert, Col, Input, Button, Space, Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {useAppState} from '@avalanche/context';
import {useState, useEffect} from 'react';
import {useGlobalState} from 'context';
import axios from 'axios';

const {Text} = Typography;

const DECIMAL_OFFSET = 10 ** 9;

const Balance = () => {
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const {state} = useAppState();

  useEffect(() => {
    if (balance) {
      if (globalState.valid < 3) {
        globalDispatch({
          type: 'SetValid',
          valid: 3,
        });
      }
    }
  }, [balance, setBalance]);

  const getBalance = () => {
    setError(null);
    setFetching(true);
    axios
      .post(`/api/avalanche/balance`, state)
      .then((res) => {
        const avax = res.data;
        const intoAVAX = (parseFloat(avax) / DECIMAL_OFFSET).toFixed();
        setBalance(parseFloat(intoAVAX));
        setFetching(false);
      })
      .catch((err) => {
        const data = err.data;
        setFetching(false);
        setBalance(0);
        setError(data);
      });
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>
            Below the <span style={{fontWeight: 'bold'}}>address</span> you
            generated previously:
          </Text>
          <Input
            style={{width: '500px', fontWeight: 'bold'}}
            disabled={true}
            defaultValue={state?.address}
          />
          <Button type="primary" onClick={getBalance}>
            Check Balance
          </Button>
        </Space>
        {error && <Alert type="error" closable message={error} />}
        {fetching ? (
          <LoadingOutlined style={{fontSize: 24}} spin />
        ) : balance != 0 ? (
          <Alert
            message={
              <Text
                strong
              >{`This address has a balance of ${balance} AVAX`}</Text>
            }
            type="success"
            closable
            showIcon
          />
        ) : null}
      </Space>
    </Col>
  );
};

export default Balance;
