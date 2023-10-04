import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Box, ChakraProvider} from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Box minHeight={"100vh"} h={"100dvh"} minWidth={"100dvw"}>
        <App />
      </Box>
    </ChakraProvider>
  </React.StrictMode>
);
