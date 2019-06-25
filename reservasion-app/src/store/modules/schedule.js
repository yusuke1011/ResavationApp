import { getWeeklyCalnendar, getTimeCalendar, getData } from '@/lib/functions'
import { STATUS } from '@/lib/definitions'
import { db } from '@/plugins/firebase'

const state = {
    nowDate: (() => {
        const date = new Date()
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            date: date.getDate(),
            day: date.getDay()
        }
    })(),
    selectedDate: {},
    schedules: []
}

const getters = {
    weeklyCalendar: state => getWeeklyCalnendar(state.nowDate.year, state.nowDate.month, state.nowDate.date),
    timeSchedule: state => {
        const weeklyCalendar = getWeeklyCalnendar(state.nowDate.year, state.nowDate.month, state.nowDate.date)
        const timeCalendar = getTimeCalendar(weeklyCalendar)
        
        state.schedules.forEach(schedule => {
            const targetTime = timeCalendar.find(date => {
                return (schedule.time === date.time)
            })
            const targetDate = targetTime.calendar.find(date => {
                return (schedule.year === date.year && schedule.month === date.month && schedule.date === date.date)
            })
            if(targetDate){
                targetDate.status = STATUS.APPLYING
            }
        })

        return timeCalendar
    }
}

const mutations = {
    setSelectedDate(state, selectedDate) {
        state.selectedDate.year = selectedDate.year
        state.selectedDate.month = selectedDate.month
        state.selectedDate.date = selectedDate.date
        state.selectedDate.time = selectedDate.time
    },
    initSelctedDate(state) {
        state.selectedDate = {}
    },
    setSchedules(state, schedules) {
        state.schedules = schedules
    }
}

const actions = {
    async getSchedules({commit}) {
        const schedules = await getData(db, 'schedules')
        commit('setSchedules', schedules)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}