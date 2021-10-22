import {Row, Space} from 'antd';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowLeft} from 'react-feather';

import {colors, getChainColors} from 'utils/colors';
import {CHAINS} from 'types';
import logoSVG from 'public/figment-learn-compact.svg';
import discordSVG from 'public/discord.svg';
import {HEADER_HEIGHT} from 'lib/constants';
import {
  getLabelForCurrentChain,
  getCurrentChainId,
  useGlobalState,
} from 'context';

const Nav = () => {
  const {state} = useGlobalState();
  const currentChainId = getCurrentChainId(state) as CHAINS;
  const chainLabel = getLabelForCurrentChain(state);
  const {primaryColor, secondaryColor} = getChainColors(currentChainId);

  return (
    <StyledNav
      primary_color={primaryColor}
      align="middle"
      justify="space-between"
    >
      <Left align="middle">
        <Link href="/">
          <ArrowLeft style={{cursor: 'pointer'}} color={secondaryColor} />
        </Link>
        <Image src={logoSVG} alt="Figment Learn" height={47} width={100} />
        <ChainTitle
          secondary_color={secondaryColor}
        >{`${chainLabel} Pathway`}</ChainTitle>
      </Left>

      <a
        href="https://discord.com/invite/fszyM7K"
        target="_blank"
        rel="noreferrer"
      >
        <Discord>
          <Row align="middle">
            <div>Need help? Find us on</div>
            <Image src={discordSVG} alt="Discord" height={22} width={100} />
          </Row>
        </Discord>
      </a>
    </StyledNav>
  );
};

const StyledNav = styled(Row)<{primary_color: string}>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: ${HEADER_HEIGHT}px;
  z-index: 10;
  padding: 0 40px;
  background: ${({primary_color}) => primary_color};
  border-bottom: solid 2px black;
`;

const Left = styled(Row)`
  > svg,
  div {
    margin-right: 24px;
  }
`;

const ChainTitle = styled.div<{secondary_color: string}>`
  color: ${({secondary_color}) => secondary_color};
  font-size: 24px;
  font-weight: 600;
  margin-left: 24px;
`;

const Discord = styled.div`
  font-weight: 600;
  padding: 8px 15px;
  border-radius: 3px;
  background: ${colors.figmentYellow};
  color: black !important;
  box-shadow: #9b9b9b 0px 0px 5px 1px;
`;

export default Nav;
