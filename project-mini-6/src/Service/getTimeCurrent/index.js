export const getTimeCurrent = ()=>{
    const date = new Date();
    let second =date.getSeconds();
    second =second >9?second:`0${second}`;
    let minute = date.getMinutes();
    minute = minute>9?minute:`0${minute}`;
    let hour = date.getHours();
    hour = hour>9?hour:`0${hour}`;
    let day = date.getDate();
    day=day>9?day:`${day}`;
    let month =date.getDate();
    month=month>9?month:`0${month}`;
    let year = date.getFullYear();
    return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
}