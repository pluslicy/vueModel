import axios from '../../axios'

export default {
	//初始状态
	studentData:{
		users:[]
	},
	//获取器
	getters:{
		studentData:state=>state.studentData
	},
	//突变
	mutations:{
		alterStudentData(state,data){
			state.studentData = data;
		}
	},
	//动作
	actions:{
		findStudentData(context){
			return new Promise((resolve,reject)=>{
				var data=[{
			        	userName:'用户',
			        	realName:'沾上干',
			        	mailbox:'www@briup.com',
			        	telphone:'13122334456',
			        	wechat:'lgrddddggg',
			        	belongSchool:'内蒙古',
			        	belongClazz:'三年一班',
			        	createdDate:'2017-09-10'
			        },{
			        	userName:'张三',
			        	realName:'李四',
			        	mailbox:'wwqqw@briup.com',
			        	telphone:'13122334456',
			        	wechat:'lgrddddggg',
			        	belongSchool:'内蒙古',
			        	belongClazz:'三年一班',
			        	createdDate:'2017-09-10'
			        },{
			        	userName:'用户111',
			        	realName:'沾上干',
			        	mailbox:'www@briup.com',
			        	telphone:'13122334456',
			        	wechat:'lgrddddggg',
			        	belongSchool:'内蒙古',
			        	belongClazz:'三年一班',
			        	createdDate:'2017-09-10'
			        }]
				context.commit('alterStudentData',data);

				/*
				axios.get('/manager/queryAllTeachers.action').then(({data})=>{
					context.commit('alterStudentData',data);
					resolve();
				}).catch((error)=>{
					reject(error);
				});
				*/
			});
		}
	}
}
