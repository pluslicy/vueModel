import axios from '@/store/axios.js'

export default {
	actions:{
		saveOrUpdateSchool:(context,school)=>{
			return new Promise((resolve,reject)=>{
				axios.post('/school/saveOrUpdate',school).then(({data})=>{
					if(data.status == 200){
						resolve(data);
					} else {reject(data)}
				}).catch((error)=>{reject(error); });
			});
		},
		findSchool:(context,id=1)=>{
			return new Promise((resolve,reject)=>{
				axios.get('/school/findById',{params:{id}}).then(({data})=>{
					if(data.status == 200){
						resolve(data);
					} else {
						reject(data);
					}
				}).catch((error)=>{reject(error)});
			});
		}
	}
}



