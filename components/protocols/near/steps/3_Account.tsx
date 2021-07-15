import { Dispatch, SetStateAction, useState } from 'react'
import axios from "axios";
import { Alert, Button, Col, Space, Typography, Input } from 'antd';
import { useAppState } from '@near/hooks'
import { getPublicKey } from '@near/utils';
import { getAccountUrl } from '@near/utils';

const { Text } = Typography;

const Account = () => {
    const [freeAccountId, setFreeAccountId] = useState<string>('');
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [isFreeAccountId, setIsFreeAccountId] = useState<boolean>(false);
    const { state, dispatch } = useAppState();
    const { networkId, accountId } = state;

    const createAccountWithId = () => {
        setIsFetching(true);
        const publicKey = state?.secretKey && getPublicKey(state.secretKey);
		axios
			.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/near/createAccountId`, { freeAccountId, publicKey, networkId })
            .then(res => {
                const accountId = res.data;
                dispatch({
                    type: "SetAccountId",
                    accountId
                })
                setIsFetching(false);
            })
			.catch(err => {
                console.error(err);
                setIsFetching(false);
			})
	}

    const checkAccounIdProps = {
        freeAccountId,
        setFreeAccountId,
        setIsFreeAccountId,
        networkId,
    }
    
    return (
    <>
        <Col>
            <Space direction="vertical" size="middle" >        
                <CheckAccountId {...checkAccounIdProps} />
                <Button type="primary" onClick={ createAccountWithId } style={{ marginBottom: "20px" }} loading={isFetching} disabled={!isFreeAccountId}>
                    Create Account
                </Button>
                {accountId &&
                    <Col>
                        <Space direction="vertical">
                            <Alert
                                message={
                                    <Space>
                                        <Text strong>Account generated!</Text>
                                    </Space>
                                }
                            description={
                                <a href={getAccountUrl(networkId)(accountId ?? '')} target="_blank" rel="noreferrer">View on Near Explorer</a>
                            }
                            type="success"
                            showIcon
                            />
                        </Space>
                    </Col>
                }
            </Space>
        </Col>
    </>
    );
}

type AlertT = "success" | "info" | "warning" | "error" | undefined
const Notify = ({ msg, status }: {msg: string, status: AlertT }) => 
    <Alert
        message={
            <Space>
                <Text strong>{msg}</Text>
            </Space>
        }
        type={status}
        showIcon
    />

type CheckAccountIdPropsT = {
    networkId: string
    freeAccountId: string
    setFreeAccountId: Dispatch<SetStateAction<string>>
    setIsFreeAccountId: Dispatch<SetStateAction<boolean>>
}

const CheckAccountId = ({
    networkId,
    freeAccountId,
    setFreeAccountId,
    setIsFreeAccountId,
}: CheckAccountIdPropsT ) => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [alertMsg, setAlertMsg] = useState<string>('Valid account should look like NAME.testnet');
    const [alertStatus, setAlertStatus] = useState<AlertT>('info');

    const checkAvailabilityOfAccountId = () => {
        setIsFetching(true)
        axios
            .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/near/checkAccountId`, { freeAccountId, networkId })
            .then(res => {
                if (res.data) {
                    setIsFreeAccountId(res.data);
                    setAlertStatus('success');
                    setAlertMsg(`Account ${freeAccountId} is available`);
                } else {
                    setIsFreeAccountId(res.data);
                    setAlertStatus('error');
                    setAlertMsg(`Account ${freeAccountId} is not available`);
                }
                setIsFetching(false);
            })
            .catch(err => {
                console.error(err);
                setAlertStatus('error');
                setAlertMsg(`Near connection failed`);
                setIsFreeAccountId(true);
                setIsFetching(false);
            })
    }

    const onInputChange = (e: any) => {
        setAlertStatus('info')
        setAlertMsg('Valid account should look like NAME.testnet');
        setIsFreeAccountId(false);
        setFreeAccountId(e.target.value)
    }

    const valideAccountId: boolean = !(freeAccountId.slice(-8) === ".testnet");

    return (
        <Space direction="vertical" size="small">
            <Text style={{ fontWeight: "bold", fontSize: 20}}>Choose an account identifiant:</Text>
            <Space direction="horizontal" size="small">
                <Input placeholder="my-super-nick.testnet" onChange={onInputChange} style={{ width: "500px" }} />
                <Button type="primary" onClick={checkAvailabilityOfAccountId} loading={isFetching} disabled={ valideAccountId }>Check it!</Button>
            </Space>
            <Notify msg={alertMsg} status={alertStatus} />
        </Space>
    )
}

export default Account







/*
import type { AccountView } from 'near-api-js/lib/providers/provider';
        // const accountInfo = await account.state();


    const AccountStatusBox = () =>
        <Col>
            <Space direction="vertical">
                <Alert
                    message={
                        <Space>
                            <Text strong>Account generated!</Text>
                        </Space>
                    }
                    description={
                        <ul>
                            <li>
                                Account: <Text code>{accountId}</Text>
                            </li>
                            <li>
                                Public key: <Text code>{publicKeyStr}</Text>
                            </li>
                            <li>
                                Amount: <Text code>{accountView?.amount}</Text>
                            </li>
                        </ul>
                    }
                    type="success"
                    showIcon
                />
            </Space>
        </Col>
*/
