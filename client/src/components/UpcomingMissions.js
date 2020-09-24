import React, { Component, useEffect, useState } from 'react'
import Slider from "react-slick";
import Countdown, { calcTimeDelta } from 'react-countdown';
import axios from 'axios';



const UpcomingMissions = props => {

    const [result, setResult] = useState(null);
    const [targetDateTime, setTargetDateTime] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)


    const updateMissionCountdown = (newIndex) => {
        setActiveSlide(newIndex)
        setTargetDateTime(result[newIndex].date_local)
        console.log("Changed slides to: ", result[newIndex])
    }


    async function fetchData() {
        try {
            const resp = await axios.post('/api/launches/upcoming').then(response => {
                console.log(response)
                return response
            })
            let launches = resp.data.docs
            setResult(launches);
            setTargetDateTime(launches[activeSlide].date_local)
        } catch (error) {
            console.error(error);
        }
    }



    useEffect(() => {
      
    }, [activeSlide]);


    // Random component
    const Completionist = () => <span>You are good to go!</span>;

    // Returns a 'launchtime TBD' message
    const noCountdownMessage = () => {
        return (
            <div className="countdown-tbd-message">
                <p>Launch Time: TBD</p>
            </div>
        )
    }

    // Returns the digits of remaining time -- if the time given is valid
    const countdownDigits = (data) => {
        const { days, hours, minutes, seconds } = data
        return (
            <>
                <div className="labled-digit">
                        <p>{days}</p>
                        <p>Days</p>
                    </div>
                    <div className="labled-digit">
                        <p>{hours}</p>
                        <p>Hours</p>
                    </div>
                    <div className="labled-digit">
                        <p>{minutes}</p>
                        <p>Mins</p>
                    </div>
                    <div className="labled-digit">
                        <p>{seconds}</p>
                        <p>Secs</p>
                </div>
            </>
        )
    }
    

    // Renderer callback with condition
    const renderer = (props) => {

        //console.log("Render props: ", props )

        //let delta = calcTimeDelta(targetDateTime)
        let completed = props.completed
        let formattedData = props.formatted
        //console.log("Delta: ", delta)

        let status = <></>
        if (completed) {
            // Render a completed state
            status = noCountdownMessage()
        } else {
            // Render a countdown
            status = countdownDigits(formattedData)
        }

        let wrapper = 
            <div className="countdown-container">
                { status }
            </div>

        return wrapper
    };


    const settings = {
        dots: true,
        infinite: true,
        adaptiveHeight: false,
        arrows: false,
        draggable: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dotsClass: 'slick-dots slick-thumb missions-slider-dots',
        appendDots: dots => <ul>{dots}</ul>,
        afterChange: updateMissionCountdown,
        onInit: fetchData,
        //onReInit: () => console.log("Slider reinitialized"),
        //fade: true,
    };

    const Item = (props) => {
        const item = props.item
        return (
            <div className="next-mission">
                { item.links.patch.small
                        ? <img src={item.links.patch.small} />
                        : <img src="/spacex_patch.jpg" id="no-patch-logo"/>
                }
                <div id="next-mission-text">

                    { targetDateTime 
                        ? <Countdown zeroPadTime={2} zeroPadDays={2} date={targetDateTime} renderer={renderer} />
                        : console.log("No Target DateTime")
                    }
                    
                    <div className='next-mission-text-grid'>
                        <div className="grid-item grid-label">Name: </div>
                        <div className="grid-item grid-field">{item.name}</div>
                        <div className="grid-item grid-label">Rocket: </div>  
                        <div className="grid-item grid-field">{item.rocket.name}</div>
                        <div className="grid-item grid-label">Payloads:</div>
                        <div className="grid-item grid-field">{item.payloads.map(p => <li>{p.name}</li>)}</div>
                        <div id='description-field' className="grid-item grid-label">
                            { item.details
                                ? <p id="next-mission-desc">{item.details}</p>
                                : <p id="next-mission-desc">No description available yet for this launch.</p> 
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }


    return(
        <section className="upcoming-missions-section">
            <h1 className="section-title" id="upcoming-missions-title">Upcoming Launches</h1>
            {console.log(result)}
            <Slider {...settings}>
                {
                    result && result.map((item, i) => <Item key={item.id} item={item} /> )
                }
            </Slider>
        </section>
    )
}



export default UpcomingMissions
