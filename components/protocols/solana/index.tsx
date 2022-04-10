import { Connect, Account, Fund, Balance, Transfer, Deploy, Greeter, GetGreeting, CallGreeting } from '@solana/components/steps';
import { appStateReducer, initialState, SolanaContext } from '@solana/context'
import { useAppState, useLocalStorage } from '@solana/hooks'
import { Sidebar, Step } from '@solana/components/layout'
import { useEffect, useReducer } from "react";
import type { AppI } from '@solana/types';
import { Nav } from '@solana/components';
import { Row } from 'antd';

const SolanaApp: React.FC<AppI> = ({ chain }) => {
    const { state, dispatch } = useAppState();
    const { steps } = chain
    const step = steps[state.index];
    const nextHandler = () => {
        dispatch({
            type: 'SetIndex',
            index: state.index + 1
        })
    }
    const prevHandler = () => {
        dispatch({
            type: 'SetIndex',
            index: state.index - 1
        })
    }
    const isFirstStep = state.index == 0;
    const isLastStep = state.index === steps.length - 1;

    useEffect(() => {
        if (state.index === 0) {
            dispatch({
                type: 'SetNetwork',
                network: 'devnet'
            })
        }
    }, [])

    return (
        <Row>
        <Sidebar
            steps={steps}
            stepIndex={state.index}
        />
        <Step
            step={step}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            prev={prevHandler}
            next={nextHandler}
            body={
            <>
                { step.id === "connect" && <Connect /> }
                { step.id === "account" && <Account /> }
                { step.id === "fund"    && <Fund /> }
                { step.id === "balance" && <Balance /> }
                { step.id === "transfer" && <Transfer /> }
                { step.id === "deploy" && <Deploy /> }
                { step.id === "greeter" && <Greeter /> }
                { step.id === "getter" && <GetGreeting /> }
                { step.id === "setter" && <CallGreeting /> }
            </>
            }
            nav={<Nav />}
        />
        </Row>
  );
}

const Solana: React.FC<AppI> = ({ chain }) => {
  const [storageState, setStorageState] = useLocalStorage("solana", initialState)
  const [state, dispatch] = useReducer(appStateReducer, storageState);
  useEffect(() => {
      setStorageState(state)
  }, [state])
  return (
      <SolanaContext.Provider value={{ state, dispatch }}>
          <SolanaApp chain={chain} />
      </SolanaContext.Provider>
  )
}

export default Solana
