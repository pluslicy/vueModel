import Vue from 'vue'
import Router from 'vue-router'

import login from '@/pages/login' //登录页
import index from '@/pages/index' //首页

// 基础数据模块
import Base from '@/pages/base'
import BaseSchool from '@/pages/base/school'
import BaseGrade from '@/pages/base/grade'
import BaseClazz from '@/pages/base/clazz'
import BaseCourse from '@/pages/base/course'
import BaseTeacher from '@/pages/base/teacher'
// 问卷管理模块
import Questionnaire from '@/pages/questionnaire'
import QuestionnaireQuestion from '@/pages/questionnaire/question'
import QuestionnaireList from '@/pages/questionnaire/list'

// 课调管理模块
import Survey from '@/pages/survey'

import Statistics from '@/pages/statistics'

import System from '@/pages/system'

Vue.use(Router)

export default new Router({
  routes:[{
    path: '/',
    name: 'login',
    component: login
  },{
    path: '/app',
    name: 'index',
    component: index,
    children:[{
      // 基础数据模块
      path: 'base',
      name: 'Base',
      component: Base,
      children:[{
        path: 'school',
        name: 'BaseSchool',
        component: BaseSchool
      },{
        path: 'grade',
        name: 'BaseGrade',
        component: BaseGrade
      },{
        path: 'clazz',
        name: 'BaseClazz',
        component: BaseClazz
      },{
        path: 'course',
        name: 'BaseCourse',
        component: BaseCourse
      },{
        path: 'teacher',
        name: 'BaseTeacher',
        component: BaseTeacher
      }]
    },{
      // 问卷管理模块
      path: 'questionnaire',
      name: 'Questionnaire',
      component: Questionnaire,
      children:[{
        path:'question',
        name:'QuestionnaireQuestion',
        component:QuestionnaireQuestion
      },{
        path:'list',
        name:'QuestionnaireList',
        component:QuestionnaireList
      }]
    },{
      // 课调管理模块
      path: 'survey',
      name: 'Survey',
      component: Survey,
    },{
      path: 'statistics',
      name: 'Statistics',
      component: Statistics,
    },{
      path: 'system',
      name: 'System',
      component: System,
    }]
  }]
})
