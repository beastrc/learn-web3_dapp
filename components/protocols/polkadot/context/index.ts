import {createContext, Dispatch} from 'react';

export type State = {
  index: number;
  network?: string;
  address?: string;
  mnemonic?: string;
  proxyAddress?: string;
  proxyMnemonic?: string;
};

type Action =
  | {type: 'SetIndex'; index: number}
  | {type: 'SetNetwork'; network?: string}
  | {type: 'SetAddress'; address?: string}
  | {type: 'SetMnemonic'; mnemonic?: string}
  | {type: 'SetProxyAddress'; proxyAddress?: string}
  | {type: 'SetProxyMnemonic'; proxyMnemonic?: string};

const initialState = {
  index: 0,
  network: 'westend',
};

function appStateReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SetIndex':
      return {...state, index: action.index};
    case 'SetNetwork':
      return {...state, network: action.network};
    case 'SetAddress':
      return {...state, address: action.address};
    case 'SetMnemonic':
      return {...state, mnemonic: action.mnemonic};
    case 'SetProxyAddress':
      return {...state, proxyAddress: action.proxyAddress};
    case 'SetProxyMnemonic':
      return {...state, proxyMnemonic: action.proxyMnemonic};
    default:
      return state;
  }
}

const PolkadotContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export {PolkadotContext, initialState, appStateReducer};
