import {Typography, Popover, Button} from 'antd';
import {useAppState} from '@polka/hooks';
import type {EntryT} from '@polka/types';
import {trackStorageCleared} from '../../../../utils/tracking-utils';

const {Text, Paragraph} = Typography;

const Nav = () => {
  const {state, dispatch} = useAppState();
  const {network, address, mnemonic} = state;

  const displayNetwork = (network: string) => network.slice(0, 5);
  const displayPublicKey = (publicKey: string) =>
    `${publicKey.slice(0, 5)}...${publicKey.slice(-5)}`;
  const displayMnemonic = (mnemonic: string) =>
    `${mnemonic.slice(0, 5)}...${mnemonic.slice(-5)}`;

  const Entry = ({msg, display, value}: EntryT) => {
    return (
      <Paragraph copyable={{text: value}}>
        <Text strong>{msg}</Text>
        <Text code>{display(value)}</Text>
      </Paragraph>
    );
  };

  const AppState = () => {
    return (
      <>
        {network && (
          <Entry msg={'Network: '} value={network} display={displayNetwork} />
        )}
        {address && (
          <Entry msg={'Address: '} value={address} display={displayPublicKey} />
        )}
        {mnemonic && (
          <Entry
            msg={'mnemonic: '}
            value={mnemonic}
            display={displayMnemonic}
          />
        )}
      </>
    );
  };

  const clearStorage = () => {
    alert('You are going to clear the storage');
    localStorage.removeItem('polkadot');
    dispatch({
      type: 'SetAddress',
      address: undefined,
    });
    dispatch({
      type: 'SetMnemonic',
      mnemonic: undefined,
    });
    dispatch({
      type: 'SetIndex',
      index: 0,
    });
    dispatch({
      type: 'SetNetwork',
      network: 'westend',
    });
    trackStorageCleared('polkadot');
  };

  return (
    <>
      <div style={{position: 'fixed', top: 25, right: 60}}>
        <Popover content={AppState} placement="rightBottom">
          <Button type="primary">Storage</Button>
        </Popover>
      </div>
      <div style={{position: 'fixed', top: 25, right: 165}}>
        <Button danger onClick={clearStorage}>
          Clear Storage
        </Button>
      </div>
    </>
  );
};

export {Nav};
