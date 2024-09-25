// racer nama - team ID on paddleboard, name, tracker number

const race = [
        {      
            team_name: "01 SOLO",
            team_id: 5, //unique
            total_km: 80,
            race_records: [
                { racer_name: "Franta 233", startTime: '15:57:35', buoyTimes: { green: '16:00:00' }, endTime: '16:05:00', lapDistance: 12.8 },
                { racer_name: "Franta 233", startTime: '16:57:35', buoyTimes: { red: '17:00:00' }, endTime: '18:05:00', lapDistance: 4.8 },
                { racer_name: "Franta 233", startTime: '19:57:35', buoyTimes: { red: '20:00:00' }, endTime: '21:05:00', lapDistance: 4.8 },
                { racer_name: "Franta 233", startTime: '22:57:35', buoyTimes: { gray: '23:00:00' }, endTime: '', lapDistance: 4.8 },
                { racer_name: "Franta 233", startTime: '24:57:35', buoyTimes: { red: '24:00:00' }, endTime: '24:05:00', lapDistance: 4.8 },
                { racer_name: "Franta 233", startTime: '22:57:35', buoyTimes: { gray: '23:00:00' }, endTime: '', lapDistance: 4.8 },
            ]
        },{        
            team_name: "my jsme 1",
            team_id: 1, //unique
            total_km: 120,
            race_records: [
                { racer_name: "petr 232", startTime: '15:57:35', buoyTimes: { gray: ' ' }, endTime: ' ', lapDistance: 12.8 },
                { racer_name: "marcela 234", startTime: '16:57:35', buoyTimes: { red: '17:00:00' }, endTime: '18:05:00', lapDistance: 4.8 },
                { racer_name: "petr 232", startTime: '19:57:35', buoyTimes: { red: '20:00:00' }, endTime: '21:05:00', lapDistance: 4.8 },
                { racer_name: "petr 232", startTime: '22:57:35', buoyTimes: { red: '23:00:00' }, endTime: '00:05:00', lapDistance: 4.8 },
                { racer_name: "anna 233", startTime: '15:57:35', buoyTimes: { green: '16:00:00' }, endTime: '16:05:00', lapDistance: 12.8 },
                { racer_name: "marcela 234", startTime: '15:57:35', buoyTimes: { green: '16:00:00' }, endTime: '16:05:00', lapDistance: 12.8 },
                { racer_name: "anna 233", startTime: '16:57:35', buoyTimes: { red: '17:05:00' }, endTime: '18:08:00', lapDistance: 4.8 },
                { racer_name: "anna 233", startTime: '19:57:35', buoyTimes: { red: '20:06:00' }, endTime: '21:12:00', lapDistance: 4.8 },
                { racer_name: "marcela 234", startTime: '22:57:35', buoyTimes: { red: '23:07:00' }, endTime: '00:05:00', lapDistance: 4.8 },
                { racer_name: "marcela 234", startTime: '15:57:35', buoyTimes: { green: '16:00:00' }, endTime: '16:05:00', lapDistance: 12.8 },
                { racer_name: "petr 232", startTime: '15:57:35', buoyTimes: { green: '16:00:00' }, endTime: '16:05:00', lapDistance: 12.8 },
                { racer_name: "marcela 234",startTime: '16:57:35', buoyTimes: { red: '17:05:00' }, endTime: '18:08:00', lapDistance: 4.8 },
                { racer_name: "anna 233", startTime: '19:57:35', buoyTimes: { red: '20:06:00' }, endTime: '21:12:00', lapDistance: 4.8 },
                { racer_name: "marcela 234", startTime: '22:57:35', buoyTimes: { red: '23:07:00' }, endTime: '00:05:00', lapDistance: 4.8 },
                { racer_name: "marcela 234", startTime: '19:57:35', buoyTimes: { red: '20:06:00' }, endTime: '21:12:00', lapDistance: 4.8 },
                { racer_name: "petr 232", startTime: '22:57:35', buoyTimes: { red: '23:07:00' }, endTime: '00:05:00', lapDistance: 4.8 }
            ]
        },{
            team_name: "my jsme 2",
            team_id: 2, //unique
            total_km: 160,
            race_records: [
                { racer_name: "vaclav 235", startTime: '15:57:35', buoyTimes: { gray: '16:00:00' }, endTime: '', lapDistance: 12.8 },
                { racer_name: "jana 236", startTime: '16:57:35', buoyTimes: { red: '17:00:00' }, endTime: '18:05:00', lapDistance: 4.8 },
                { racer_name: "vaclav 235", startTime: '19:57:35', buoyTimes: { red: '20:00:00' }, endTime: '21:05:00', lapDistance: 4.8 },
                { racer_name: "vaclav 235", startTime: '22:57:35', buoyTimes: { red: '23:00:00' }, endTime: '00:05:00', lapDistance: 4.8 },
                { racer_name: "jana 236", startTime: '15:57:35', buoyTimes: { green: '16:00:00' }, endTime: '16:05:00', lapDistance: 12.8 },
                { racer_name: "vaclav 235", startTime: '15:57:35', buoyTimes: { green: '16:00:00' }, endTime: '16:05:00', lapDistance: 12.8 },
                { racer_name: "vaclav 235", startTime: '16:57:35', buoyTimes: { red: '17:05:00' }, endTime: '18:08:00', lapDistance: 4.8 },
                { racer_name: "jana 236", startTime: '19:57:35', buoyTimes: { gray: ' ' }, endTime: '21:12:00', lapDistance: 4.8 },
                { racer_name: "jana 236", startTime: '22:57:35', buoyTimes: { red: '23:07:00' }, endTime: '00:05:00', lapDistance: 4.8 },
                { racer_name: "jana 236", startTime: '15:57:35', buoyTimes: { green: '16:00:00' }, endTime: '16:05:00', lapDistance: 12.8 },
                { racer_name: "vaclav 235", startTime: '15:57:35', buoyTimes: { green: '16:00:00' }, endTime: '16:05:00', lapDistance: 12.8 },
                { racer_name: "jana 236",startTime: '16:57:35', buoyTimes: { red: '17:05:00' }, endTime: '18:08:00', lapDistance: 4.8 },
                { racer_name: "vaclav 235", startTime: '19:57:35', buoyTimes: { red: '20:06:00' }, endTime: '21:12:00', lapDistance: 4.8 },
                { racer_name: "jana 236", startTime: '22:57:35', buoyTimes: { gray: '23:07:00' }, endTime: '', lapDistance: 4.8 },
                { racer_name: "jana 236", startTime: '19:57:35', buoyTimes: { red: '20:06:00' }, endTime: '21:12:00', lapDistance: 4.8 },
                { racer_name: "vaclav 235", startTime: '22:57:35', buoyTimes: { red: '23:07:00' }, endTime: '00:05:00', lapDistance: 4.8 },
                { racer_name: "jana 236", startTime: '22:57:35', buoyTimes: { red: '23:07:00' }, endTime: '00:05:00', lapDistance: 4.8 },
                { racer_name: "jana 236", startTime: '15:57:35', buoyTimes: { green: '16:00:00' }, endTime: '16:05:00', lapDistance: 12.8 },
                { racer_name: "vaclav 235", startTime: '15:57:35', buoyTimes: { green: '16:00:00' }, endTime: '16:05:00', lapDistance: 12.8 },
                { racer_name: "jana 236",startTime: '16:57:35', buoyTimes: { red: '17:05:00' }, endTime: '18:08:00', lapDistance: 4.8 },
                { racer_name: "vaclav 235", startTime: '19:57:35', buoyTimes: { red: '20:06:00' }, endTime: '21:12:00', lapDistance: 4.8 },
                { racer_name: "jana 236", startTime: '22:57:35', buoyTimes: { gray: ' ' }, endTime: '00:05:00', lapDistance: 4.8 },
                { racer_name: "jana 236", startTime: '19:57:35', buoyTimes: { red: '20:06:00' }, endTime: '21:12:00', lapDistance: 4.8 },
                { racer_name: "vaclav 235", startTime: '22:57:35', buoyTimes: { red: '23:07:00' }, endTime: '00:05:00', lapDistance: 4.8 }
            ]
        },{
            team_name: "my jsme kopie 2",
            team_id: 2, //unique
            total_km: 160,
            race_records: [
                { racer_name: "vaclav 235", startTime: '15:57:35', buoyTimes: { gray: '16:00:00' }, endTime: '', lapDistance: 12.8 },
                { racer_name: "jana 236", startTime: '16:57:35', buoyTimes: { red: '17:00:00' }, endTime: '18:05:00', lapDistance: 4.8 },
                { racer_name: "vaclav 235", startTime: '19:57:35', buoyTimes: { red: '20:00:00' }, endTime: '21:05:00', lapDistance: 4.8 },
                { racer_name: "vaclav 235", startTime: '22:57:35', buoyTimes: { red: '23:00:00' }, endTime: '00:05:00', lapDistance: 4.8 },
                { racer_name: "jana 236", startTime: '15:57:35', buoyTimes: { green: '16:00:00' }, endTime: '16:05:00', lapDistance: 12.8 },
                { racer_name: "vaclav 235", startTime: '15:57:35', buoyTimes: { green: '16:00:00' }, endTime: '16:05:00', lapDistance: 12.8 },
                { racer_name: "vaclav 235", startTime: '16:57:35', buoyTimes: { red: '17:05:00' }, endTime: '18:08:00', lapDistance: 4.8 },
                { racer_name: "jana 236", startTime: '19:57:35', buoyTimes: { gray: '20:06:00' }, endTime: '', lapDistance: 4.8 },
                { racer_name: "jana 236", startTime: '22:57:35', buoyTimes: { red: '23:07:00' }, endTime: '00:05:00', lapDistance: 4.8 },
                { racer_name: "jana 236", startTime: '15:57:35', buoyTimes: { green: '16:00:00' }, endTime: '16:05:00', lapDistance: 12.8 },
                { racer_name: "vaclav 235", startTime: '15:57:35', buoyTimes: { green: '16:00:00' }, endTime: '16:05:00', lapDistance: 12.8 },
                { racer_name: "jana 236",startTime: '16:57:35', buoyTimes: { red: '17:05:00' }, endTime: '18:08:00', lapDistance: 4.8 },
                { racer_name: "vaclav 235", startTime: '19:57:35', buoyTimes: { red: '20:06:00' }, endTime: '21:12:00', lapDistance: 4.8 },
                { racer_name: "jana 236", startTime: '22:57:35', buoyTimes: { gray: '23:07:00' }, endTime: '', lapDistance: 4.8 },
                { racer_name: "jana 236", startTime: '19:57:35', buoyTimes: { red: '20:06:00' }, endTime: '21:12:00', lapDistance: 4.8 },
                { racer_name: "vaclav 235", startTime: '22:57:35', buoyTimes: { red: '23:07:00' }, endTime: '00:05:00', lapDistance: 4.8 }
            ]
        }
    ]
