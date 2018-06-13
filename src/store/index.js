import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

// 年级信息相关状态
import GradeStore from './modules/base/gradeStore'
// 校园信息相关状态
import SchoolStore from './modules/base/schoolStore'
import CourseStore from './modules/base/courseStore'

// 题库管理相关状态
import QuestionStore from './modules/questionnaire/questionStore'

export default new Vuex.Store({
	modules:{
		GradeStore,
		SchoolStore,
		QuestionStore,
		CourseStore
	}
});