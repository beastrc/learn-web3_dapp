import {useEffect, useReducer} from 'react';
import {Row} from 'antd';

import {
  Connect,
  Keys,
  Account,
  Balance,
  Transfer,
  Deploy,
  Getter,
  Setter,
} from '@near/components/Steps';
import {appStateReducer, initialState, NearContext} from '@near/context';
import {useAppState, useLocalStorage} from '@near/hooks';
import {Sidebar, Step} from '@near/components/Layout';
import {Nav} from '@near/components';

import type {AppI} from '@near/types';
import {trackTutorialStepViewed} from '../../../utils/tracking-utils';

const NearApp: React.FC<AppI> = ({chain}) => {
  const {state, dispatch} = useAppState();
  const {steps} = chain;
  const step = steps[state.index];
  const nextHandler = () => {
    const index = state.index + 1;
    dispatch({
      type: 'SetIndex',
      index,
    });
    trackTutorialStepViewed(chain.id, steps[index].title, 'next');
  };
  const prevHandler = () => {
    const index = state.index - 1;
    dispatch({
      type: 'SetIndex',
      index,
    });
    trackTutorialStepViewed(chain.id, steps[index].title, 'prev');
  };
  const isFirstStep = state.index == 0;
  const isLastStep = state.index === steps.length - 1;

  return (
    <Row>
      <Sidebar steps={steps} stepIndex={state.index} />
      <Step
        step={step}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        prev={prevHandler}
        next={nextHandler}
        body={
          <>
            {step.id === 'connect' && <Connect />}
            {step.id === 'keypair' && <Keys />}
            {step.id === 'account' && <Account />}
            {step.id === 'balance' && <Balance />}
            {step.id === 'transfer' && <Transfer />}
            {step.id === 'deploy' && <Deploy />}
            {step.id === 'getter' && <Getter />}
            {step.id === 'setter' && <Setter />}
          </>
        }
        nav={<Nav />}
      />
    </Row>
  );
};

const Near: React.FC<AppI> = ({chain}) => {
  const [storageState, setStorageState] = useLocalStorage('near', initialState);
  const [state, dispatch] = useReducer(appStateReducer, storageState);
  useEffect(() => {
    setStorageState(state);
  }, [state]);
  return (
    <NearContext.Provider value={{state, dispatch}}>
      <NearApp chain={chain} />
    </NearContext.Provider>
  );
};

export default Near;
