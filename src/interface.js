//DATA FORMAT upload_from_json.js
//to be send from BE to FE
const result_race_data = [ //array of teams
  {
    team_name: '1 Martin',
    team_id: 1,
    total_km: 57.6,
    lap_records: [ //array of laps for each team
        {
            racer_name: 'Martin 232', //string
            start_time: '09/28/2024 10:31:43', //date and time lap strat
            buoy_time: { green: '09/28/2024 11:55:53' }, //buoy color and time
            finish_time: '09/28/2024 12:49:42',//date nad time lap finish
            lap_distance: 4.8, //lap lenght
            lap_time: '0:50', //one completed lap time
            team_id: 1 // unique number
        }, // .... for each lap one object
    ]
  }, // ....for each team one object
]
  
//DATA FORMAT upload_race_events.js

//data upload from xlxs file downloaded directly from trackers zonehist.xlsx
const xls_data_zone_events =  [//array of all events
    { 
        zone: 'green', //zones: reg, green, start, finish 
        tracker: 235, //tracker_id
        time: '09/28/2024 17:55:18', //date and time calculated from serial excel number
        time_xls_format: 45563.74673611111 //excel serial number for date
    },
  //... 432 more items
]

//
const racers_list = [ //array of racers, in one team can be more racers
    { team_id: 1, team: 'Martin', name: 'Martin', tracker_id: 232 },
    { team_id: 31, team: 'MSM', name: 'Maky', tracker_id: 246 },
    { team_id: 31, team: 'MSM', name: 'Milan', tracker_id: 244 },
    { team_id: 31, team: 'MSM', name: 'Standa', tracker_id: 245 },
    //...
]

//laps array sort by racer, prepared to be put together according teams
//array (one for each racer) of arrays (one for each processed lapp event)
const laps_array = [[{ 
    racer_name: 'Milan 244',
    start_time: '09/29/2024 09:24:10',
    buoy_time:  { green: '09/28/2024 11:55:53' },
    finish_time: '09/29/2024 10:05:50',
    lap_distance: 4.8,
    lap_time: '1:55',
    team_id: 31
  }
], [{},{},{}], [{},{},{},{},{}], [{},{},{}],]

const teams = result_race_data //teams are return to be resend to FE as result_race_data

const tracker = { //one object from all_tracker_events_arr
    tracker_id: 239,
    team_id: 55,
    name: 'Jana 239',
    race_events: [
      {
        zone: 'start',
        tracker: 239,
        time: '09/28/2024 10:31:46',
        time_xls_format: 45563.438726851855
      },
      {
        zone: 'green',
        tracker: 239,
        time: '09/28/2024 11:39:37',
        time_xls_format: 45563.48584490741
      }, {}, {}]}