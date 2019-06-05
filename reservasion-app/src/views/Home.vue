<template>
  <div class="home">
    <div class="calendar-area">
      <tabel class="calendar">
        <thead class="calendar-header">
          <tr>
            <th>{{selectedDateInfo.year}}</th>
          </tr>
          <tr>
            <th v-for="dateInfo in weeklyCalendar" v-bind:key="dateInfo.date">{{dateInfo.date}}</th>
          </tr>
          <tr>
            <th v-for="dateInfo in weeklyCalendar" v-bind:key="dateInfo.date">{{dateInfo.day}}</th>
          </tr>
        </thead>
        <tbody class="calendar-body">
          <tr v-for="scheduleByTime in schedule" v-bind:key="scheduleByTime.time">
            <td v-for="dateInfo in scheduleByTime.calendar" v-bind:key="dateInfo.date">{{dateInfo.value}}</td>
          </tr>
        </tbody>
      </tabel>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {getWeeklyCalnendar} from '@/lib/functions'

export default {
  name: "home",
  components: {},
  data() {
    return {
    };
  },
  created: function() {
    console.log(this.$store.state.schedule.selectedDate)
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
      return monthName[month - 1];
    },
    //---------------------
    //指定された曜日の名称を取得する関数
    //---------------------
    getDayName(day) {
      const monthName = ["日", "月", "火", "水", "木", "金", "土"];
      return monthName[day];
    }
  },
  computed: {
    selectedDateInfo() {
      return this.$store.state.schedule.selectedDate;
    },
    weeklyCalendar() {
      const selectedYear = this.$store.state.schedule.selectedDate.year;
      const selectedMonth = this.$store.state.schedule.selectedDate.month;
      const selectedDate = this.$store.state.schedule.selectedDate.date;
      return getWeeklyCalnendar(selectedYear, selectedMonth, selectedDate)
    }
  }
};
</script>
