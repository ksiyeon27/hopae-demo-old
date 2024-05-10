import { Box, Button } from "@mui/material";
import { v4 } from "uuid";
import { FC, useEffect, useState } from "react";

const Verifier1Page: FC = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const useDeepLink = () => {
    const url = "https://dummy.com"; // verifier 1 backend
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
      <Box sx={{ fontSize: 28 }}>Verifier 1 Main Page</Box>
      <Box sx={{ flex: 1 }}>
        <Button onClick={useDeepLink}>{"앱으로 인증하기"}</Button>
      </Box>
    </Box>
  );
};

export default Verifier1Page;
