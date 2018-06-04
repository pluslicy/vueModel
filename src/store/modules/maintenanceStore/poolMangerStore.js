import axios from '../../axios'

export default {
	//初始状态
	state:{
		poolMangereData:[]
	},
	//获取器
	getters:{
		poolMangereData:state=>state.poolMangereData
	},
	//突变
	mutations:{
		alterPoolData(state,data){
			state.poolMangereData = data;
		}
	},
	//动作
	actions:{
		findPoolMangerData(context){
			return new Promise((resolve,reject)=>{
				var data=[{
			        	poolName:'阿里云资源地1',
			        	outerIp:'127.0.0.1',
			        	masterNum:'10',
			        	allSize:'1核2G',
			        	status:'正常',
			        	createdDate:'2017-09-10'
			        },{
			        	poolName:'阿里云资源地2',
			        	outerIp:'127.0.0.1',
			        	masterNum:'10',
			        	allSize:'1核2G',
			        	status:'正常',
			        	createdDate:'2017-09-10'
			        },{
			        	poolName:'阿里云资源地3',
			        	outerIp:'127.0.0.1',
			        	masterNum:'10',
			        	allSize:'1核2G',
			        	status:'正常',
			        	createdDate:'2017-09-10'
			        }];
				context.commit('alterPoolData',data);
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
