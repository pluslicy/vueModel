import Vue from 'vue'
import Router from 'vue-router'

import login from '@/pages/login'  //登录页
import index from '@/pages/index'

//实验室管理
import Base from '@/pages/base'
import BaseSchool from '@/pages/base/school'

import Questionnaire from '@/pages/questionnaire'

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
      }]
    },{
      path: 'questionnaire',
      name: 'Questionnaire',
      component: Questionnaire,
    },{
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
