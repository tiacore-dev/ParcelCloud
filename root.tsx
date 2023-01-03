import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { App } from './src/components/App/App';
import { history } from './src/core/history';
import { PersistGate } from "redux-persist/integration/react"
import { Persistor } from 'redux-persist/es/types';

export interface IRootProps {
    store: any;
    persistor: Persistor
}

export function Root({ store, persistor }: IRootProps) {
    return (
        <React.StrictMode>
            <PersistGate 
                loading={null}
                persistor={persistor}
            >
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
            </PersistGate>
        </React.StrictMode>

    );
}