import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {StoreProvider} from './helpers/store-provider';
import RootStore from "./stores/root-store";
import {ConfigProvider} from "antd";


const rootStore = new RootStore();

const init = async () => {
    await rootStore.fetch();
    ReactDOM.render(
        <React.StrictMode>
            <ConfigProvider direction="rtl">
                <StoreProvider value={rootStore}>
                    <App/>
                </StoreProvider>
            </ConfigProvider>
        </React.StrictMode>,
        document.getElementById('root')
    );
};


init();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
