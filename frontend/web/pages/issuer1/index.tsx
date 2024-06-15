import { Box, Button } from "@mui/material";
import { v4 } from "uuid";
import Component from './component';
import Layout from './layout';
import { FC } from "react";
import { backendHostingURL } from "@/common/config";

const Issuer1Page: FC = () => {
  const useDeepLink = () => {
    const url = backendHostingURL + "/issuer/vc/career"; // issuer 1 backend
    const uuid = v4(); // 대신 서버에서 가져와야함
    window.open("wwwallet://issue?url=" + url + "&randomString=" + uuid);
  };

  return (
    <Layout>
      <Box>
        <Component />
      </Box>
    </Layout>
  );
};

export default Issuer1Page;
