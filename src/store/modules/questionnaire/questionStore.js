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
		//通过ID删除问题
		deleteQuestionById(context,id){
			return new Promise((resolve,reject)=>{
				return axios.get('/question/deleteById',{params:{id}}).then(({data})=>{
					if(data.status == 200){
						resolve(data);
					} else {
						reject(data);
					}
				}).catch((error)=>{reject(error)});
			});
		},
		//批量删除问题
		batchDeleteQuestions(context,ids){
			return new Promise((resolve,reject)=>{
				return axios.post('/question/batchDelete',{ids}).then(({data})=>{
					if(data.status == 200){
						resolve(data);
					} else {
						reject(data);
					}
				}).catch((error)=>{reject(error)});
			});
		},
		//保存或者更新问题
		saveOrUpdateQuestion(context,question){
			return new Promise((resolve,reject)=>{
				return axios.post('/question/saveOrUpdate',question).then(({data})=>{
					if(data.status == 200){
						resolve(data);
					} else {
						reject(data);
					}
				}).catch((error)=>{reject(error)});
			});
		},
		// 查询所有题目类型
		findAllQuestionType:(context)=>{
			return new Promise((resolve,reject)=>{
				return axios.get('/question/findAllQuestionType').then(({data})=>{
					if(data.status == 200){
						resolve(data.data);
					} else {
						reject(data);
					}
				}).catch((error)=>{reject(error)});
			});
		},
		// 模糊查询问题
		queryQuestion:(context,keywords)=>{
			return new Promise((resolve,reject)=>{
				return axios.get('/question/queryVM',{params:{keywords}}).then(({data})=>{
					if(data.status == 200){
						context.commit('alterQuestionList',data.data);
						resolve(data.data);
					} else {
						reject(data);
					}
				}).catch((error)=>{reject(error)});
			});
		},
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






