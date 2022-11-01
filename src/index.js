import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider chainRpc={{[activeChainId] : "https://rpc.ankr.com/polygon_mumbai	"}} desiredChainId={activeChainId}
    sdkOptions={{
      gasless: {
        openzeppelin: {
          relayerUrl: "https://api.defender.openzeppelin.com/autotasks/50b019d6-79f9-4196-b444-df0a5ff70c4f/runs/webhook/bb91c160-5af7-4067-94e9-f1416359568b/99FSQ9SPpbKC3q8AHYoQSr",
        },
      },
    }}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);


