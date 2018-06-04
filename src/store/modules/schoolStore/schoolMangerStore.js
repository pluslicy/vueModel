import axios from '../../axios'

export default {
	//初始状态
	state:{
		schoolData:[]
	},
	//获取器
	getters:{
		schoolData:state=>state.schoolData
	},
	//突变
	mutations:{
		alterSchoolMangerData(state,data){
			state.schoolData = data;
		}
	},
	//动作
	actions:{
		findAllSchoolData(context){
			return new Promise((resolve,reject)=>{
				var data=[{
		        	schoolName:'东南校区',
			        	clazzNum:'23',
			        	teacherNum:'43',
			        	studentsNum:'20',
			        	createdDate:'2017-09-10'
			        },{
			        	schoolName:'东北校区',
			        	clazzNum:'33',
			        	teacherNum:'43',
			        	studentsNum:'20',
			        	createdDate:'2017-09-10'
			        },{
			        	schoolName:'西北校区',
			        	clazzNum:'43',
			        	teacherNum:'43',
			        	studentsNum:'40',
			        	createdDate:'2017-09-10'
			        }];
				context.commit('alterSchoolMangerData',data);

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
