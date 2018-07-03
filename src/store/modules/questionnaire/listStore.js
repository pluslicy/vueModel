import axios from '@/store/axios'

export default {
	state:{
		qnList:[]
	},
	getters:{
		getQnList:state=>state.qnList
	},
	mutations:{
		alterQnList:(state,qnList)=>{state.qnList = qnList}
	},
	actions:{
		// 保存或更新问卷信息
		saveOrUpdateQn:({commit},qn)=>{
			return new Promise((resolve,reject)=>{
				return axios.post('/qn/saveOrUpdate',qn).then(({data})=>{
					if(data.status == 200){
						resolve(data);
					}else {reject(data)}
				}).catch((error)=>{reject(error)});
			});
		},
		// 查询所有的问卷信息
		findQnList:({commit})=>{
			return new Promise((resolve,reject)=>{
				return axios.get('/qn/findAllQn').then(({data})=>{
					if(data.status == 200){
						commit('alterQnList',data.data)
						resolve(data);
					}else {reject(data)}
				}).catch((error)=>{reject(error)});
			});
		}
	}
}