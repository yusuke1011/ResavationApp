const state = {
    selectedDate: (() => {
        const date = new Date();
        return {
            year:  date.getFullYear(),
            month: date.getMonth() + 1,
            date: date.getDate(),
            day: date.getDay()
        }
    })(),
    afterDate: {},
    timeCalendar: [],
    weeklyCalendar: []
}

const mutations = {
    getWeeklyCalendar(state) {
        // セットされている月の晦日を取得
        const lastDay = new Date(
            state.selectedDate.year,
            state.selectedDate.month,
            0
        ).getDate();

        let indexYear = state.selectedDate.year;
        let indexMonth = state.selectedDate.month;
        let indexDate = state.selectedDate.date;
        let indexDay = state.selectedDate.day;

        for (let day = 0; day < 7; day++) {
            const dateInfo = {};
            //日付の設定
            if (indexDate <= lastDay) {
                dateInfo.date = indexMonth + '/' + indexDate;
            }
            //
            else {
                indexDate = 1;

                if(indexMonth === 12){
                    indexMonth = 1;
                    indexYear++;
                }
                else{
                    indexMonth++;
                }

                dateInfo.date = indexMonth + '/' + indexDate;
            }

            //曜日の設定
            if (indexDay < 7) {
                dateInfo.day = this.getDayName(indexDay);
            }
            else {
                indexDay = 0;
                dateInfo.day = this.getDayName(indexDay);
            }

            state.weeklyCalendar.push(dateInfo);
            indexDate++;
            indexDay++;
        }

        state.afterDate.year = indexYear;
        state.afterDate.month = indexMonth;
        state.afterDate.date = indexDate;
        state.afterDate.day = indexDay;
    },
    getTimeCalendar(state) {
        // セットされている月の晦日を取得
        const lastDay = new Date(
            state.selectedDate.year,
            state.selectedDate.month,
            0
        ).getDate();

        let time = 14;

        while (time < 23) {
            const weeklyCalendar = Array.from(state.weeklyCalendar);
            
            weeklyCalendar.forEach((dateInfo) => {
                //日付の設定
                if (indexDate <= lastDay) {
                    dateInfo.date = indexMonth + '/' + indexDate;
                }
                //
                else {
                    indexDate = 1;

                    if(indexMonth === 12){
                        indexMonth = 1;
                        indexYear++;
                    }
                    else{
                        indexMonth++;
                    }

                    dateInfo.date = indexMonth + '/' + indexDate;
                }

                //曜日の設定
                if (indexDay < 7) {
                    dateInfo.day = this.getDayName(indexDay);
                }
                else {
                    indexDay = 0;
                    dateInfo.day = this.getDayName(indexDay);
                }

                //値の設定(初期値)
                if ((dateInfo.day === '土' && time >= 19) || (dateInfo.day !== '日' && time >= 21)) {
                    //仮の値
                    dateInfo.value = '問';
                }
                else {
                    dateInfo.value = '要';
                }

                //時間の設定
                dateInfo.hour = time + ':00';

                weeklyCalendar.push(dateInfo);
                indexDate++;
                indexDay++;
            });

            state.timeCalendar.push({ time: time, calendar: weeklyCalendar });
            time++;
        }
    }
}

const actions = {
    getScedule() {
        
    }
}

export default {
    state,
    mutations,
    actions
}