import React, {useEffect, useState} from 'react';
import {Col, Alert, Space, Typography} from 'antd';
import {
  PoweroffOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import type {ManifestStepStatusesT} from '@figment-the-graph/types';
import {
  getCurrentChainId,
  useGlobalState,
  getCurrentStepIdForCurrentChain,
} from 'context';
import axios from 'axios';
import SetupWizard from 'components/shared/SetupWizard';
import {StepButton} from 'components/shared/Button.styles';
import {useColors} from 'hooks';
import {defaultManifestStatus} from '@figment-the-graph/lib';

const {Text} = Typography;

const GraphNode = () => {
  const {state, dispatch} = useGlobalState();
  const {primaryColor, secondaryColor} = useColors(getCurrentChainId(state));

  const [status, setStatus] = useState<ManifestStepStatusesT>(
    defaultManifestStatus,
  );
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = () =>
    Object.values(status).reduce((completion, statusField) => {
      return completion && statusField.isValid;
    }, true);

  useEffect(() => {
    if (isValid()) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId: getCurrentChainId(state),
        stepId: getCurrentStepIdForCurrentChain(state),
        value: true,
      });
    }
  }, [status, setStatus]);

  const checkStep = async () => {
    setFetching(true);
    setError(null);

    try {
      const response = await axios.get(`/api/the-graph/manifest`);
      setStatus(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col key={fetching as unknown as React.Key}>
      <Space direction="vertical" size="large">
        <StepButton
          type="primary"
          icon={<PoweroffOutlined />}
          onClick={checkStep}
          loading={fetching}
          secondary_color={secondaryColor}
          primary_color={primaryColor}
          size="large"
          autoFocus={false}
        >
          Check the manifest
        </StepButton>
        {isValid() ? (
          <>
            <Alert
              message={<Text strong>The manifest file looks good! 🎉</Text>}
              description={
                <ManifestStatus
                  status={status}
                  text={'Good job! all the pieces are in place.'}
                />
              }
              type="success"
              showIcon
            />
            <SetupWizard />
          </>
        ) : (
          <Alert
            message={<Text strong>The manifest file is not ready yet 🥺</Text>}
            description={
              <ManifestStatus
                status={status}
                text="Make sure you've changed all the different pieces!"
              />
            }
            type="error"
            showIcon
          />
        )}
        {error && (
          <Alert
            message={<Text strong>An unexpected error occurs 😢</Text>}
            description={<Text code>{error}</Text>}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
          />
        )}
      </Space>
    </Col>
  );
};

const ManifestStatus = ({
  status,
  text,
}: {
  status: ManifestStepStatusesT;
  text: string;
}) => {
  return (
    <Space direction="vertical">
      <div>{text}</div>
      <Space direction="vertical">
        {Object.values(status).map((status, index) => {
          return (
            <Space direction="horizontal" key={index}>
              <div>
                {status.isValid ? (
                  <CheckOutlined size={16} style={{color: 'green'}} />
                ) : (
                  <CloseOutlined size={16} style={{color: 'red'}} />
                )}
              </div>
              <div>{status.message}</div>
            </Space>
          );
        })}
      </Space>
    </Space>
  );
};

export default GraphNode;
