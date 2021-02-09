import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import'../../css/App.scss';
import'../../css/Nav.scss';

import Navbar from '../Navbar';
import * as userActions from '../../actions/auth';

const App = (props) => {
  return (
  <div style={{ display: "flex", height: "100vh" }}>  	
  	<Navbar loginAction={props.loginAction} logoutAction={props.logoutAction} />

	<div className="pattern">      	
      	
      	<div >      		
      		
	      	<span className="curtains">
	      		<div className="curtain_rod">
	      			<span className="curtain_sheet">
						<span className="curtain_rectangle0"></span>
						<span style={{marginLeft: "25%"}} className="curtain_rectangle0"></span>
						<span style={{marginLeft: "50%"}} className="curtain_rectangle0"></span>
						<span style={{marginLeft: "85%"}} className="curtain_rectangle0"></span>
	      			</span>
	      		</div>
	      	</span>

	      	<span className="face wall">
	      		<div className="rectangle0"></div>
	      			<div className="rectangle1">
	      				<div className="couch_bottom"></div>
	      			</div>
	      		<div className="rectangle2"></div>
	      	
	      		<div className="baseboard"></div>
	      	</span>
      	</div>

		<div className="face floor"></div>

    </div>

</div>    
  );
}

App.propTypes = {
	loginAction: PropTypes.func.isRequired,
	logoutAction: PropTypes.func.isRequired
}

export default connect(null, {
	loginAction: userActions.loginAction,
	logoutAction: userActions.logoutAction,
}) (App);