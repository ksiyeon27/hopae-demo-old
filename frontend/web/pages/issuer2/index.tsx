import { Box, Button } from "@mui/material";
import { v4 } from "uuid";
import { FC, useEffect, useState } from "react";

const Issuer2Page: FC = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const useDeepLink = () => {
    const url = "https://dummy.com"; // issuer 2 backend
    const uuid = v4();
    window.open("wwwallet://issue?url=" + url + "&randomString=" + uuid);
  };

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: windowHeight,
      }}
    >
      <Box sx={{ fontSize: 28 }}>Issuer 2 Main Page</Box>
      <Box sx={{ flex: 1 }}>
        <Button onClick={useDeepLink}>{"앱으로 인증서 발급받기"}</Button>
      </Box>
    </Box>
  );
};

export default Issuer2Page;
