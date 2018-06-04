import axios from '../../axios'

export default {
	//初始状态
	state:{
		configureData:[],
		
	},
	//获取器
	getters:{
		configureData:state=>state.configureData,
		
	},
	//突变
	mutations:{
		alterConfigureData(state,data){
			state.configureData = data;
		},
		
	},
	//动作
	actions:{
		findConfigureData(context){
			return new Promise((resolve,reject)=>{
				var data=[{
			        	peizhiItem:'Logo'
			        	
			        },{
			        	peizhiItem:'邮箱设置'
			        	
			        }];
				context.commit('alterConfigureData',data);
			
				
			});
		},
		
		
		
	}
}
