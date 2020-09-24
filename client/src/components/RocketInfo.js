import React, { useState, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';


const RocketInfo = (props) => {

    const { rocket } = props

    

    useEffect(() => {
        console.log(props.rocket)
    },[]);


    return (
        <section id="rocket-info-container">
            {/* <img src={rocket.flickr_images[0]} /> */}

            <div id='launch-info-text-grid'>
                <div className="grid-item grid-label">Name: </div>
                <div className="grid-item grid-field">{rocket.name}</div>
                <div className="grid-item grid-label">Active: </div>
                <div className="grid-item grid-field">{rocket.active?<>True</>:<>False</>}</div>
                <div className="grid-item grid-label">First flight: </div>
                <div className="grid-item grid-field">{rocket.first_flight}</div>
                <div className="grid-item grid-label">Cost per launch: </div> 
                <div className="grid-item grid-field">
                    <CurrencyFormat value={ rocket.cost_per_launch } displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </div>
                <div className="grid-item grid-label">Success pct: </div>
                <div className="grid-item grid-field">{rocket.success_rate_pct}%</div>
                <div className="grid-item grid-label">Mass:</div>
                <div className="grid-item grid-field">
                    <CurrencyFormat value={ rocket.mass.kg } displayType={'text'} thousandSeparator={true} suffix={'kg'} />
                </div>
                {/* <div className="grid-item grid-field">{rocket.mass.kg} kg</div> */}
                {/* <div className="grid-item grid-label">Weight (lb)</div>
                <div className="grid-item grid-field">{rocket.mass.lb}</div> */}
                <div className="grid-item grid-label">Height:</div>
                <div className="grid-item grid-field">{rocket.height.meters}m</div>
                <div className="grid-item grid-label">Diameter:</div>
                <div className="grid-item grid-field">{rocket.diameter.meters}m</div>
                <div className="grid-item grid-label">Payloads weights:</div>
                <div className="grid-item grid-field">{rocket.payload_weights.map(p => <li key={p.id}>{p.name}  {`=>`}  {p.kg}kg</li>)}</div>

                <div id='description-field' className="grid-item grid-label">
                    { rocket.description
                        ? <p id="next-mission-desc">{rocket.description}</p>
                        : <p id="next-mission-desc">No description available yet.</p> 
                    }
                </div>
            </div>
        </section>
    )
    
}
  
export default RocketInfo