const state = {
    nowDate: (() => {
        const date = new Date();
        return {
            year:  date.getFullYear(),
            month: date.getMonth() + 1,
            date: date.getDate(),
            day: date.getDay()
        }
    })(),
    selectedDate: {},
    schedule: []
}

const mutations = {
    
}

const actions = {
    setSchedule(state, scheduleData) {
        
    }
}

export default {
    state,
    mutations,
    actions
}