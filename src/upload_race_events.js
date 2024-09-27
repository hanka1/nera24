import upload_xls from './upload_xls.js'
  /*         {   "team_name": "01 SOLO",
            "team_id": 5, 
            "total_km": 80,
            "race_records": [
                {  "racer_name": "marcela 234",
                  "startTime": "16:57:35",
                  "buoyTimes": { "red": "17:00:00" },
                  "endTime": "18:05:00", 
                  "lapDistance": 4.8 }, }

        racer: { team_id: 31, team: 'MSM', name: 'Maky', tracker_id: 246 }
        array of zones objects = events: 
        { zone: 'finish', tracker: '231', time: '09/23/2023 14:43:56' },
        { zone: 'red', tracker: '231', time: '09/24/2023 10:41:30' }
    
        race_events: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object]
    ]
  },
        */

    //upload data from zonehist.xls

export default {
    createListForFE: async () => {
        try {
            const result_events_array = []  //it will return after is finished
            const xls_data_zone_events = upload_xls.createJSONfromZones()//zones: reg, green, start, finish 
            const racers_list = upload_xls.createJSONfromRacers()//list of teams and racers console.log(racers_list)
            const racers_and_events = await processRaceEvents(xls_data_zone_events, racers_list)
            const teams_and_events = [] //to fill team data with events - final result
            //console.log(xls_data_zone_events)

            racers_list.forEach( racer => {
                //let team = 
                if (! teams_and_events.find(team => team.team_id == racer.team_id ))
                    teams_and_events.push({
                        team_name: racer.team_id + " " + racer.team,
                        team_id: parseInt(racer.team_id), 
                        total_km: 0,
                        race_records: []
                    })
            }) //;console.log(teams_and_events)
            
            //to add racer records after thay are solved
            racers_and_events.forEach( final_event => {

                let team_index = teams_and_events.findIndex(team => team.team_id == final_event.team_id)
                teams_and_events[team_index].race_records.push(final_event)

            })

/*         //for FE tests
            //create object for each team and in team sort records according to time
            xls_data_zone_events.forEach( event => {

                let racer = racers_list.find(racer => racer.tracker_id == event.tracker )
                let team_index = teams_and_events.findIndex(team => team.team_id == racer.team_id)
     
                teams_and_events[team_index].race_records.push({
                    zone: event.zone, 
                    tracker: event.tracker, 
                    time: event.time,
                    racer_name: racer.name + " " + racer.tracker_id,
                    team_id: racer.team_id,
                    team_name: racer.team + " " + racer.team_id,
                })  
            })  //;console.log(teams_and_events)
            */
            
            return teams_and_events //its return for test
            return result_events_array

        } catch (err) {
            console.log(err)
        }
    },
    xx: () => {
        try {
            
            

        } catch (err) {
            console.log(err)
        }
    },
}

//event from xlsx table to be sorted a processed
async function processRaceEvents (xlx_events, racer_arr) {
    try {
        let final_event_arr = []
        let all_tracker_events_arr = []

        //create a record for each tracker id - to fill all_tracker_events_arr
        racer_arr.forEach( racer =>  
            all_tracker_events_arr.push({ //{ tracker_id: 232, race_events: [] },
                tracker_id: parseInt(racer.tracker_id),
                team_id: parseInt(racer.team_id),
                name: racer.name + " " +  racer.tracker_id,
                race_events: []
            })
        )

        //add all race events to racer tracker id = sort events to groups with the same tracker id
        //to fill all_tracker_events_arr.race_events
        xlx_events.forEach( event => {
            event.tracker = parseInt(event.tracker)
            let event_list_index = all_tracker_events_arr.findIndex( el => el.tracker_id == event.tracker)
            //console.log(event_list_index)
            all_tracker_events_arr[event_list_index].race_events.push(event)
        }) 

        //for each tracker to sort all events (in all_tracker_events_arr.race_events array ac. time)
        all_tracker_events_arr.forEach( tracker_obj => {
            tracker_obj.race_events.sort((a,b) => a.time - b.time)
        }) 

        //to process race events array
        all_tracker_events_arr.forEach( tracker_obj => {
           for (let i = 0; i < tracker_obj.race_events.length;){
                
                if (tracker_obj.race_events[i] && tracker_obj.race_events[ i + 1 ] && tracker_obj.race_events[ i + 2 ] ){
                   // console.log(i)
                    //console.log(tracker_obj.race_events.length,tracker_obj.tracker_id )
                   //start - buoy - finish
                    if (tracker_obj.race_events[i].zone == 'start' && (tracker_obj.race_events[ i + 1 ].zone == ("green" || "red")) && tracker_obj.race_events[ i + 2 ].zone == 'finish' ){
                    
                        let color = tracker_obj.race_events[ i + 1 ].zone == ("green" || "red") ? tracker_obj.race_events[ i + 1 ].zone : "grey"

                        final_event_arr.push({
                            racer_name: tracker_obj.name ? tracker_obj.name : tracker_obj.tracker_id,
                            startTime: tracker_obj.race_events[i].time,
                            buoyTimes: { [color] : tracker_obj.race_events[ i + 1 ].time },
                            endTime: tracker_obj.race_events[ i + 2 ].time, 
                            lapDistance: color == "red" ? 4.8 : ("green" ? 12.8 : 0),
                            team_id: tracker_obj.team_id
                        })
                
                        tracker_obj.race_events.splice(i, i + 1, i + 2)
                        i -= 3 //array was shorten
                    //TODO start - buoy - buoy - buoy - finish
                    } else //if (tracker_obj.race_events[i].zone == 'start' && (tracker_obj.race_events[ i + 1 ].zone == ("green" || "red")) && tracker_obj.race_events[ i + 2 ].zone == 'finish' ){){
                    ++i
                } else 
                ++i
            } 
             
        }) 
            
        console.log(final_event_arr)

        return final_event_arr

    } catch (err) {
        console.log(err)
    }
}

//////
/*
async function processRaceEvents2(events, racer_arr) {
    try {
        //create array of each event for each id
        let event_list = []
        let final_event_list = []
        //create a record for each tracker id
        racer_arr.forEach( racer =>  
            event_list.push({ //{ tracker_id: 232, race_events: [] },
                tracker_id: parseInt(racer.tracker_id),
                race_events: []
            })
        )
        //add all events from one tracker together = > for each tracker id is and object on event_list array
        events.forEach( event => {
            event.tracker = parseInt(event.tracker)
            let event_list_index = event_list.findIndex( el => el.tracker_id == event.tracker)
            //console.log(event_list_index)
            event_list[event_list_index].race_events.push(event)
        })
        //console.log(event_list) 
        //to sort and solve each tracker race
        event_list.forEach( event_group => {
            let processed_events = [] //= await processOneTrackerEvents(event_group.race_events, racer_arr)
            event_group.race_events.sort((a,b) => a.time - b.time)
            let final_sorted_events = []

            for (let i = 0; i < event_group.race_events.length;){
               if (event_group.race_events[i] && event_group.race_events[ i + 1 ] && event_group.race_events[ i + 2 ] ){
                    //console.log("still exists at least 3 records")
                    if (event_group.race_events[i].zone == 'start' && (event_group.race_events[ i + 1 ].zone == ("green" || "red")) && event_group.race_events[ i + 2 ].zone == 'finish' ){
                        //list.splice(1, 2) // arg are array indexes, CUT and return cut parts [2, 3],  list = [1, 4, 5]
                        //cut this three element ang push them to a new line.
                        /*
                        console.log(i)
                        console.log(event_group.race_events.length)
                        console.log(i , event_group.race_events[i ])
                        console.log(i+1 , event_group.race_events[i +1])
                        console.log(i+2 , event_group.race_events[ i + 2 ])
                        event_group.race_events.splice(i, i + 1, i + 2)
                        i -= 3 //array was shorten
                        
                        let racer_name = racer_arr.find( racer => racer.tracker_id == event_group.race_events[i].tracker)
                        let color = event_group.race_events[ i + 1 ].zone == ("green" || "red") ? event_group.race_events[ i + 1 ].zone : "grey"
                        final_sorted_events.push({
                            "racer_name": racer_name ? (racer_name.name + " " + event_group.race_events[i].tracker) : event_group.race_events[i].tracker,
                            "startTime": event_group.race_events[i].time,
                            "buoyTimes": { [color] : event_group.race_events[ i + 1 ].time },
                            "endTime": event_group.race_events[ i + 2 ].time, 
                            "lapDistance": color == "red" ? 4.8 : 12.8
                        })
                        
                    }
                    else ++i
                }  
            }   


            final_event_list.push({
                tracker_id: event_group.tracker_id,
                race_events: processed_events
            })

        })

        //console.log(final_event_list) 
        return final_event_list
        
    } catch (error) {
        console.log(error)
    }
}

function processOneTrackerEvents (race_events, racer_arr) {
    try {
        console.log("call process one events set")
        let final_sorted_events = []
        race_events.sort((a,b) => a.time - b.time)

        for (let i = 0; i < race_events.length;){
           if (race_events[i] && race_events[ i + 1 ] && race_events[ i + 2 ] ){
                console.log("still exists at least 3 records")
                if (race_events[i].zone == 'start' && (race_events[ i + 1 ].zone == ("green" || "red")) && race_events[ i + 2 ].zone == 'finish' ){
                    //list.splice(1, 2) // arg are array indexes, CUT and return cut parts [2, 3],  list = [1, 4, 5]
                    //cut this three element ang push them to a new line.
                    console.log(i)
                    //let new_final_event_record = await createNewFinalEventRecord(race_events[i], race_events[i+1], race_events[i+2], racer_arr)
                    //final_sorted_events.push(new_final_event_record)
                    console.log(race_events.length)
                    console.log(i , race_events[i ])
                    console.log(i+1 , race_events[i +1])
                    console.log(i+2 , race_events[ i + 2 ])
                    race_events.splice(i, i + 1, i + 2)
                    i -= 3 //array was shorten
                    
                    let racer_name = racer_arr.find( racer => racer.tracker_id == race_events[i].tracker)
                    let color = race_events[ i + 1 ].zone == ("green" || "red") ? race_events[ i + 1 ].zone : "grey"
                    final_sorted_events.push({
                        "racer_name": racer_name ? racer_name.name : race_events[i].tracker,
                        "startTime": race_events[i].time,
                        "buoyTimes": { [color] : race_events[ i + 1 ].time },
                        "endTime": race_events[ i + 2 ].time, 
                        "lapDistance": color == "red" ? 4.8 : 12.8
                    })
                    
                }
                else ++i
            }  
            //TODO ELSE two last gray record
            //console.log(final_sorted_events)
        }
    
        return final_sorted_events

        
    } catch (error) {
        console.log(error)
    }
}

async function createNewFinalEventRecord (race_events_0, race_events_1, race_events_2, racer_arr) {
    try {
        let racer_name = racer_arr.find( racer => racer.tracker_id == race_events_0.tracker)
        let color = race_events_1.zone == ("green" || "red") ? race_events_1.zone : "grey"
        console.log(race_events_1.zone)
        return {
            "racer_name": racer_name ? (racer_name.name + " " + race_events_0.tracker) : race_events_0.tracker,
            "startTime": race_events_0.time,
            "buoyTimes": { [color] : race_events_1.time },
            "endTime": race_events_2.time, 
            "lapDistance": color == "red" ? 4.8 : 12.8
        } 
    } catch (error) {
        console.log(error)
    }
}
*/


/*race_data.race

{
  race: [
    {
      team_name: '01 SOLO',
      team_id: 5,
      total_km: 80,
      race_records: [Array]
    },
}
*/