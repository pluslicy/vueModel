import axios from '../../axios'

export default {
	//初始状态
	state:{
		rootData:[]
	},
	//获取器
	getters:{
		rootData:state=>state.rootData
	},
	//突变
	mutations:{
		alterRootData(state,data){
			state.rootData = data;
		}
	},
	//动作
	actions:{
		findRootData(context){
			return new Promise((resolve,reject)=>{
				var data=[{
		        	userName:'用户',
		        	realName:'沾上干',
		        	mailbox:'www@briup.com',
		        	telphone:'13122334456',
		        	wechat:'lgrddddggg',
		        	createdDate:'2017-09-10'
		        },{
		        	userName:'张三',
		        	realName:'李四',
		        	mailbox:'wwqqw@briup.com',
		        	telphone:'13122334456',
		        	wechat:'lgrddddggg',
		        	createdDate:'2017-09-10'
		        },{
		        	userName:'用户111',
		        	realName:'沾上干',
		        	mailbox:'www@briup.com',
		        	telphone:'13122334456',
		        	wechat:'lgrddddggg',
		        	createdDate:'2017-09-10'
		        }]
				context.commit('alterRootData',data);

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
