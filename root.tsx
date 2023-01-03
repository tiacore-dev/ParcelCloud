import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { App } from './src/components/App/App';
import { history } from './src/core/history';

export interface IRootProps {
    store: any;
}

export function Root({ store }: IRootProps) {
    return (
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>

    );
}