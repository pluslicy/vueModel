import axios from '../../axios'

export default {
	//初始状态
	state:{
		masterData:[]
	},
	//获取器
	getters:{
		masterData:state=>state.masterData
	},
	//突变
	mutations:{
		alterMasterData(state,data){
			state.masterData = data;
		}
	},
	//动作
	actions:{
		findMasterData(context){
			return new Promise((resolve,reject)=>{
				var data=[{
			      		masterName:'主机01',
			      		type:'node',
			      		belongAddress:'腾讯云资源地',
			      		innerIP:'127.0.0.1',
			      		peizhi:'1核2G',
			      		status:'正常',
			      		createdDate:'2018-09-07'

			      	}];
				context.commit('alterMasterData',data);
				/*
				axios.get('/manager/queryAllTeachers.action').then(({data})=>{
					context.commit('alterPoolData',data);
					resolve();
				}).catch((error)=>{
					reject(error);
				});
				*/
			});
		}
	}
}
