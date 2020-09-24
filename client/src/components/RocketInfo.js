import React, { useState, useEffect } from 'react';


const RocketInfo = (props) => {

    const rocket = props.rocket

    useEffect(() => {
        
    },[]);


    return (
        <section id="rocket-info-container">
            <img src={rocket.flickr_images[0]} />

            <p>test</p>
        </section>
    )
    
}
  
export default RocketInfo