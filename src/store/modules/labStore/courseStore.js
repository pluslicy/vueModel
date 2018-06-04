import axios from '../../axios'

export default {
	//初始状态
	state:{
		courses:[],
		templates:[],
		students:[],
		configures:[],
		stactics:[],
		clazzes:[],
		gridData:[],
	},
	//获取器
	getters:{
		courses:state=>state.courses,
		templates:state=>state.templates,
		students:state=>state.students,
		configures:state=>state.configures,
		stactics:state=>state.stactics,
		clazzes:state=>state.clazzes,
		gridData:state=>state.gridData,
	},
	//突变
	mutations:{
		alterCoursesData(state,data){
			state.courses = data;
		},
		alterTemplateData(state,data){
			state.templates = data;
		},
		alterStudentData(state,data){
			state.students = data;

		},
		alterConfigureData(state,data){
			state.configures = data;
		},
		alterStacticData(state,data){
			state.stactics = data;
		},
		alterClazzData(state,data){
			state.clazzes = data;
		},
		alterGridData(state,data){
			state.gridData = data;
		},
	},
	//动作
	actions:{
		//查找课程实验详情
		findGridData(context){
			return new Promise((resolve,reject)=>{
				var data=[{
		      		enviName:'大数据实践',
		      		template:'hadoop',
		      		status:'running',
		      		peizhi:'CPU:000',
		      		createdDate:'2017-09-10',
		      		belongStudent:'张三',
		      		belongClazz:'三年五班'
		      	},{
		      		enviName:'大数据实践222',
		      		template:'hadoop',
		      		status:'running',
		      		peizhi:'CPU:000',
		      		createdDate:'2017-09-10',
		      		belongStudent:'张三',
		      		belongClazz:'三年五班'
		      	}];
				context.commit('alterGridData',data);
			
				
			});
		},
		//查找所有班级
		findAllClazz(context){
			return new Promise((resolve,reject)=>{
				var data=[{
		        	clazzId:"201",
		        	clazzName:'三年一班'
		        },{
		        	clazzId:"202",
		        	clazzName:'三年二班'
		        }];
				context.commit('alterClazzData',data);
			
				
			});
		},
		//查找所有回收策略
		findAllStactic(context){
			return new Promise((resolve,reject)=>{
				var data=[{
		        	stacticId:"11",
		        	stacticName:'课程结束删除课程的实验环境'
		        },{
		        	stacticId:"22",
		        	stacticName:'课程结束停止课程的实验环境'
		        }];
				context.commit('alterStacticData',data);
			
				
			});
		},
		//查找所有资源配置
		findAllConfigure(context){
			return new Promise((resolve,reject)=>{
				var data=[{
		        	configureId:"1",
		        	configureName:'CPU4核 内存2G'
		        },{
		        	configureId:"2",
		        	configureName:'CPU2核 内存4G'
		        }];
				context.commit('alterConfigureData',data);
			
				
			});
		},
		//查找所有学生
		findAllStudents(context){
			return new Promise((resolve,reject)=>{

				var data=[{
		        	studentId:"101",
		        	studentName:'张三111'
		        },{
		        	studentId:"102",
		        	studentName:'李四'
		        },{
		        	studentId:"103",
		        	studentName:'王五'
		        }];
				context.commit('alterStudentData',data);
			
				
			});
		},
		//查找所有实验模板
		findAllTemplates(context){
			return new Promise((resolve,reject)=>{

				var data=[{
		        	templateId:1001,
		        	templateName:'hadoop'
		        },{
		        	templateId:1002,
		        	templateName:'spark'
		        },{
		        	templateId:1003,
		        	templateName:'大数据'
		        }];
				context.commit('alterTemplateData',data);
			
				
			});
		},
		//查找所有实验课程
		findAllCourses(context){
			return new Promise((resolve,reject)=>{

				var data=[{
		        	lessonName:'语文',
		        	template:'hadoop',
		        	status:'进行中',
		        	studentsNum:'20',
		        	beginDate:"2018-09-08",
		        	endDate:'2019-09-09',
		        	belongTeacher:'张三',
		        	createdDate:'2017-09-10'
		        },{
		        	lessonName:'数学',
		        	template:'html',
		        	status:'进行中',
		        	studentsNum:'34',
		        	beginDate:"2018-09-08",
		        	endDate:'2019-09-09',
		        	belongTeacher:'张三',
		        	createdDate:'2017-09-10'
		        },{
		        	lessonName:'js',
		        	template:'hadoop',
		        	status:'进行中',
		        	studentsNum:'20',
		        	beginDate:"2018-09-08",
		        	endDate:'2019-09-09',
		        	belongTeacher:'李四',
		        	createdDate:'2017-09-10'
		        }];
				context.commit('alterCoursesData',data);
				/*axios.get('/manager/queryAllTeachers.action').then(({data})=>{
					context.commit('alterTeachersData',data);
					resolve();
				}).catch((error)=>{
					reject(error);
				});*/
				
			});
		}
	}
}
