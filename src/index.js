import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import ScrollToTop from '../src/components/commmon/ScrollToTop'
import {RecoilRoot} from "recoil";
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CookiesProvider>
            <RecoilRoot>
                <BrowserRouter>
                    <ScrollToTop/>
                    <App />
                </BrowserRouter>
            </RecoilRoot>
        </CookiesProvider>
    </React.StrictMode>
);
