import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

//年级相关状态
import GradeStore from './modules/base/gradeStore'

export default new Vuex.Store({
	modules:{
		GradeStore
	}
});