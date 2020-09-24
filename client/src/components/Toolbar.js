import React, { Component, useEffect, useState } from 'react'
//import './SideDrawer/DrawerToggleButton'
import DrawerToggleButton from './SideDrawer/DrawerToggleButton'
import { Switch, useLocation, Link } from 'react-router-dom'
//import dataProvider from '../../myDataProvider'



const Toolbar = props => {

        
        useEffect(() => {
            
        }, [])


        return(
            <header className="toolbar">
                <nav className="toolbar_nav">
                    <div className="toolbar_toggle-button">
                        <DrawerToggleButton click={props.drawerClickHandler}/>
                    </div>
                    <div className='toolbar_logo'>
                        <Link to='/'><img src="/spacex_logo.png" id="toolbar-logo" /></Link>
                        {/* <h1>Dashboard</h1> */}
                    </div>
                    <div className='spacer' />
                    <div className='toolbar_nav-items'>
                        <ul className='toolbar_nav-items'>

                            <div className="dropdown">
                                <li><Link to='/rules' className="navLink">Launches</Link></li>
                                {/* <div className="dropdown-content">
                                    {locations.map(loc =>
                                        <a key={loc} href={'/communities/' + loc + "#search-area"}>{loc}</a>
                                    )}
                                </div> */}
                            </div>

                            <div className="dropdown">
                                <li><Link to='/tweets' className="navLink">Tweets</Link></li>
                                {/* <div className="dropdown-content">
                                    {locations.map(loc =>
                                        <a key={loc} href={'/communities/' + loc + "#search-area"}>{loc}</a>
                                    )}
                                </div> */}
                            </div>


                            {/* <div className="dropdown">
                                <li><Link to='/rockets' className="navLink">Rockets</Link></li>
                            </div> */}

                            
                            {/* <li><Link to='/careers' className="navLink">News</Link></li> */}

                            {/* <li><Link to='/contact' className="navLink">Contact</Link></li> */}


                            {/* <div className="dropdown">
                                <Link to='/residents' className="navLink dropbtn">Residents</Link>
                                <div className="dropdown-content">
                                    <a target="_blank" rel="noopener noreferrer" href="https://shivainvestors.managebuilding.com/Resident/portal/login">Resident Portal</a>
                                </div>
                            </div> */}
                        </ul>
                    </div>
                </nav>
            </header>
        )
}

export default Toolbar
