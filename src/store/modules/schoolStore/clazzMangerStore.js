import axios from '../../axios'

export default {
	//初始状态
	state:{
		clazzData:[]
	},
	//获取器
	getters:{
		clazzData:state=>state.clazzData
	},
	//突变
	mutations:{
		alterClazzMangerData(state,data){
			state.clazzData = data;
		}
	},
	//动作
	actions:{
		findAllCLazzData(context){
			return new Promise((resolve,reject)=>{
				var data=[{
			        	clazzName:'三年一班',
			        	belongSchool:'中北信商',
			        	teacherNum:'43',
			        	studentsNum:'20',
			        	createdDate:'2017-09-10'
			        },{
			        	clazzName:'三年2班',
			        	belongSchool:'山西大学',
			        	teacherNum:'43',
			        	studentsNum:'20',
			        	createdDate:'2017-09-10'
			        },{
			        	clazzName:'三年3班',
			        	belongSchool:'内蒙古科技',
			        	teacherNum:'43',
			        	studentsNum:'20',
			        	createdDate:'2017-09-10'
			        }];
				context.commit('alterClazzMangerData',data);

				/*
				axios.get('/manager/queryAllTeachers.action').then(({data})=>{
					context.commit('alterTeachersData',data);
					resolve();
				}).catch((error)=>{
					reject(error);
				});
				*/
			});
		}
	}
}
