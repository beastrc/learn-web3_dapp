type ErrorT = {
  message: string;
  file?: string;
  agrs?: string;
};

type EntryT = {
  msg: string;
  display: (value: string) => string;
  value: string;
};

type sourceT = {
  address: string;
  abi: string;
  startBlock: number;
};

type eventHandlersT = {
  event: string;
  handler: string;
};

type mappingT = {
  kind: string;
  apiVersion: string;
  language: string;
  entities: string[];
  abis: any;
  eventHandlers: eventHandlersT[];
  file: string;
};

type dataSourcesT = {
  kind: string;
  name: string;
  network: string;
  source: sourceT;
  mapping: mappingT;
};

type manifestT = {
  specVersion: string;
  schema: any;
  dataSources: dataSourcesT[];
};

export type {ErrorT, EntryT, manifestT};
