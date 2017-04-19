/**
 * Created by Administrator on 2017/4/19.
 */
exports.convertWeekday = (num) => {
    switch (num) {
        case 1:
            return "星期一";
            break;
        case 2:
            return "星期二";
            break;
        case 3:
            return "星期三";
            break;
        case 4:
            return "星期四";
            break;
        case 5:
            return "星期五";
            break;
        case 6:
            return "星期六";
            break;
        case 7:
            return "星期天";
            break;
        default:
            return null
    }
};

exports.convertCodeToImage = (code) => {
    return `http://appimg.showapi.com/images/weather/icon/day/${code}.png`
}

exports.convertTime = (string) => {
    let result=string.slice(8,10)
    return `${result}时`
}