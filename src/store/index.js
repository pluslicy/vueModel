import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

//云实验室模块
import CourseStore from './modules/labStore/courseStore'

export default new Vuex.Store({
	modules:{
		CourseStore
	}
});