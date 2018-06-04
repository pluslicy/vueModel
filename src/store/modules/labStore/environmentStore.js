import axios from '../../axios'

export default {
	//初始状态
	state:{
		envirData:[],
		
	},
	//获取器
	getters:{
		envirData:state=>state.envirData,
		
	},
	//突变
	mutations:{
		alterEnvirData(state,data){
			state.envirData = data;
		},
		
	},
	//动作
	actions:{
		//查找实验环境数据
		findEnvirData(context){
			return new Promise((resolve,reject)=>{
				var data=[{
			      		enviName:'大数据实践',
			      		template:'hadhoop',
			      		status:'running',
			      		belongLesson:'大数据实践',
			      		endTime:'2019-09-09',
			      		peizhi:'CPU:000',
			      		belongStudent:'李四',
			      		belongClazz:'三年一班',
			      		createdDate:'2018-09-07',
			      		beginDate:'2018-09-09',
			      		endDate:'2017-09-09'

			      	}];
				context.commit('alterEnvirData',data);
			
				
			});
		},
		
		
		
	}
}
