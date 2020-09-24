import React, { Component, useEffect, useState } from 'react'
import UpcomingMissions from './UpcomingMissions'
import { Button } from '@material-ui/core';


const useFetch = (url) => {
    const [data, setData] = useState(null);
  
    // empty array as second argument equivalent to componentDidMount
    useEffect(() => {
      async function fetchData() {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      }
      fetchData();
    }, [url]);
  
    return data;
};
  


const Crew = props => {
    
    const URL = 'https://api.spacexdata.com/v4/crew';
    let result = useFetch(URL);

    
    /* useEffect(() => {
        
    }, []) */

    

    return(
        <section className="crew-section">
            <h1 className="section-title">SpaceX Crew</h1>
            <div id="crew-grid">
                {result && result.map(crewMember => {
                    return (
                        <div className="crew-member" key={crewMember.id}>
                            <img src={ crewMember.image } />
                            <h1>{crewMember.name}</h1>
                            <a target="_blank" rel="noopener noreferrer" href={crewMember.wikipedia}>Learn More</a>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Crew
