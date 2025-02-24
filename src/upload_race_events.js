import upload_xls from './upload_xls.js'
import config from './config.js'

export default {
    //upload and process data from zonehist.xls
    createListForFE: async () => { //for fata format see interface.js
        try {

            // [] racers array
            const racers_list = upload_xls.createJSONfromRacers()// [] racers array

            //to upload trackers all events data: [] incl. zones: reg, green, start, finish
            const zone_events = config.SET_XLS_OR_WEB_EVENTS_LOADING == "xls" 
                                    //from xlsx files
                                    ? upload_xls.createJSONfromZones()
                                    //from oni web pages 
                                    : await upload_xls.createJSONfromZonesEventsOniWeb(racers_list)
  
            //to fill teams data with teams headings
            let teams = createTeamsArr(racers_list) // [] teams array, which will return after is finished
            
            //to process race events to laps array
            //event from xlsx table or oni web pages to be sorted and processed to complete laps
            const laps_array = processRaceEvents(zone_events, racers_list) 
            
            //to add lapps array to teams - assign racers laps to teams
            teams = createRowsForFETable(teams, laps_array)
  
            //return all teams with all their laps
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
                //console.log(lap)
                let team_index = teams.findIndex(team => team.team_id == lap.team_id)
                
                teams[team_index].lap_records.push(lap)
                teams[team_index].total_km = parseFloat(teams[team_index].total_km) + parseFloat(lap.lap_distance)
            })
        })

        teams.forEach ( team => {
            team.lap_records.sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
        })

        const last_20 = getLast20(teams, laps_array)

        return { teams: teams, last_20: last_20 }
        
    } catch (err) {
        console.log(err)
    }
}

//to get last 20 finished laps
function getLast20(teams, laps_array) {
    try {  
        const flat_laps = laps_array.flat()
        flat_laps.sort((a, b) => new Date(b.finish_time) - new Date(a.finish_time))
        teams.sort((a, b) => new Date(b.total_km) - new Date(a.total_km))
        teams.forEach((team, i) => {
            team.order = i + 1
        })

        const last20laps = flat_laps.slice(0, 20)
        last20laps.forEach( lap => {
            const team = teams.find(team => team.team_id == lap.team_id)
            lap.total_km = team.total_km
            lap.team_name = team.team_name
            lap.order = team.order
        })

        return last20laps
        
    } catch (err) {
        console.log(err)
    }
}
//race events from xlsx table to be sorted and processed to complete laps
function processRaceEvents (zone_events, racer_arr) {
    try { 
        let laps_array = []  
        
        //[] - create an emty record for each tracker id
        let all_tracker_events_arr = createAllTrakerEventsArr(racer_arr) //[{ tracker_id: 231, team_id: 12, name: 'Hanka 231', race_events: [] },...]

        //add all race events to racer tracker id == to sort events to groups with the same tracker id
        all_tracker_events_arr = fillAllRaceEvents(zone_events, all_tracker_events_arr)
     
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

        let missing_laps_arr = loadTrackerMissingData()
        laps_array.push(missing_laps_arr)

        return laps_array

    } catch (err) {
        console.log(err)
    }
}

//for each tracker (racer) proccess events to create rows (complete laps) to be ready to be added to team (team.result_race_data)
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
                    tracker_id: tracker.tracker_id,
                    start_time: tracker.race_events[i].time,
                    buoy_time: { [color] : tracker.race_events[i + 1].time },
                    finish_time: tracker.race_events[i + 2].time, 
                    lap_distance: color == "red" ? 4.8 : ("green" ? 12.8 : 0),
                    lap_time: calculateTimeDifference(tracker.race_events[i].time, tracker.race_events[i + 2].time),
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

function loadTrackerMissingData(){
    try {
        let missing_laps_array = []
        let array = upload_xls.uploadTrackerMissingLap()
        if (array.lenght == 0)
            return []
        
        array.forEach(record => {
            //console.log(record.color)
            //console.log(typeof(record.color))
            missing_laps_array.push({
                racer_name: record.name ? record.name : "",
                tracker_id: record.tracker_id ? record.tracker_id :  "",
                start_time: record.start_time,
                buoy_time: { [record.buoy_color]: " " },
                finish_time: record.finish_time, 
                lap_distance: record.buoy_color == "red" ? 4.8 : ("green" ? 12.8 : 0),
                lap_time: calculateTimeDifference(record.start_time, record.finish_time),
                team_id: record.team_id
            })

        })

        return missing_laps_array

    } catch (err) {
        console.log(err)
    }
}

function calculateTimeDifference(start_time, finish_time) {
    try {   
        let start = new Date(start_time)
        let end = new Date(finish_time)
    
        //to calculate the difference in milliseconds
        let differenceInMs = end - start
    
        //milliseconds to minutes
        let differenceInMinutes = differenceInMs / (1000 * 60)
    
        //hours and remaining minutes
        let hours = Math.floor(differenceInMinutes / 60)
        let minutes = differenceInMinutes % 60;
        minutes = Math.round(minutes)
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (minutes == 60) {
            minutes = '00'
            hours +=1
        }
    
        return `${hours}:${minutes}`

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
                    let [a, b] = [{}, {}] //TODO gray lap records
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
function fillAllRaceEvents (zone_events, all_tracker_events_arr) {
    try {  
        zone_events.forEach( event => {
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
                name: racer.name,
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
                    team_name: racer.team,
                    team_id: parseInt(racer.team_id), 
                    total_km: 0,
                    lap_records: []
                })
        }) 
        
        return teams_and_events

    } catch (err) {
        console.log(err)
    }
}