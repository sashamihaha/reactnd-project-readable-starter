import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import combineReducers from './reducers'

const store = createStore(
    combineReducers
)

//console.log(store.getState());

ReactDOM.render(
<Provider store={store}>
<BrowserRouter><App /></BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
