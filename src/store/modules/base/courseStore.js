import axios from '@/store/axios'

export default {
	actions:{
		findAllCourses:()=>{
			return new Promise((resolve,reject)=>{
				return axios.get('/course/findAll').then(({data})=>{
					if(data.status == 200){
						resolve(data.data);
					} else {
						reject(data);
					}
				}).catch((error)=>{reject(error)});
			});
		}
	}
}