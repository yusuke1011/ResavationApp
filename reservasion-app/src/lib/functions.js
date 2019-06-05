export const getWeeklyCalnendar = (year, month, date) => {
    // セットされている月の晦日を取得
    const lastDay = new Date(year, month, 0).getDate();

    let day = new Date(year, month - 1, date).getDay();
    
    const weeklyCalendar = [];

    for (let index = 0; index < 7; index++) {
        const dateInfo = {};
        //日付の設定
        if (date <= lastDay) {
            dateInfo.date = month + '/' + date;
        }
        //
        else {
            date = 1;

            if (month === 12) {
                month = 1;
            }
            else {
                month++;
            }

            dateInfo.date = month + '/' + date;
        }

        //曜日の設定
        if (day < 7) {
            dateInfo.day = day;
        }
        else {
            day = 0;
            dateInfo.day = day;
        }

        weeklyCalendar.push(dateInfo);
        date++;
        day++;
    }
    return weeklyCalendar;
}

export const getDayName = (day) => {
    const monthName = ["日", "月", "火", "水", "木", "金", "土"];
    return monthName[day];
}