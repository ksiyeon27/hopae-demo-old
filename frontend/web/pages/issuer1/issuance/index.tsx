import { Box, Button } from "@mui/material";
import Component from './component';
import Layout from './layout';
import { FC } from "react";
import { backendHostingURL } from "@/common/config";

const Issuer1Page: FC = () => {
  const useDeepLink = () => {
    const url = backendHostingURL + "/issuer/vc/career"; // issuer 1 backend
    const nonceUrl = backendHostingURL + "/issuer/nonce/career"; // 대신 서버에서 가져와야함
    window.open("wwwallet://issue?url=" + url + "&nonceUrl=" + nonceUrl);
  };

  return (
    <Component />
  );
};

export default Issuer1Page;
