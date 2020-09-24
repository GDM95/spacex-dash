import React, { Component, useEffect, useState } from 'react'
import UpcomingMissions from './UpcomingMissions'
import PastMissions from './PastMissions'
import Crew from './Crew'
import RoadsterTracker from './RoadsterTracker'
import TweetFeed from './TweetFeed'


const Home = props => {

        useEffect(() => {
            
        }, [])


        return(
            <div className="home">
                <UpcomingMissions />

                <PastMissions />

                {/* <RoadsterTracker /> */}

                {/* <TweetFeed /> */}
                

                <Crew />
            </div>
        )
}

export default Home
