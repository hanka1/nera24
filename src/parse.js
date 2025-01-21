export default {
    parseTimeUnit: (timeunit) => {
        try {

            return formatDate(new Date(timeunit), 0)

        } catch (err) {
            console.log(err)
        }
    },
    parseTime: (time) => {
        try {

            const jsDate = excelDateToJSDate(time)
            const formattedDate = formatDate(jsDate, 2)
            return formattedDate

        } catch (err) {
            console.log(err)
        }
    },
    //to parse bouya zones
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
        let date = new Date((serial - (25567 + 2)) * 24 * 60 * 60 * 1000)
        
        //25567 -> number of days from January 1, 1900, to January 1, 1970 (the Unix epoch). 
        //+ 2 -> accounts for Excel’s incorrect leap year calculation for the year 1900 (Excel incorrectly treats 1900 as a leap year).
        //24 * 60 * 60 -> is the number of seconds in a day (24 hours * 60 minutes * 60 seconds).
        //1000 -> miliseconds
        
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date conversion');
        }
    
        return date;

    } catch (err){
        console.log(err)
    }

}

function formatDate(date, utc_xls_deduct) {
    try {
        if (!(date instanceof Date)) {
            throw new TypeError('Expected a Date object');
        }

        // Get the UTC time
        const utcYear = date.getUTCFullYear()
        const utcMonth = date.getUTCMonth()
        const utcDay = date.getUTCDate()
        const utcHours = date.getUTCHours()
        const utcMinutes = date.getUTCMinutes()
        const utcSeconds = date.getUTCSeconds()

        // Calculate the CEST time (UTC - 2 hours)
        const cestDate = new Date(Date.UTC(utcYear, utcMonth, utcDay, utcHours - utc_xls_deduct, utcMinutes, utcSeconds))

        const year = cestDate.getFullYear()
        const month = String(cestDate.getMonth() + 1).padStart(2, '0')
        const day = String(cestDate.getDate()).padStart(2, '0')
        const hours = String(cestDate.getHours()).padStart(2, '0')
        const minutes = String(cestDate.getMinutes()).padStart(2, '0')
        const seconds = String(cestDate.getSeconds()).padStart(2, '0')

        return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`

    } catch (err) {
        console.log(err)
    }
}






