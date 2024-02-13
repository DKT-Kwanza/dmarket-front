import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from 'react-router-dom';
import App from "./App";
import ScrollToTop from "@components/common/ScrollToTop"
import {RecoilRoot} from "recoil";
import {ThemeProvider} from "styled-components";
import theme from "@styles/commonStyles";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <ScrollToTop/>
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>
);
