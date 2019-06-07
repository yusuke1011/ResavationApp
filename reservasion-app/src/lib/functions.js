import {DAY_NAME, STATUS, BORDER_TIME} from '@/lib/definitions'

export const getWeeklyCalnendar = (year, month, date) => {
    // セットされている月の晦日を取得
    const lastDay = new Date(year, month, 0).getDate();

    let day = new Date(year, month - 1, date).getDay();
    
    const weeklyCalendar = [];

    for (let index = 0; index < 14; index++) {
        const dateInfo = {};
        //日付の設定
        if (date <= lastDay) {
            dateInfo.date = date;
            dateInfo.month = month;
            dateInfo.year = year;
        }
        //
        else {
            date = 1;

            if (month === 12) {
                month = 1;
                year++;
            }
            else {
                month++;
            }

            dateInfo.date = date;
            dateInfo.month = month;
            dateInfo.year = year;
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

export const getTimeCalendar = (weeklyCalendar) => {
    let time = 14;
    const timeCalendar = [];

    while (time < 23) {

        const weeklyCalendarCopy = JSON.parse(JSON.stringify(weeklyCalendar));

        weeklyCalendarCopy.forEach((dateInfo) => {
            //値の設定(初期値)
            if (dateInfo.day !== DAY_NAME.SUN && dateInfo.day !== DAY_NAME.SAT && dateInfo.day !== DAY_NAME.FRI && time >= BORDER_TIME) {
                //仮の値
                dateInfo.status = STATUS.AVAILAVLE;
            }
            else {
                dateInfo.status = STATUS.CONTACT;
            }

            //時間の設定
            dateInfo.hour = time;
        });

        timeCalendar.push({ time: time, calendar: weeklyCalendarCopy });
        time++;
    }

    return timeCalendar;
}