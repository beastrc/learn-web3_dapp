import Head from 'next/head';
import dynamic from 'next/dynamic';
import {CHAINS_CONFIG} from 'lib/constants';
import {CHAINS, ChainType} from 'types';
import {ComponentType} from 'react';
import styled from 'styled-components';
import {LoadingOutlined} from '@ant-design/icons';
import {getChainColors} from 'utils/colors';

type StaticPropsT = {
  params: {chain: CHAINS};
};
export async function getStaticProps({params}: StaticPropsT) {
  const chainId = params.chain;
  const chainConfig = CHAINS_CONFIG[chainId];
  return {
    props: {
      chainConfig,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: Object.values(CHAINS_CONFIG).map((chain) => {
      return {params: {chain: chain.id}};
    }),
    fallback: false,
  };
}

type DynChainT = ComponentType<{chain: ChainType}>;
type ChainT = {
  chainConfig: ChainType;
};
export default function Chain({chainConfig}: ChainT) {
  const chainLabel = chainConfig.label;
  const chainId = chainConfig.id;
  const {primaryColor: spinnerColor} = getChainColors(chainId);

  const Spinner = ({color}: {color: string}) => {
    return (
      <SpinContainer>
        <LoadingOutlined style={{fontSize: '64px', color}} spin />
      </SpinContainer>
    );
  };
  const dynOptions = {
    loading: function spinner() {
      return <Spinner color={spinnerColor} />;
    },
    ssr: false,
  };
  const DynChain = (() => {
    if (chainId === CHAINS.AVALANCHE)
      return dynamic(
        () => import('../components/protocols/avalanche'),
        dynOptions,
      );
    if (chainId === CHAINS.CELO)
      return dynamic(() => import('../components/protocols/celo'), dynOptions);
    if (chainId === CHAINS.NEAR)
      return dynamic(() => import('../components/protocols/near'), dynOptions);
    if (chainId === CHAINS.POLKADOT)
      return dynamic(
        () => import('../components/protocols/polkadot'),
        dynOptions,
      );
    if (chainId === CHAINS.POLYGON)
      return dynamic(
        () => import('../components/protocols/polygon'),
        dynOptions,
      );
    if (chainId === CHAINS.SECRET)
      return dynamic(
        () => import('../components/protocols/secret'),
        dynOptions,
      );
    if (chainId === CHAINS.SOLANA)
      return dynamic(
        () => import('../components/protocols/solana'),
        dynOptions,
      );
    if (chainId === CHAINS.TEZOS)
      return dynamic(() => import('../components/protocols/tezos'), dynOptions);
    if (chainId === CHAINS.THE_GRAPH)
      return dynamic(
        () => import('../components/protocols/the_graph'),
        dynOptions,
      );
  })() as DynChainT;

  return (
    <>
      <Head>
        <title>{`Figment Learn - ${chainLabel} Pathway`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynChain chain={chainConfig} />
    </>
  );
}

const SpinContainer = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;
