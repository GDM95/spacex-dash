
// Returns all past launches, and populates name fields of payloads and rocket for the launch
const upcomingLaunchesQueryMin = {
    "query": {
        "upcoming": true
    },
    
    "options": {
        "pagination": false,
        "sort": {
            "date_utc": "asc"
        },
        "populate": [
            {
                "path": "payloads",
                "select": {
                "name": 1
                }
            },
            {
                "path": "rocket",
                "select": {
                "name": 1
                }
            }
        ]
    }
}

// Returns all past launches, and populates name fields of payloads and rocket for the launch
const pastLaunchesQueryMin = {
    "query": {
        "upcoming": false
    },
    
    "options": {
        "pagination": false,
        "populate": [
            {
                "path": "payloads",
                "select": {
                "name": 1
                }
            },
            {
                "path": "rocket",
                "select": {
                "name": 1
                }
            }
        ]
    }
}

// Returns launch data will payloads and rocket fields populated
const pastLaunchQuery = (flightNo) => {
    return {
        "query": {
            "flight_number": flightNo
        },
        
        "options": {
          "populate": [
                "payloads",
                "rocket"
          ]
        }
    }
}



module.exports = {
    pastLaunchQuery: pastLaunchQuery,
    pastLaunchesQueryMin: pastLaunchesQueryMin,
    upcomingLaunchesQueryMin: upcomingLaunchesQueryMin,
};