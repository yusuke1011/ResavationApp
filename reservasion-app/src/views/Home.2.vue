<template>
  <div class="home">
    <div class="calendar-area">
      <tabel class="calendar">
        <thead class="calendar-header">
          <tr>
            <th>{{selectedDate.year}}</th>
          </tr>
          <tr>
            <th v-for="dateInfo in calendar" v-bind:key="dateInfo.date">{{dateInfo.date}}</th>
          </tr>
          <tr>
            <th v-for="dateInfo in calendar" v-bind:key="dateInfo.date">{{dateInfo.day}}</th>
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

export default {
  name: "home",
  components: {},
  data() {
    return {
      selectedDate: { year: 0, month: 0, date: 0, day: 0 }
    };
  },
  created: function() {
    //現在の日付を取得しセットする
    const date = new Date();
    this.selectedDate.year = date.getFullYear();
    this.selectedDate.month = date.getMonth() + 1;
    this.selectedDate.date = date.getDate();
    this.selectedDate.day = date.getDay();

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

    /*
    const weeklyCalendar = [];

    for(let day = 0; day < 7; day++){
      const dateInfo = {};
      //初日に曜日に達するまで、または、最終日を過ぎたときは空の文字列を格納
      if(indexDate <= lastDay) {
        dateInfo.date = this.selectedDate.month + '/' + indexDate;
      }
      //
      else{
        indexDate = 1;
        this.selectedDate.month++;
        dateInfo.date = this.selectedDate.month + '/' + indexDate;
      }

      if(indexDay < 7){
        dateInfo.day = this.getDayName(indexDay);
      }
      else{
        indexDay = 0;
        dateInfo.day = this.getDayName(indexDay);
      }
      weeklyCalendar.push(dateInfo);
      indexDate++;
      indexDay++;
    }
    */

    let time = 14;
    const calendar = [];

    while(time < 23){
      const weeklyCalendar = [];
      let indexDate = this.selectedDate.date;
      let indexDay = this.selectedDate.day;

      for(let day = 0; day < 7; day++){
        const dateInfo = {};
        //日付の設定
        if(indexDate <= lastDay) {
          dateInfo.date = this.selectedDate.month + '/' + indexDate;
        }
        //
        else{
          indexDate = 1;
          this.selectedDate.month++;
          dateInfo.date = this.selectedDate.month + '/' + indexDate;
        }

        //曜日の設定
        if(indexDay < 7){
          dateInfo.day = this.getDayName(indexDay);
        }
        else{
          indexDay = 0;
          dateInfo.day = this.getDayName(indexDay);
        }

        //時間の設定
        dateInfo.hour = time + ':00';

        //値の設定
        if((dateInfo.day === '土' && time >= 19) || (dateInfo.day !== '日' && time >= 21)){
          //仮の値
          dateInfo.value = '問';
        }
        else{
          dateInfo.value = '要';
        }

        weeklyCalendar.push(dateInfo);
        indexDate++;
        indexDay++;
      }

      calendar.push({time: time, calendar: weeklyCalendar});
      time++;
    }

    console.log(calendar);

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
    calendar() {
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

      const calendar = [];
      let indexDate = this.selectedDate.date;
      let indexDay = this.selectedDate.day;

      for(let day = 0; day < 7; day++){
        const dateInfo = {};
        //初日に曜日に達するまで、または、最終日を過ぎたときは空の文字列を格納
        if(indexDate <= lastDay) {
          dateInfo.date = this.selectedDate.month + '/' + indexDate;
        }
        //
        else{
          indexDate = 1;
          this.selectedDate.month++;
          dateInfo.date = this.selectedDate.month + '/' + indexDate;
        }

        if(indexDay < 7){
          dateInfo.day = this.getDayName(indexDay);
        }
        else{
          indexDay = 0;
          dateInfo.day = this.getDayName(indexDay);
        }
        calendar.push(dateInfo);
        indexDate++;
        indexDay++;
      }
      
      return calendar;
    },
    schedule() {
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

      let time = 14;
      const calendar = [];

      while(time < 23){
        const weeklyCalendar = [];
        let indexDate = this.selectedDate.date;
        let indexDay = this.selectedDate.day;

        for(let day = 0; day < 7; day++){
          const dateInfo = {};
          //日付の設定
          if(indexDate <= lastDay) {
            dateInfo.date = this.selectedDate.month + '/' + indexDate;
          }
          //
          else{
            indexDate = 1;
            this.selectedDate.month++;
            dateInfo.date = this.selectedDate.month + '/' + indexDate;
          }

          //曜日の設定
          if(indexDay < 7){
            dateInfo.day = this.getDayName(indexDay);
          }
          else{
            indexDay = 0;
            dateInfo.day = this.getDayName(indexDay);
          }

          //時間の設定
          dateInfo.hour = time + ':00';

          //値の設定
          if((dateInfo.day === '土' && time >= 19) || (dateInfo.day !== '日' && time >= 21)){
            //仮の値
            dateInfo.value = '問';
          }
          else{
            dateInfo.value = '要';
          }

          weeklyCalendar.push(dateInfo);
          indexDate++;
          indexDay++;
        }

        calendar.push({time: time, calendar: weeklyCalendar});
        time++;
      }
      return calendar;
    }
  }
};
</script>
