import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { Link } from "react-router-dom";

import { floorOptions } from "../utils/utils";
import api from '../api';

const mp = new Map();
mp.set("blue","#4e73be");
mp.set("red","#b02318");
mp.set("beige","#fdf2d0");
mp.set("green","#5e803f");


function Navbar(props) {
	const [ user, setUser ] = useState({userData: {userEmail: '',userPassword: ''}});
	const [ colors, setColors ] = useState({ colorData: {floor: 'red', sofa: 'blue', wall: 'beige', curtain: 'green' } })
	const D = ({ children }) => {
		return (
			<div style={{display: 'flex',justifyContent: 'center'}}>
				{children}
			</div>
			)
	};
	useEffect(() => {
		if(props.userTheme) {			
			handleLoginChange(props.userTheme);
			let o = Object.entries(props.userTheme);
			const lazy = async () => {
				await handleColorChange(null, {name: o[0][0], value: o[0][1]},1);
				await handleColorChange(null, {name: o[1][0], value: o[1][1]},1);
				await handleColorChange(null, {name: o[2][0], value: o[2][1]},1);
				await handleColorChange(null, {name: o[3][0], value: o[3][1]},1);
			}
			lazy();
		}
	},[props.userTheme]);
	const handleLoginChange = (theme) => {
		setColors({ colorData: {floor: theme.floor, sofa: theme.sofa, wall: theme.wall, curtain: theme.curtain }});
	}
	const handleChange = e => {
		setUser({userData: {...user.userData ,[e.target.name]: e.target.value}});
	};
	const handleColorChange = (e, val, handler) => {
		if(handler !== 1)
			setColors({ colorData: { ...colors.colorData, [val.name]: val.value } });
		if(val.name === "floor") {
			document.getElementsByClassName('floor')[0].style.background=mp.get(val.value);
		} else if(val.name === "sofa") {
			document.getElementsByClassName('rectangle0')[0].style.background=mp.get(val.value);
			document.getElementsByClassName('rectangle1')[0].style.background=mp.get(val.value);
			document.getElementsByClassName('rectangle2')[0].style.background=mp.get(val.value);
			let darkerColor = mp.get(val.value).replace(/\w\w/g, m => Math.min(255, Math.max(0, parseInt(m, 16) + 20)).toString(16));
			if(val.value === "blue") 
				document.getElementsByClassName('couch_bottom')[0].style.background="#375692";
			else	
			document.getElementsByClassName('couch_bottom')[0].style.background=darkerColor;
		} else if(val.name === "wall") { 
			let darkerColor = mp.get(val.value).replace(/\w\w/g, m => Math.min(255, Math.max(0, parseInt(m, 16) + 7)).toString(16));
			if(val.value === "beige") {
				document.getElementsByClassName('wall')[0].style.background=mp.get(val.value);
			}
			else
				document.getElementsByClassName('wall')[0].style.background=darkerColor
		} else if(val.name === "curtain") {
			if(val.value === "green" ) {
				[].forEach.call(document.getElementsByClassName('curtain_rectangle0'), e => e.style.background="#5e803f");
				document.getElementsByClassName('curtain_sheet')[0].style.background="#7eaa55";
			} else {
				let darkerColor = mp.get(val.value).replace(/\w\w/g, m => Math.min(255, Math.max(0, parseInt(m, 16) + 25)).toString(16));
				[].forEach.call(document.getElementsByClassName('curtain_rectangle0'), e => e.style.background=darkerColor);
				document.getElementsByClassName('curtain_sheet')[0].style.background=mp.get(val.value);				
			}
		} 		
	}
	const onSubmit = e => {
		e.preventDefault();
		props.loginAction(user);
	};
	const onSaveColors = e => {
		e.preventDefault();		
		let email = props.getEmail;
		api.theme.saveTheme({email,colors});
	};	
	return(
		<aside className="nav">			
			<h1 style={{display: 'flex',justifyContent: 'center'}}>User</h1>
			<D>
				<img
					style={{height:'55px'}}
					src={process.env.PUBLIC_URL + '/images/userCircle.png'} 
					alt="user icon" 
				 />
			 </D>
			<D>
				{" "}&nbsp;
			</D>

			<form onChange={handleChange} onSubmit={onSubmit} >
				<div className="form-group">
					<label htmlFor="userEmail" className="txtRobo">User's Email</label>
					<input name="userEmail" type='text' className="form-control" placeholder="Enter User's Email"  
					disabled={props.userEmail}
					/>
				</div>
				<span className="form-group">
					<label htmlFor="inputPassword" className="txtRobo">Password</label>
					<input name="userPassword" type='password' className="form-control" placeholder="Enter Password" 
					disabled={props.userEmail}
					/>
				</span>				
{!props.userEmail ? (
	<span>
	<button type="submit" className="ml-1 mt-2 btn btn-primary">Submit</button>
	<Link to="/signup"><button className="ml-1 mt-2 btn btn-secondary">Sign up</button></Link> 
	</span>
	) : ( 
	<button onClick={() => props.logoutAction()} type="button" className="ml-1 mt-2 btn btn-primary">Logout</button>
	)}				

			</form>
			<br/>
			Floor Color
			<form onSubmit={onSaveColors} >
				<Dropdown value={colors.colorData.floor} name="floor" onChange={handleColorChange} placeholder='floor color' defaultValue="red" search selection options={floorOptions} />
				<br/><br/>
				Sofa Color
				<Dropdown value={colors.colorData.sofa} name="sofa" onChange={handleColorChange} placeholder='sofa color' defaultValue="blue" search selection options={floorOptions} />
				<br/><br/>
				Wall Color
				<Dropdown value={colors.colorData.wall} name="wall" onChange={handleColorChange} placeholder='wall color' defaultValue="beige" search selection options={floorOptions} />			
				<br/><br/>
				Curtain Color
				<Dropdown value={colors.colorData.curtain} name="curtain" onChange={handleColorChange} placeholder='curtain color' defaultValue="green" search selection options={floorOptions} />
				<button disabled={!props.userEmail} type="submit" className="ml-1 mt-2 btn btn-secondary">Save Theme</button>
			</form>
		</aside>
		)
};

function mapStateToProps(state) {	
  return {
    userEmail: !!state.user.email,
    userTheme: state.user.theme,
    getEmail: state.user.email
  }
}

export default connect(mapStateToProps, {}) (Navbar);

