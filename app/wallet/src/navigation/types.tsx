export type IssueParams = {
  nonceUrl: string;
  url: string;
};

export type VerifyParams = {
  nonceUrl: string;
  url: string;
  fields: string;
};

export type RootStackParamList = {
  Issue: IssueParams;
  Verify: VerifyParams;
  Home: undefined;
};
