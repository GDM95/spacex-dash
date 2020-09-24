import React from 'react';
import { Link } from 'react-router-dom'
import './SideDrawer.css'



const sideDrawer = props => {
    let drawerClasses = 'side-drawer'
    if(props.show){
        drawerClasses = 'side-drawer open'
    }
    return (
        <nav className={drawerClasses}>
            <Link to="/" onClick={props.drawerLinkClickHandler}><img className="logo" src="/spacex_logo.png" /></Link>
            <ul>
                <li><Link to='/Launches' onClick={props.drawerLinkClickHandler}>Communities</Link></li>
                <li><Link to='/' onClick={props.drawerLinkClickHandler}>About</Link></li>
                <li><Link to='/careers' onClick={props.drawerLinkClickHandler}>Careers</Link></li>
                <li><Link to='/residents' onClick={props.drawerLinkClickHandler}>Residents</Link></li>
                <li><Link to='/contact' onClick={props.drawerLinkClickHandler}>Contact</Link></li>
            </ul>
        </nav>
    )
};

export default sideDrawer;