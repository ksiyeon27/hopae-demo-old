import { Box, Button } from "@mui/material";
import { v4 } from "uuid";

function MainPage() {
  const useDeepLink = () => {
    const url = "https://dummy.com"; // issuer 1 backend
    const uuid = v4();
    window.open("wwwallet://issue?url=" + url + "&randomString=" + uuid);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <h1>Issuer 1 Main Page</h1>
      <Button onClick={useDeepLink}>{"인증서 발급하기"}</Button>
    </Box>
  );
}

export default MainPage;
