import upload_xls from './upload_xls.js'
import config from "./config.js"

export default {
    //upload and process data from zonehist.xls
    createListForFE: async () => { //for fata format see interface.js
        try {

            //to apload data from xlsx files - event array and sorted racers array
            const xls_data_zone_events = upload_xls.createJSONfromZones()//zones: reg, green, start, finish 
            const racers_list = upload_xls.createJSONfromRacers()// [] racers array
            
            //to fill teams data with teams headings
            let teams = createTeamsArr(racers_list) // [] teams array, which will return after is finished
            
            //to process race events to laps array
            //event from xlsx table to be sorted and processed to complete laps
            const laps_array = processRaceEvents(xls_data_zone_events, racers_list)
            
            //to add lapps array to teams - assign racers laps to teams
            teams = createRowsForFETable(teams, laps_array)
  
            //return teams_and_events //its return for test
            return teams

        } catch (err) {
            console.log(err)
        }
    }
}

//to assign racers laps to teams
function createRowsForFETable(teams, laps_array) {
    try {   

        laps_array.forEach( tracker_laps_arr => {
            tracker_laps_arr.forEach( lap => {
                let team_index = teams.findIndex(team => team.team_id == lap.team_id)
                
                teams[team_index].race_records.push(lap)
                teams[team_index].total_km = parseFloat(teams[team_index].total_km) + parseFloat(lap.lapDistance)
            })
        })

        teams.forEach ( team => {
            team.race_records.sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
        })

        return teams
        
    } catch (err) {
        console.log(err)
    }
}

//race events from xlsx table to be sorted and processed to complete laps
function processRaceEvents (xlx_events, racer_arr) {
    try { 
        let laps_array = []  
        
        //[] - create an emty record for each tracker id
        let all_tracker_events_arr = createAllTrakerEventsArr(racer_arr) //[{ tracker_id: 231, team_id: 12, name: 'Hanka 231', race_events: [] },...]

        //add all race events to racer tracker id == to sort events to groups with the same tracker id
        all_tracker_events_arr = fillAllRaceEvents(xlx_events, all_tracker_events_arr)
     
        //for each tracker to sort all events (in all_tracker_events_arr.race_events array ac. time)
        all_tracker_events_arr = sortAllRaceEvents(all_tracker_events_arr)

        //to solve double race events == racer goes more times in one zone, pass first red then green buoy etc.
        all_tracker_events_arr.forEach( tracker => {
            tracker = solveDoubleEvents (tracker)    
        })
        //console.log(all_tracker_events_arr)
        all_tracker_events_arr.forEach( tracker => {
            let tracker_laps_arr = createLapsRecords (tracker)
            //console.log(tracker_laps_arr)
            laps_array.push(tracker_laps_arr)      
        })

        return laps_array

    } catch (err) {
        console.log(err)
    }
}

//for each tracker (racer) proccess events to create rows (complete laps) to be ready to be added to team (team.race_data)
function createLapsRecords (tracker) {
    try {   
        let laps_arr = []

        let i = 0
        //to add laps start - buoy - finish
        while (tracker.race_events[i] && tracker.race_events[i + 1] && tracker.race_events[i + 2] ){
            if (tracker.race_events[i].zone == 'start' && (tracker.race_events[ i + 1 ].zone == "green" || tracker.race_events[i + 1].zone == ("red")) && tracker.race_events[i + 2].zone == 'finish' ){

                let color = (tracker.race_events[ i + 1 ].zone == "green" || tracker.race_events[ i + 1 ].zone == ("red")) ? tracker.race_events[ i + 1 ].zone : "grey"
                
                laps_arr.push({
                    racer_name: tracker.name ? tracker.name : tracker.tracker_id,
                    startTime: tracker.race_events[i].time,
                    buoyTimes: { [color] : tracker.race_events[i + 1].time },
                    endTime: tracker.race_events[i + 2].time, 
                    lapDistance: color == "red" ? 4.8 : ("green" ? 12.8 : 0),
                    team_id: tracker.team_id
                })
            } tracker.race_events.splice(i, 3)
        }
        //console.log(laps_arr)
        return laps_arr 

    } catch (err) {
        console.log(err)
    }
}


//to eliminate double records from one zone
function solveDoubleEvents (tracker) {
    try {  

        //TODO gray lap records
        //console.log(tracker)
        tracker = solveMissingStart(tracker)
        tracker = solveDoubleBuoys(tracker)
        tracker = solveDoubleStartFinish(tracker)
        tracker = solveFinishStartFinish(tracker)

        return tracker
    
        } catch (err) {
            console.log(err)
        }
    }

//to eliminate buoy - buoy  
function solveDoubleBuoys (tracker) {
    try {  
        if ( tracker && tracker.race_events && tracker.race_events[1] ){
            tracker.race_events.forEach((el, i, array) => {
                if (array[i+1] &&
                    (array[i].zone == "green" || array[i].zone == "red") && 
                    ( array[i + 1].zone == "green" || array[i + 1].zone == "red")){
                    let a, b = [{}, {}] //TODO gray lap records
                    if (array[i].zone == "red")
                        a = array.splice(i, 1)
                    else 
                        b = array.splice(i + 1, 1)
                    tracker = solveDoubleBuoys (tracker)
                }
            })
        }

        return tracker

    } catch (err) {
        console.log(err)
    }
}

//to eliminate start - finish - start
function solveFinishStartFinish(tracker)  {
    try {   
        
        if (tracker && tracker.race_events && tracker.race_events[2] ){
            tracker.race_events.forEach((el, i, array) => {
                if (array[i + 2] && array[i].zone == array[i + 2].zone) {
                    if (array[i].zone == "start"){
                        array.splice(i, 2)
                        tracker = solveDoubleStartFinish(tracker)
                        tracker = solveFinishStartFinish(tracker)
                    } else if (array[i].zone == "finish"){
                        array.splice(i + 1, 2)
                        tracker = solveDoubleStartFinish(tracker)
                        tracker = solveFinishStartFinish(tracker)
                    }     
                }
            })

        }  
        return tracker

    } catch (err) {
        console.log(err)
    }
}

//to eliminate start - start, finish - finish
function solveDoubleStartFinish(tracker)  {
    try {   
        if ( tracker && tracker.race_events && tracker.race_events[1] ){
            tracker.race_events.forEach((el, i, array) => {
                if (array[i + 1] && array[i].zone == array[i + 1].zone) {
                    if (array[i].zone == "start"){
                        array.splice(i, 1)
                        tracker = solveDoubleStartFinish(tracker)
                    } else if (array[i].zone == "finish"){
                        array.splice(i + 1, 1)
                        tracker = solveDoubleStartFinish(tracker)
                    }
                }
            })
        }  
        return tracker

    } catch (err) {
        console.log(err)
    }
}

//to add lap start if missing (forst, or after finish)
function solveMissingStart(tracker)  {
    try {   

        if (tracker && tracker.race_events[0] && tracker.race_events[0].zone != "start")
            tracker.race_events.unshift({
                zone: 'start',
                tracker: tracker.tracker_id,
                time: config.START_TIME,
            })

        if (tracker && tracker.race_events && tracker.race_events[1] ){
            tracker.race_events.forEach((el, i, array) => {
                if (array[i] && array[i + 1] && array[i].zone == "finish" && 
                    (array[i + 1].zone == "green" || array[i + 1].zone == "red")){
                    array.splice(i + 1, 0,{ //to create new start from finish time
                        zone: 'start',
                        tracker: tracker.tracker_id,
                        time: array[i].time
                    })
                    i+=2
                } 
            })
        }

        return tracker

    } catch (err) {
        console.log(err)
    }
}

//for each tracker to sort all events (in all_tracker_events_arr.race_events array acc. time)
function sortAllRaceEvents (all_tracker_events_arr) {
    try {   

        all_tracker_events_arr.forEach( tracker => {
            if (tracker.race_events)
                tracker.race_events.sort((a, b) => new Date(a.time) - new Date(b.time));
        }) 

    return all_tracker_events_arr
        
    } catch (err) {
        console.log(err)
    }
}

//add all race events to racer tracker id => sort events to groups with the same tracker id
//to fill all_tracker_events_arr.race_events
function fillAllRaceEvents (xlx_events, all_tracker_events_arr) {
    try {  
        xlx_events.forEach( event => {
            event.tracker = parseInt(event.tracker)
            let event_list_index = all_tracker_events_arr.findIndex( el => el.tracker_id == event.tracker)
            //console.log(event_list_index)
            all_tracker_events_arr[event_list_index].race_events.push(event)
        })  

        return all_tracker_events_arr
        
    } catch (err) {
        console.log(err)
    }
}

//[] - create an emty record for each tracker id => to fill all_tracker_events_arr
function createAllTrakerEventsArr (racer_arr) {
    try {   

        let all_tracker_events_arr = []
        
        racer_arr.forEach( racer =>  
            all_tracker_events_arr.push({ //{ tracker_id: 232, race_events: [] },
                tracker_id: parseInt(racer.tracker_id),
                team_id: parseInt(racer.team_id),
                name: racer.name + " " +  racer.tracker_id,
                race_events: []
            })
        ) 

        all_tracker_events_arr.sort((a,b) => a.team_id - b.team_id)
        
        return all_tracker_events_arr
        
    } catch (err) {
        console.log(err)
    }
}

//to fill teams data with teams headings
function createTeamsArr (racers_list) {
    try {   
        let teams_and_events = []
        racers_list.forEach( racer => {

            if (! teams_and_events.find(team => team.team_id == racer.team_id ))
                teams_and_events.push({
                    team_name: racer.team_id + " " + racer.team,
                    team_id: parseInt(racer.team_id), 
                    total_km: 0,
                    race_records: []
                })
        }) 
        
        return teams_and_events

    } catch (err) {
        console.log(err)
    }
}