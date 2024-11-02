// racer nama - team ID on paddleboard, name, tracker number
//lap_time TODO

const race = [
        {      
            team_name: "01 SOLO",
            team_id: 5, //unique
            total_km: 80,
            lap_records: [
                { racer_name: "Franta 233", start_time: '15:57:35', buoy_time: { green: '16:00:00' }, finish_time: '16:05:00', lap_time: 12.8 },
                { racer_name: "Franta 233", start_time: '16:57:35', buoy_time: { red: '17:00:00' }, finish_time: '18:05:00', lap_time: 4.8 },
                { racer_name: "Franta 233", start_time: '19:57:35', buoy_time: { red: '20:00:00' }, finish_time: '21:05:00', lap_time: 4.8 },
                { racer_name: "Franta 233", start_time: '22:57:35', buoy_time: { gray: '23:00:00' }, finish_time: '', lap_time: 4.8 },
                { racer_name: "Franta 233", start_time: '24:57:35', buoy_time: { red: '24:00:00' }, finish_time: '24:05:00', lap_time: 4.8 },
                { racer_name: "Franta 233", start_time: '22:57:35', buoy_time: { gray: '23:00:00' }, finish_time: '', lap_time: 4.8 },
            ]
        },{        
            team_name: "my jsme 1",
            team_id: 1, //unique
            total_km: 120,
            lap_records: [
                { racer_name: "petr 232", start_time: '15:57:35', buoy_time: { gray: ' ' }, finish_time: ' ', lap_time: 12.8 },
                { racer_name: "marcela 234", start_time: '16:57:35', buoy_time: { red: '17:00:00' }, finish_time: '18:05:00', lap_time: 4.8 },
                { racer_name: "petr 232", start_time: '19:57:35', buoy_time: { red: '20:00:00' }, finish_time: '21:05:00', lap_time: 4.8 },
                { racer_name: "petr 232", start_time: '22:57:35', buoy_time: { red: '23:00:00' }, finish_time: '00:05:00', lap_time: 4.8 },
                { racer_name: "anna 233", start_time: '15:57:35', buoy_time: { green: '16:00:00' }, finish_time: '16:05:00', lap_time: 12.8 },
                { racer_name: "marcela 234", start_time: '15:57:35', buoy_time: { green: '16:00:00' }, finish_time: '16:05:00', lap_time: 12.8 },
                { racer_name: "anna 233", start_time: '16:57:35', buoy_time: { red: '17:05:00' }, finish_time: '18:08:00', lap_time: 4.8 },
                { racer_name: "anna 233", start_time: '19:57:35', buoy_time: { red: '20:06:00' }, finish_time: '21:12:00', lap_time: 4.8 },
                { racer_name: "marcela 234", start_time: '22:57:35', buoy_time: { red: '23:07:00' }, finish_time: '00:05:00', lap_time: 4.8 },
                { racer_name: "marcela 234", start_time: '15:57:35', buoy_time: { green: '16:00:00' }, finish_time: '16:05:00', lap_time: 12.8 },
                { racer_name: "petr 232", start_time: '15:57:35', buoy_time: { green: '16:00:00' }, finish_time: '16:05:00', lap_time: 12.8 },
                { racer_name: "marcela 234",start_time: '16:57:35', buoy_time: { red: '17:05:00' }, finish_time: '18:08:00', lap_time: 4.8 },
                { racer_name: "anna 233", start_time: '19:57:35', buoy_time: { red: '20:06:00' }, finish_time: '21:12:00', lap_time: 4.8 },
                { racer_name: "marcela 234", start_time: '22:57:35', buoy_time: { red: '23:07:00' }, finish_time: '00:05:00', lap_time: 4.8 },
                { racer_name: "marcela 234", start_time: '19:57:35', buoy_time: { red: '20:06:00' }, finish_time: '21:12:00', lap_time: 4.8 },
                { racer_name: "petr 232", start_time: '22:57:35', buoy_time: { red: '23:07:00' }, finish_time: '00:05:00', lap_time: 4.8 }
            ]
        },{
            team_name: "my jsme 2",
            team_id: 2, //unique
            total_km: 160,
            lap_records: [
                { racer_name: "vaclav 235", start_time: '15:57:35', buoy_time: { gray: '16:00:00' }, finish_time: '', lap_time: 12.8 },
                { racer_name: "jana 236", start_time: '16:57:35', buoy_time: { red: '17:00:00' }, finish_time: '18:05:00', lap_time: 4.8 },
                { racer_name: "vaclav 235", start_time: '19:57:35', buoy_time: { red: '20:00:00' }, finish_time: '21:05:00', lap_time: 4.8 },
                { racer_name: "vaclav 235", start_time: '22:57:35', buoy_time: { red: '23:00:00' }, finish_time: '00:05:00', lap_time: 4.8 },
                { racer_name: "jana 236", start_time: '15:57:35', buoy_time: { green: '16:00:00' }, finish_time: '16:05:00', lap_time: 12.8 },
                { racer_name: "vaclav 235", start_time: '15:57:35', buoy_time: { green: '16:00:00' }, finish_time: '16:05:00', lap_time: 12.8 },
                { racer_name: "vaclav 235", start_time: '16:57:35', buoy_time: { red: '17:05:00' }, finish_time: '18:08:00', lap_time: 4.8 },
                { racer_name: "jana 236", start_time: '19:57:35', buoy_time: { gray: ' ' }, finish_time: '21:12:00', lap_time: 4.8 },
                { racer_name: "jana 236", start_time: '22:57:35', buoy_time: { red: '23:07:00' }, finish_time: '00:05:00', lap_time: 4.8 },
                { racer_name: "jana 236", start_time: '15:57:35', buoy_time: { green: '16:00:00' }, finish_time: '16:05:00', lap_time: 12.8 },
                { racer_name: "vaclav 235", start_time: '15:57:35', buoy_time: { green: '16:00:00' }, finish_time: '16:05:00', lap_time: 12.8 },
                { racer_name: "jana 236",start_time: '16:57:35', buoy_time: { red: '17:05:00' }, finish_time: '18:08:00', lap_time: 4.8 },
                { racer_name: "vaclav 235", start_time: '19:57:35', buoy_time: { red: '20:06:00' }, finish_time: '21:12:00', lap_time: 4.8 },
                { racer_name: "jana 236", start_time: '22:57:35', buoy_time: { gray: '23:07:00' }, finish_time: '', lap_time: 4.8 },
                { racer_name: "jana 236", start_time: '19:57:35', buoy_time: { red: '20:06:00' }, finish_time: '21:12:00', lap_time: 4.8 },
                { racer_name: "vaclav 235", start_time: '22:57:35', buoy_time: { red: '23:07:00' }, finish_time: '00:05:00', lap_time: 4.8 },
                { racer_name: "jana 236", start_time: '22:57:35', buoy_time: { red: '23:07:00' }, finish_time: '00:05:00', lap_time: 4.8 },
                { racer_name: "jana 236", start_time: '15:57:35', buoy_time: { green: '16:00:00' }, finish_time: '16:05:00', lap_time: 12.8 },
                { racer_name: "vaclav 235", start_time: '15:57:35', buoy_time: { green: '16:00:00' }, finish_time: '16:05:00', lap_time: 12.8 },
                { racer_name: "jana 236",start_time: '16:57:35', buoy_time: { red: '17:05:00' }, finish_time: '18:08:00', lap_time: 4.8 },
                { racer_name: "vaclav 235", start_time: '19:57:35', buoy_time: { red: '20:06:00' }, finish_time: '21:12:00', lap_time: 4.8 },
                { racer_name: "jana 236", start_time: '22:57:35', buoy_time: { gray: ' ' }, finish_time: '00:05:00', lap_time: 4.8 },
                { racer_name: "jana 236", start_time: '19:57:35', buoy_time: { red: '20:06:00' }, finish_time: '21:12:00', lap_time: 4.8 },
                { racer_name: "vaclav 235", start_time: '22:57:35', buoy_time: { red: '23:07:00' }, finish_time: '00:05:00', lap_time: 4.8 }
            ]
        },{
            team_name: "my jsme kopie 2",
            team_id: 2, //unique
            total_km: 160,
            lap_records: [
                { racer_name: "vaclav 235", start_time: '15:57:35', buoy_time: { gray: '16:00:00' }, finish_time: '', lap_time: 12.8 },
                { racer_name: "jana 236", start_time: '16:57:35', buoy_time: { red: '17:00:00' }, finish_time: '18:05:00', lap_time: 4.8 },
                { racer_name: "vaclav 235", start_time: '19:57:35', buoy_time: { red: '20:00:00' }, finish_time: '21:05:00', lap_time: 4.8 },
                { racer_name: "vaclav 235", start_time: '22:57:35', buoy_time: { red: '23:00:00' }, finish_time: '00:05:00', lap_time: 4.8 },
                { racer_name: "jana 236", start_time: '15:57:35', buoy_time: { green: '16:00:00' }, finish_time: '16:05:00', lap_time: 12.8 },
                { racer_name: "vaclav 235", start_time: '15:57:35', buoy_time: { green: '16:00:00' }, finish_time: '16:05:00', lap_time: 12.8 },
                { racer_name: "vaclav 235", start_time: '16:57:35', buoy_time: { red: '17:05:00' }, finish_time: '18:08:00', lap_time: 4.8 },
                { racer_name: "jana 236", start_time: '19:57:35', buoy_time: { gray: '20:06:00' }, finish_time: '', lap_time: 4.8 },
                { racer_name: "jana 236", start_time: '22:57:35', buoy_time: { red: '23:07:00' }, finish_time: '00:05:00', lap_time: 4.8 },
                { racer_name: "jana 236", start_time: '15:57:35', buoy_time: { green: '16:00:00' }, finish_time: '16:05:00', lap_time: 12.8 },
                { racer_name: "vaclav 235", start_time: '15:57:35', buoy_time: { green: '16:00:00' }, finish_time: '16:05:00', lap_time: 12.8 },
                { racer_name: "jana 236",start_time: '16:57:35', buoy_time: { red: '17:05:00' }, finish_time: '18:08:00', lap_time: 4.8 },
                { racer_name: "vaclav 235", start_time: '19:57:35', buoy_time: { red: '20:06:00' }, finish_time: '21:12:00', lap_time: 4.8 },
                { racer_name: "jana 236", start_time: '22:57:35', buoy_time: { gray: '23:07:00' }, finish_time: '', lap_time: 4.8 },
                { racer_name: "jana 236", start_time: '19:57:35', buoy_time: { red: '20:06:00' }, finish_time: '21:12:00', lap_time: 4.8 },
                { racer_name: "vaclav 235", start_time: '22:57:35', buoy_time: { red: '23:07:00' }, finish_time: '00:05:00', lap_time: 4.8 }
            ]
        }
    ]
