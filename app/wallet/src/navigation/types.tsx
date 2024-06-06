export type IssueParams = {
  randomString: string;
  url: string;
};

export type VerifyParams = {
  randomString: string;
  url: string;
  fields: string;
};

export type RootStackParamList = {
  Issue: IssueParams;
  Verify: VerifyParams;
  Home: undefined;
};
