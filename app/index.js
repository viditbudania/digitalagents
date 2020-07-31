/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Home from "./Home";
import configureStore from './store/configureStore';
import sagas from './sagas';


const store = configureStore();
sagas.forEach(saga => store.runSaga(saga));

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <Home />

            </Provider>
        );
    }
}

export default App;