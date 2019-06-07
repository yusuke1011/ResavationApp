<template>
  <div class="home">
    <div class="calendar-area">
      <tabel class="calendar">
        <thead class="calendar-header">
          <tr>
            <th>{{nowDateInfo.year}}</th>
          </tr>
          <tr>
            <th v-for="dateInfo in weeklyCalendar" v-bind:key="dateInfo.date">{{getDataName(dateInfo.date, dateInfo.month)}}</th>
          </tr>
          <tr>
            <th v-for="dateInfo in weeklyCalendar" v-bind:key="dateInfo.date">{{getDayName(dateInfo.day)}}</th>
          </tr>
        </thead>
        <tbody class="calendar-body">
          <tr v-for="scheduleByTime in timeCalendar" v-bind:key="scheduleByTime.time">
            <td v-for="dateInfo in scheduleByTime.calendar" v-bind:key="dateInfo.date"><button v-on:click="selectDate(dateInfo)">{{getStatusName(dateInfo.status)}}</button></td>
          </tr>
        </tbody>
      </tabel>
    </div>
  </div>
</template>

<script>
import {getWeeklyCalnendar, getTimeCalendar} from '@/lib/functions'
import {STATUS} from '@/lib/definitions'

export default {
  name: "home",
  components: {},
  data() {
    return {
    };
  },
  created: function() {
    console.log(getTimeCalendar(this.weeklyCalendar))
    console.log(this.weeklyCalendar)
  },
  methods: {
    //---------------------
    //指定された月の名称を取得する関数
    //---------------------
    getMonthName(month) {
      const monthName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      return monthName[month - 1]
    },
    getDataName(date, month) {
      return month + '/' + date
    },
    //---------------------
    //指定された曜日の名称を取得する関数
    //---------------------
    getDayName(day) {
      const monthName = ["日", "月", "火", "水", "木", "金", "土"]
      return monthName[day]
    },
    getStatusName(status) {
      if(status === STATUS.APPROVAL || status === STATUS.APPLYING){
        return '×'
      }
      else if (status === STATUS.AVAILAVLE) {
        return '〇'
      }
      else if (status === STATUS.CONTACT) {
        return '要相談'
      }
    },
    selectDate(date, time) {
      console.log(date)
    }
  },
  computed: {
    nowDateInfo() {
      return this.$store.state.schedule.nowDate
    },
    weeklyCalendar() {
      const nowYear = this.$store.state.schedule.nowDate.year
      const nowMonth = this.$store.state.schedule.nowDate.month
      const nowDate = this.$store.state.schedule.nowDate.date
      return getWeeklyCalnendar(nowYear, nowMonth, nowDate)
    },
    timeCalendar() {
      return getTimeCalendar(Array.from(this.weeklyCalendar))
    }
  }
};
</script>
