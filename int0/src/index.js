import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk)
		)	
	);


ReactDOM.render(
<BrowserRouter>
  
  	<Provider store={store}>
    	<Route component={App} />
    </Provider>
  
</BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();