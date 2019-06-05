//vuex babel-polyfill
import 'babel-polyfill'
import Vue from 'vue';
import Vuex from 'vuex';
 
import schedule from './modules/schedule';
 
Vue.use(Vuex);
 
export default new Vuex.Store({
  modules: {
    schedule
  }
});