import { Box, Button } from "@mui/material";
import { v4 } from "uuid";
import { FC, useEffect, useState } from "react";

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
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        backgroundImage: 'url("/verifier2.jpg")',
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          padding: "16px",
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ fontSize: 28 }}>Verifier 2 Main Page</Box>
        <Box sx={{ flex: 1 }}>
          <Button onClick={useDeepLink}>{"앱으로 인증하기"}</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Verifier2Page;
