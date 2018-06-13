import axios from '@/store/axios'

export default {
	state:{
		questionList:[]
	},
	getters:{
		getQuestionList:state=>state.questionList
	},
	mutations:{
		alterQuestionList:(state,questionList)=>{
			state.questionList = questionList;
		}
	},
	actions:{
		// 查询所有问题
		findAllQuestion:(context)=>{
			return new Promise((resolve,reject)=>{
				return axios.get('/question/findAllVM').then(({data})=>{
					if(data.status == 200){
						context.commit('alterQuestionList',data.data);
						resolve(data.data);
					} else {
						reject(data);
					}
				}).catch((error)=>{reject(error)});
			});
		}
	}
}






