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
            const result_events_array = [] 
            const xls_data_zone_events = upload_xls.createJSONfromZones()//zones: reg, green, start, finish 
            const racers_list = upload_xls.createJSONfromRacers()//list of teams and racers console.log(racers_list)
            const racers_and_events = processRaceEvents(xls_data_zone_events, racers_list)
            const teams_and_events = [] //to fill team data with events - final result
            //console.log(xls_data_zone_events)

            racers_list.forEach( racer => {
                //let team = 
                if (! teams_and_events.find(team => team.team_id == racer.team_id ))
                    teams_and_events.push({
                        team_name: racer.team + " " + racer.team_id,
                        team_id: parseInt(racer.team_id), 
                        total_km: 0,
                        race_records: []
                    })
            }) //;console.log(teams_and_events)
            

            //TODO add racer records after thay are solved
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
            
            
            return teams_and_events
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

function processRaceEvents(events, racer_arr) {
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
            let event_tracker_id = parseInt(event.tracker)
            let event_list_index = event_list.findIndex( el => el.tracker_id == event_tracker_id )
            //console.log(event_list_index)
            event_list[event_list_index].race_events.push(event)
        })

        //to sort and solve each tracker race
        event_list.forEach( event_group =>
            final_event_list.push({
                tracker_id: event_group.tracker_id,
                race_events: processOneTrackerEvents(event_group.race_events)
            })
        )

        console.log(final_event_list) 
        return final_event_list
        
    } catch (error) {
        console.log(error)
    }
}

function processOneTrackerEvents (race_events) {
    try {

        let final_sorted_events = []

    
        return final_sorted_events

        
    } catch (error) {
        console.log(error)
    }
}



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