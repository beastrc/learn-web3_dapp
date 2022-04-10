import {createContext, Dispatch} from 'react';

export type State = {
  index: number;
  network: string;
  address?: string;
  secret?: string;
  contract?: string;
};

type Action =
  | {type: 'SetIndex'; index: number}
  | {type: 'SetNetwork'; network: string}
  | {type: 'SetAddress'; address?: string}
  | {type: 'SetSecret'; secret?: string}
  | {type: 'SetContract'; contract?: string};

const initialState = {
  index: 0,
  network: 'alfajores',
};

function appStateReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SetIndex':
      return {...state, index: action.index};
    case 'SetNetwork':
      return {...state, network: action.network};
    case 'SetAddress':
      return {...state, address: action.address};
    case 'SetSecret':
      return {...state, secret: action.secret};
    case 'SetContract':
      return {...state, contract: action.contract};
    default:
      return state;
  }
}

const CeloContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export {CeloContext, initialState, appStateReducer};
