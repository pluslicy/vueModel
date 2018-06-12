import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

// 年级信息相关状态
import GradeStore from './modules/base/gradeStore'
// 校园信息相关状态
import SchoolStore from './modules/base/schoolStore'

export default new Vuex.Store({
	modules:{
		GradeStore,
		SchoolStore
	}
});