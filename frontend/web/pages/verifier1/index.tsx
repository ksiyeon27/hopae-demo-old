import { Box, Button } from "@mui/material";
import { FC, useEffect } from "react";
import { backendHostingURL } from "@/common/config";
import Component from './component';
import Layout from './layout';

const Verifier1Page: FC = () => {
  const useDeepLink = () => {
    const url = backendHostingURL + "/verifier/vp/career"; // verifier 1 backend
    const nonceUrl = backendHostingURL + "/verifier/nonce/career"; // 대신 서버에서 가져와야함
    const fields = ["department", "position", "join", "leave"];
    window.open(
      "wwwallet://verify?url=" +
        url +
        "&nonceUrl=" +
        nonceUrl +
        "&fields=" +
        fields.join(",")
    );
  };

  useEffect(() => {
    setInterval(() => {
      // check if the user is verified (polling)
    }, 1000);
  }, []);

  return (
    <Component />
  );
};

export default Verifier1Page;
