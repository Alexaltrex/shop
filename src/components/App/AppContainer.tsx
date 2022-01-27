import {App} from "./App";
import React from "react";
import {Provider} from "react-redux";
import {store} from "../../store/store";
import {HashRouter} from "react-router-dom";
import ErrorBoundary from "../common/ErrorBoundary";

export const AppContainer = () => {
    return (
        <ErrorBoundary>
            <HashRouter>
                    <Provider store={store}>
                        <App/>
                    </Provider>
            </HashRouter>
        </ErrorBoundary>
    )
};