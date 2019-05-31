<template>
  <div class="home">
    <div class="calendar-area">
      <tabel class="calendar">
        <thead class="calendar-header">
          <tr>
            <th>{{selectedDate.year}}</th>
          </tr>
          <tr>
            <th><div v-on:click="moveLastMonth">＜</div></th>
            <th>{{selectedDate.month}}</th>
            <th><div v-on:click="moveNextMonth">＞</div></th>
          </tr>
          <tr>
            <th v-for="week in weeks" v-bind:key="week">{{week}}</th>
          </tr>
        </thead>
        <tbody class="calendar-body">
          <tr v-for="weekCalenders in calendars" v-bind:key="weekCalenders">
            <td v-for="day in weekCalenders" v-bind:key="day">{{day}}</td>
          </tr>
        </tbody>
      </tabel>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data() {
    return {
      weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      selectedDate: { year: 0, month: 0 }
    };
  },
  created: function() {
    //現在の日付を取得しセットする
    const date = new Date();
    this.selectedDate.year = date.getFullYear();
    this.selectedDate.month = date.getMonth() + 1;
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
    //ひと月前へ戻す関数
    //---------------------
    moveLastMonth() {
      //1月の場合は12月へ変更し、昨年へ
      if (this.selectedDate.month === 1) {
        this.selectedDate.year--;
        this.selectedDate.month = 12;
      } else {
        this.selectedDate.month--;
      }
    },
    //---------------------
    //ひと月後へ進める関数
    //---------------------
    moveNextMonth() {
      //12月の場合は1月へ変更し、翌年へ
      if (this.selectedDate.month === 12) {
        this.selectedDate.year++;
        this.selectedDate.month = 1;
      } else {
        this.selectedDate.month++;
      }
    }
  },
  computed: {
    calendars() {
      // セットされている月の初日の曜日を取得
      const firstDayOfWeek = new Date(
        this.selectedDate.year,
        this.selectedDate.month - 1
      ).getDay();

      // セットされている月の晦日を取得
      const lastDay = new Date(
        this.selectedDate.year,
        this.selectedDate.month,
        0
      ).getDate();
      
      const calendars = [];
      let indexDay = 1;
      let fisrtRoopFlg = true; //初回のループの時のみ立つフラグ

      //カレンダー生成処理
      while(indexDay <= lastDay) {
        const weeksCalendars = [];
        for(let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++){
          //初日に曜日に達するまで、または、最終日を過ぎたときは空の文字列を格納
          if((fisrtRoopFlg && firstDayOfWeek > dayOfWeek) || indexDay > lastDay) {
            weeksCalendars.push('');
          }
          //それ以外は日にちを格納
          else{
            weeksCalendars.push(indexDay);
            indexDay++;
            fisrtRoopFlg = false;
          }
        }
        calendars.push(weeksCalendars);
      }
      return calendars;
    }
  }
};
</script>
