export type IssueParams = {
  randomString: string;
  url: string;
};

export type RootStackParamList = {
  Issue: IssueParams;
  Home: undefined;
};
