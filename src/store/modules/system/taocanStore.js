import axios from '../../axios'

export default {
	//初始状态
	state:{
		taocanData:[],
		
	},
	//获取器
	getters:{
		taocanData:state=>state.taocanData,
		
	},
	//突变
	mutations:{
		alterTaocanData(state,data){
			state.taocanData = data;
		},
		
	},
	//动作
	actions:{
		findTaocanData(context){
			return new Promise((resolve,reject)=>{
				var data=[{
		        	taocanName:'用户',
		        	type:'111',
		        	peizhi:'www@briup.com',
		        	status:'开启',
		        	createdDate:'2017-09-10'
		        },{
		        	taocanName:'用户',
		        	type:'222',
		        	peizhi:'www@briup.com',
		        	status:'开启',
		        	createdDate:'2017-09-10'
		        },{
		        	taocanName:'用户',
		        	type:'333',
		        	peizhi:'www@briup.com',
		        	status:'停用',
		        	createdDate:'2017-09-10'
		        }];
				context.commit('alterTaocanData',data);
			
				
			});
		},
		
		
		
	}
}
