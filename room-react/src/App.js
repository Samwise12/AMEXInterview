import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import HomePage from "./components/pages/HomePage";
import SignupPage from "./components/pages/SignupPage";

import'./css/App.scss';

const App = ({ location }) => {
  return (

  	<div>
  		<Route location={location} path="/" exact component={HomePage} />
		<Route location={location} path="/signup" exact component={SignupPage} />  		
  	</div>
	)
}

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
};

export default App;