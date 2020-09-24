import React, { useState, useEffect, useRef } from 'react';
import RocketInfo from './RocketInfo'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import LaunchImageSlider from './LaunchImageSlider/LaunchImageSlider'
import Collapsible from 'react-collapsible';
import { HashLink as Link } from 'react-router-hash-link';
import axios from 'axios';


const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   

const downArrow = () => 
    <ExpandMoreIcon style={{ fontSize: 50, position: 'relative', right: 0, marginLeft: 'auto', marginRight: '3%'}}/>

const upArrow = () => 
    <ExpandLessIcon style={{ fontSize: 50, position: 'relative', right: 0, marginLeft: 'auto', marginRight: '3%'}}/>




const LaunchInfo = (props) => {
    const launchId = props.match.params.flightNo
    const [result, setResult] = useState(null);
    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)
    const [detailsExpanded, setDetailsExpanded] = useState(true)
    const [rocketExpanded, setRocketExpanded] = useState(false)


    const detailsTrigger = () =>
    <div className='collapsible-section-trigger'>
        <h1 className="collapsible-title">Launch Details</h1>
        { detailsExpanded ? upArrow() : downArrow() }
    </div>

    const rocketTrigger = () =>
    <div className='collapsible-section-trigger'>
        <h1 className="collapsible-title">Rocket Details</h1>
        { rocketExpanded ? upArrow() : downArrow() }
    </div>


    const toggleDetailsOpen = () => {
        setDetailsExpanded(!detailsExpanded)
    }

    const toggleRocketOpen = () => {
        setRocketExpanded(!rocketExpanded)
    }


    useEffect(() => {
        window.scrollTo(0, 0)
        console.log(launchId)
        async function fetchData() {
            try {
                const resp = await axios.post('/api/launches/single', {
                        'flight_number': launchId
                }).then(response => {
                    console.log("Resp: ", response)
                    return response
                })

                let launch = resp.data.docs[0]
                console.log(launch)
                setResult(launch)

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    },[]);


    if(result){
        return (
            <section id="launch-info-container">
                <div id="launch-banner">
                        <h2 id="launch-title">{result.name}</h2>
                        <a id="watch-launch-button" href={result.links.webcast} target="_blank" rel="noopener noreferrer">View Launch</a>
                        <div style={{ fontSize: 65, position: 'absolute', bottom: 25 }}>
                            <Link id="button-link" 
                            to={`${window.location.pathname}#details`} 
                            style={{ color: 'white' }}
                            /* scroll={el => el.scrollIntoView({ behavior: 'instant', block: 'end' })} */>
                                <ExpandMoreIcon onClick={executeScroll} style={{ fontSize: 65 }}/>
                            </Link>
                        </div>
                </div>

                <a id="details" ref={myRef}/>
                <Collapsible open onOpening={toggleDetailsOpen} onClosing={toggleDetailsOpen} trigger={detailsTrigger()} className="collapsible-section" transitionTime={350} >
                    <div id="launch-details">
                        <div id='launch-info-text-grid'>
                            <div className="grid-item grid-label">Name: </div>
                            <div className="grid-item grid-field">{result.name}</div>
                            <div className="grid-item grid-label">Rocket: </div>  
                            <div className="grid-item grid-field">{result.rocket.name}</div>
                            <div className="grid-item grid-label">Payloads:</div>
                            <div className="grid-item grid-field">{result.payloads.map(p => <li key={p.id}>{p.name}</li>)}</div>
                            <div id='description-field' className="grid-item grid-label">
                                { result.details
                                    ? <p id="next-mission-desc">{result.details}</p>
                                    : <p id="next-mission-desc">No description available yet for this launch.</p> 
                                }
                            </div>
                        </div>
                    </div>
                </Collapsible>


                <Collapsible onOpening={toggleRocketOpen} onClosing={toggleRocketOpen} trigger={rocketTrigger()} className="collapsible-section" transitionTime={350}>
                    <RocketInfo rocket={result.rocket}/>
                </Collapsible>
               


                { result.links.flickr.original.length > 0 ?
                    <>
                        <div id="launch-images">
                            <h1 className="collapsible-title" style={{marginBottom: 50, marginTop: 50}} >Gallery</h1>
                            <LaunchImageSlider images={result.links.flickr.original} heading="test" />
                        </div>
                    </>
                : null}

                

            </section>
        )
    }

    return (
        <section id="launch-info-container">
            <div id="launch-banner">
            </div>
        </section>
    )
    
}
  
export default LaunchInfo
