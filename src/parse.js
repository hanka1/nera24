export default {
    parseTime: (time) => {
        try {

            const jsDate = excelDateToJSDate(time);
            //console.log(time)
            //console.log(jsDate)
            const formattedDate = formatDate(jsDate);

            //console.log(formattedDate); // Output: "09/23/2024 15:57:35"
            return formattedDate

        } catch (err) {
            console.log(err)
        }
    },
    parseZone: (zone_cz) => {
        try {
            if (zone_cz == "start")
                return "start"
            else if (zone_cz == "cíl")
                return  "finish"
            else if (zone_cz == "červená")
                return "red"
            else if (zone_cz == "zelená")
                return "green"
            else
                return zone_cz
    
        } catch (error) {
            console.log(error)
        }
    }
}

function excelDateToJSDate(serial) {
    try {
        // Excel's epoch starts on January 1, 1900
        const excelEpoch = new Date(1899, 11, 30); // December 30, 1899
        const days = Math.floor(serial);
        const milliseconds = (serial - days) * 24 * 60 * 60 * 1000;
        const date = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000 + milliseconds);
        
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date conversion');
        }
    
    return date;

    } catch (err){
        console.log(err)
    }

}

function formatDate(date) {
    try {

        if (!(date instanceof Date)) {
            throw new TypeError('Expected a Date object');
        }
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;

    } catch (err) {
        console.log(err)
    }
   
}





