import axios from '../../axios'

export default {
	//初始状态
	state:{
		teacherData:[]
	},
	//获取器
	getters:{
		teacherData:state=>state.teacherData
	},
	//突变
	mutations:{
		alterTeacherData(state,data){
			state.teacherData = data;
		}
	},
	//动作
	actions:{
		findTeacherData(context){
			return new Promise((resolve,reject)=>{
				var data=[{
		        	userName:'用户',
		        	realName:'111',
		        	mailbox:'www@briup.com',
		        	telphone:'13122334456',
		        	wechat:'lgrddddggg',
		        	belongSchool:'内蒙古',
		        	beginNums:'22',
		        	createdDate:'2017-09-10'
		        },{
		        	userName:'张三',
		        	realName:'李四',
		        	mailbox:'wwqqw@briup.com',
		        	telphone:'13122334456',
		        	wechat:'lgrddddggg',
		        	belongSchool:'内蒙古',
		        	beginNums:'32',
		        	createdDate:'2017-09-10'
		        },{
		        	userName:'用户111',
		        	realName:'沾上干',
		        	mailbox:'www@briup.com',
		        	telphone:'13122334456',
		        	wechat:'lgrddddggg',
		        	belongSchool:'内蒙古',
		        	beginNums:'42',
		        	createdDate:'2017-09-10'
		        }]
				context.commit('alterTeacherData',data);

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
