import { Box, Button } from "@mui/material";
import { FC, useEffect } from "react";
import { backendHostingURL } from "@/common/config";

const Verifier1Page: FC = () => {
  const useDeepLink = () => {
    const url = backendHostingURL + "/verifier/vp/career"; // issuer 1 backend
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
        backgroundImage: 'url("/verifier1.jpg")',
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
        <Box sx={{ fontSize: 28 }}>Verifier 1 Main Page</Box>
        <Box sx={{ flex: 1 }}>
          <Button onClick={useDeepLink}>{"앱으로 인증하기"}</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Verifier1Page;
