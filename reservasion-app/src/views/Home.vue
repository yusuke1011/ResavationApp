<template>
  <div class="home">
    <div class="calendar-area">
      <table class="calendar">
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
      </table>
    </div>

    <!--予約モーダルウィンドウ-->
    <Modal v-on:close="closeModal" v-if="reserveModalFlg">
      <p>お名前（Slackで使用しているもの）</p>
      <div>
        <input class="modal-input" v-model="userName">
      </div>
      <p>ご用件</p>
      <div>
        <input class="modal-input input-requirement" v-model="requirement">
      </div>
      <div>
        <b-button type="button" size="sm" variant="btn btn-danger" v-on:click="execReservation">予約する</b-button>
      </div>
    </Modal>

    <!--確認モーダルウィンドウ-->
    <Modal v-on:close="closeModal" v-if="confirmModalFlg">
      <p>予約者</p>
      <div>
        {{reserverName}}
      </div>
      <p>ご用件</p>
      <div>
        {{message}}
      </div>
    </Modal>

    <!--注意書きモーダルウィンドウ-->
    <Modal v-on:close="closeModal" v-if="attentionModalFlg">
      <p>Slackにてお問い合わせください。</p>
    </Modal>
  </div>
</template>

<script>
import {getWeeklyCalnendar, getTimeCalendar} from '@/lib/functions'
import {STATUS} from '@/lib/definitions'
import { db } from '../plugins/firebase'
import Modal from '../components/Modal'

export default {
  name: "home",
  components: {},
  data() {
    return {
      reserveModalFlg: false,
      confirmModalFlg: false,
      attentionModalFlg: false,
      userName: '',
      requirement: '',
      reserverName: '',
      mmessage: ''
    };
  },
  components: {
    Modal
  },
  created: async function() {
    await this.$store.dispatch('getSchedules')
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
    async selectDate(dateInfo) {
      //モーダルウィンドウを表示
      if(dateInfo.status === STATUS.APPROVAL || dateInfo.status === STATUS.APPLYING){
      
        const querySnapshot = await db
        .collection('schedules')
        .where('year', '==', dateInfo.year)
        .where('month', '==', dateInfo.month)
        .where('date', '==', dateInfo.date)
        .where('time', '==', dateInfo.time)
        .get()
        .catch(err => {
          console.log(err)
          this.$store.commit('setErr', {errMsg: err.message})
        })

        const selectedSchedule = querySnapshot.docs.map(doc => {
          return doc.data();
        })

        this.reserverName = selectedSchedule[0].name
        this.message = selectedSchedule[0].msg

        this.confirmModalFlg = true
      }
      else if (dateInfo.status === STATUS.AVAILAVLE) {
        this.reserveModalFlg = true
      }
      else if (dateInfo.status === STATUS.CONTACT) {
        this.attentionModalFlg = true
      }

      this.$store.commit('setSelectedDate', {
        year: dateInfo.year,
        month: dateInfo.month,
        date: dateInfo.date,
        time: dateInfo.time
      })
    },
    async execReservation() {
      await db.collection("schedules").add({
        year: this.$store.state.schedule.selectedDate.year,
        month: this.$store.state.schedule.selectedDate.month,
        date: this.$store.state.schedule.selectedDate.date,
        time: this.$store.state.schedule.selectedDate.time,
        name: this.userName,
        msg: this.requirement
      })
      .catch(err => {
        console.log(err)
        this.$store.commit('setErr', {errMsg: err.message})
      })

      this.$store.dispatch('getSchedules')

      this.userName = ''
      this.requirement = ''

      //モーダルウィンドウを非表示
      this.reserveModalFlg = false
    },
    closeModal() {
      //モーダルウィンドウを非表示
      this.confirmModalFlg = false
      this.reserveModalFlg = false
      this.attentionModalFlg = false

      this.$store.commit('initSelctedDate')
    }
  },
  computed: {
    nowDateInfo() {
      return this.$store.state.schedule.nowDate
    },
    weeklyCalendar() {
      return this.$store.getters.weeklyCalendar
    },
    timeCalendar() {
      return this.$store.getters.timeSchedule
    }
  }
};
</script>
