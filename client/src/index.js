import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';
import UserDetailsProvider from "./components/UserDetails";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <ConfigProvider locale = {enUS}>
        <BrowserRouter>
            <UserDetailsProvider>
                <App />
            </UserDetailsProvider>
        </BrowserRouter>
    </ConfigProvider>
);
