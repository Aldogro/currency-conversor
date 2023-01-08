export const getFormattedDate = (date) => {
    const fullDate = Number(date * 1000)
    const day = new Date(fullDate).getDate()
    const month = new Date(fullDate).getMonth() + 1
    const year = new Date(fullDate).getFullYear()
    const hour = new Date(fullDate).getHours()
    const minute = new Date(fullDate).getMinutes()
    const minutes = minute < 10 ? `0${minute}` : minute
    
    return `${day}/${month}/${year} - ${hour}:${minutes}hs`
}