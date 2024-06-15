import { Box, Button } from "@mui/material";
import { v4 } from "uuid";
import { FC, useEffect, useState } from "react";
import Component from "./component";
import Layout from "./layout";

const Verifier2Page: FC = () => {
  const useDeepLink = () => {
    const url = "https://dummy.com"; // verifier 2 backend
    const uuid = v4();
    const fields = ["name", "age"];
    window.open(
      "wwwallet://verify?url=" +
        url +
        "&randomString=" +
        uuid +
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
    <Layout>
      <Box>
        <Component />
      </Box>
    </Layout>
  );
};

export default Verifier2Page;
