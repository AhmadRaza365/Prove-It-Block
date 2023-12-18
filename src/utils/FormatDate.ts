const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function FormateDate(date: string, format: "DD-MMM-YYYY" | "MMM-DD-YYYY" | "MMM DD, YYYY") {
    const jsDate = new Date(date);

    const day = jsDate.getDate()
    const month = months[jsDate.getMonth()];
    const year = jsDate.getFullYear()

    if (format === "DD-MMM-YYYY") {
        return `${day}-${month}-${year}`
    } else if (format === "MMM-DD-YYYY") {
        return `${month}-${day}-${year}`
    } else if (format === "MMM DD, YYYY") {
        return `${month} ${day}, ${year}`
    }
}

export { FormateDate }