import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';


import './index.css'
import { IRootProps, Root } from './root';
import { store } from "./src/store/appStore"




const render = (Component: (props: IRootProps) => React.ReactElement) => {

    ReactDOM.render(
        <AppContainer>
            <Component
                store={store}
            />
        </AppContainer>,
        document.getElementById('root')
    )

}
render(Root);