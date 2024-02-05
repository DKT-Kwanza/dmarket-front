import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import ScrollToTop from '../src/components/commmon/ScrollToTop'
import {RecoilRoot} from "recoil";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <ScrollToTop/>
                <App />
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>
);
