//获取开始的日期
var getStartDate = function(n) {
    var dayStart = new Date();
    switch (n) {
        case 1:
            dayStart.setDate(dayStart.getDate() - 7);
            return dayStart.getFullYear() + "/" + (dayStart.getMonth() + 1) + "/" + dayStart.getDate();
        case 2:
            dayStart.setMonth(dayStart.getMonth() - 1);
            return dayStart.getFullYear() + "/" + (dayStart.getMonth() + 1) + "/" + dayStart.getDate();
        case 3:
            dayStart.setMonth(dayStart.getMonth() - 3);
            return dayStart.getFullYear() + "/" + (dayStart.getMonth() + 1) + "/" + dayStart.getDate();
        case 4:
            dayStart.setMonth(dayStart.getMonth() - 6);
            return dayStart.getFullYear() + "/" + (dayStart.getMonth() + 1) + "/" + dayStart.getDate();
        case 5:
            dayStart.setYear(dayStart.getFullYear() - 1);
            return dayStart.getFullYear() + "/" + (dayStart.getMonth() + 1) + "/" + dayStart.getDate();
        case 6:
            dayStart.setYear(dayStart.getFullYear() - 3);
            return dayStart.getFullYear() + "/" + (dayStart.getMonth() + 1) + "/" + dayStart.getDate();
        case 7:
            return "2000/1/1";
        default:
            dayStart.setFullYear(n, 0, 1);
            return dayStart.getFullYear() + "/" + (dayStart.getMonth() + 1) + "/" + dayStart.getDate();
    }
}
//获取结束的日期
var getEndDate = function (n) {
    var today = new Date();
    switch (n) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            return today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
        default:
            today.setFullYear(n, 11, 31);
            return today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
    }
}