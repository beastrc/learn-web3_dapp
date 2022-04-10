import {Alert, Col, Input, Button, Space, Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {getTransactionUrl} from '@near/lib';
import {useEffect, useState} from 'react';
import {useAppState} from '@near/hooks';
import axios from 'axios';

const {Text} = Typography;

const Setter = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [resetting, setResetting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');
  const {state} = useAppState();

  useEffect(() => {
    const contractGetter = () => {
      setError(null);
      setFetching(true);
      axios
        .post(`/api/near/getter`, state)
        .then((res) => {
          setMessage(res.data);
          setFetching(false);
        })
        .catch((err) => {
          const data = err.response.data;
          setFetching(false);
          setError(data.message);
        });
    };
    contractGetter();
  }, [txHash, state]);

  const contractSetter = () => {
    setError(null);
    setResetting(true);
    axios
      .post(`/api/near/setter`, {...state, newMessage})
      .then((res) => {
        setTxHash(res.data);
        setResetting(false);
      })
      .catch((err) => {
        const data = err.response.data;
        setResetting(false);
        setError(data.message);
      });
  };

  const txUrl = getTransactionUrl(state.network)(txHash);

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        <Text>
          Below is the message stored on the &quot;greeter&quot; contract:
        </Text>
        <Col>
          {fetching ? (
            <LoadingOutlined style={{fontSize: 24}} spin />
          ) : (
            <Alert
              style={{fontWeight: 'bold', textAlign: 'center'}}
              type="success"
              closable={false}
              message={message}
            />
          )}
        </Col>
        <Col>
          <Space direction="vertical" size="large">
            <Space direction="horizontal">
              <Button type="primary" onClick={contractSetter}>
                Set greeting
              </Button>
              <Input
                style={{
                  minWidth: '200px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
                defaultValue={message}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </Space>
            {error && <Alert type="error" closable message={error} />}
            {resetting ? (
              <LoadingOutlined style={{fontSize: 24}} spin />
            ) : txHash.length !== 0 ? (
              <Alert
                message={<Text strong>{`The message has been reset`}</Text>}
                description={
                  <a href={txUrl} target="_blank" rel="noreferrer">
                    View the transaction on NEAR Explorer
                  </a>
                }
                type="success"
                closable
                showIcon
              />
            ) : null}
          </Space>
        </Col>
      </Space>
    </Col>
  );
};

export default Setter;
