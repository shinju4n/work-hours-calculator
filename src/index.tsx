import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Global, css } from "@emotion/react";
import normalize from "emotion-normalize";
import PageLayout from "./components/ui/page-layout";
import MobileFrame from "./components/ui/mobile-frame";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Global
      styles={css`
        ${normalize}
        h1, h2, h3, h4, h5, h6 {
          font-size: 1em;
          font-weight: normal;
          margin: 0; /* or ‘0 0 1em’ if you’re so inclined */
        }
        * {
          box-sizing: border-box;
        }
      `}
    />
    <PageLayout>
      <MobileFrame>
        <App />
      </MobileFrame>
    </PageLayout>
  </React.StrictMode>
);
