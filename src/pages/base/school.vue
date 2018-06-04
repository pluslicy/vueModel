<template>
	<div class="labCourse">
		<!-- 按钮行开始 -->
		<div class="topBtns row">
			<div class="col-sm-9">
				<el-select v-model="value" placeholder="请选择" clearable size="small">
				    <el-option label="张三" value="zs"> </el-option>
				    <el-option label="李四" value="lisi"> </el-option>
				  </el-select>
			</div>
			<div class="col-sm-3 text-right">
				<el-button type="primary" plain size="small" >批量删除</el-button>
				<el-button type="primary" plain size="small" @click="createCourse">新建课程</el-button>
				
			</div>
		</div>
		<!-- 按钮行结束 -->
		<!-- 表格区开始 -->
		<el-table ref="multipleTable" :height="tblHeight" :data="courses" size="mini" border tooltip-effect="dark" style="width: 100%;text-align:center;"  @selection-change="handleSelectionChange">
	    <el-table-column type="selection" > </el-table-column>
	    <el-table-column label="课程名称"  prop='lessonName'> </el-table-column>
	    <el-table-column prop="template" label="实验模板"> </el-table-column>
	    <el-table-column prop="status" label="状态" show-overflow-tooltip> </el-table-column>
	    <el-table-column prop="studentsNum" label="学生数量" show-overflow-tooltip> </el-table-column>
	    <el-table-column prop="beginDate" label="开始时间" show-overflow-tooltip></el-table-column>
	    <el-table-column prop="endDate" label="结束时间" show-overflow-tooltip> </el-table-column>
	    <el-table-column prop="belongTeacher" label="所属教师" show-overflow-tooltip></el-table-column>
	    <el-table-column prop="createdDate" label="创建于" show-overflow-tooltip></el-table-column>
	    <el-table-column label="操作" show-overflow-tooltip width="150px">
	      <template slot-scope="scope">
	      	<i class="fa fa-th-list" title="详情" @click="getDetails(scope.$index, scope.row)"></i> &nbsp;&nbsp;
	      	<i class="fa fa-podcast" title="获取环境" @click="getEnvironment"></i>&nbsp;&nbsp;
	      	<i class="fa fa-times" title="删除"></i>&nbsp;&nbsp;
	      	<i class="fa fa-power-off" title="结束课程"></i>&nbsp;&nbsp;
	      	<i class="fa fa-plus-circle" title="延长课时"></i>
	      </template>
	    </el-table-column>
	  </el-table>
	  <!-- 表格区结束 -->
	  <!-- 分页开始 -->
	  <div class="pageLine">
	  	<el-pagination
	  		background
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page.sync="current.page"
	      :page-size="100"
	      layout="prev, pager, next, jumper"
	      :total="1000">
    </el-pagination>
	  </div>
		
    <!-- 分页结束 -->

	  <!-- 新建模态框 -->
	  <el-dialog  title="新建课程" :visible.sync="addCourseDialog.visiable">
	  		<!-- <div class="col-sm-3" style="border:1px solid red">111</div>
	  		<div class="col-sm-9" >222</div> -->
		  <el-form :model="addCourseDialog.form" size="small" >
		  	<div class="row">
		  		<div class="col-sm-12">
		  			 <el-form-item label="课程名称"  :label-width="formLabelWidth">
					      <el-input v-model="addCourseDialog.form.lessonName" auto-complete="off"></el-input>
					    </el-form-item>
		  		</div>
		  	</div>
		   <div class="row">
		   	<div class="col-sm-6">
		   		<el-form-item label="实验模板" :label-width="formLabelWidth">
			      <el-select v-model="addCourseDialog.form.templateId" placeholder="请选择模板" style="width:100%">
			        <el-option :label="t.templateName" :value="t.templateId" :key="t.templateId" v-for="t in addCourseDialog.allTemplates"></el-option>
			      </el-select>
			    </el-form-item>
		   	</div>
		   	<div class="col-sm-6">
		   		<el-form-item label="班级名称" :label-width="formLabelWidth">
			      <el-select v-model="addCourseDialog.form.clazzId" placeholder="请选择班级" style="width:100%">
			        <el-option :label="cla.clazzName" :value="cla.clazzId" :key="cla.clazzId" v-for='cla in clazzes'></el-option>
			      </el-select>
			    </el-form-item>
		   	</div>
		   </div>
		   	<!-- 建议使用点选 -->
		   	<el-form-item label="学生姓名" :label-width="formLabelWidth" style="margin-bottom:.5em">
		     <el-input v-model="addCourseDialog.form.studentsId" auto-complete="off" @focus="choseStudent"></el-input>
	    	</el-form-item> 
		  	<div class="row">
		  		<div class="col-sm-6">
		  			<el-form-item label="开始时间" :label-width="formLabelWidth">
				      <el-input v-model="addCourseDialog.form.beginDate" auto-complete="off"></el-input>
				    </el-form-item>
		  		</div>
		  		<div class="col-sm-6">
		  			<el-form-item label="结束时间" :label-width="formLabelWidth">
				      <el-input v-model="addCourseDialog.form.endDate" auto-complete="off"></el-input>
				    </el-form-item>
		  		</div>
		  	</div>
		  	<div class="row">
		  		<div class="col-sm-6">
		  			<el-form-item label="资源配置" :label-width="formLabelWidth" >
				      <el-select v-model="addCourseDialog.form.configureId" placeholder="请选择资源配置" style="width:100%">
				        <el-option :label="c.configureName" :value="c.configureId" :key='c.configureName' v-for='c in configures'></el-option>
				      </el-select>
				    </el-form-item>
		  		</div>
		  		<div class="col-sm-6">
		  			<el-form-item label="回收策略" :label-width="formLabelWidth">
				      <el-select v-model="addCourseDialog.form.stacticId" placeholder="请选择回收策略" style="width:100%">
				        <el-option :label="s.stacticName" :value="s.stacticId" :key='s.stacticId' v-for='s in stactics'></el-option>
				      </el-select>
				    </el-form-item>
		  		</div>
		  	</div>
		    
		   
		  </el-form>
		  <!-- 内嵌模态框展示所有学生信息 -->
		   <el-dialog width="35%" title="请选择学生" :visible.sync="addCourseDialog.innerDialogVisible" append-to-body>
		   		 <el-transfer v-model="addCourseDialog.form.studentsId" :data="allStudents" :titles='titles'></el-transfer>
		   		 <div slot="footer" class="dialog-footer">
		    		<el-button size="small" @click="getAllChoseStudents">确定</el-button>
		   		 </div>
		   </el-dialog>
		  <!-- 内嵌模态框结束 -->

		  <div slot="footer" class="dialog-footer">
		    <el-button @click="addCourseDialog.visiable = false" size="small">取 消</el-button>
		    <el-button type="primary" @click="submitDate" size="small">确 定</el-button>
		  </div>
		</el-dialog>
	  <!-- 新建结束 -->
	  <!-- 详情模态框 -->
		<el-dialog title="课程详情" :visible.sync="lessonDetailsDialog.visiable">
			
			<h3 style="margin-bottom:10px">实验课程详情</h3>
			<div class="one">
				<span>&nbsp;&nbsp;课程名称&nbsp;:&nbsp;{{ lessonDetailsDialog.DetailForm.lessonName}}</span>
				<span>&nbsp;&nbsp;开始时间&nbsp;:&nbsp;{{lessonDetailsDialog.DetailForm.beginDate}}</span>
				<span>&nbsp;&nbsp;结束时间&nbsp;:&nbsp;{{ lessonDetailsDialog.DetailForm.endDate}}</span>
				<span>&nbsp;&nbsp;所属教师&nbsp;:&nbsp;{{ lessonDetailsDialog.DetailForm.belongTeacher}}</span>
			</div>
			<div class="two">
				<span>&nbsp;&nbsp;课程模板&nbsp;:&nbsp;{{lessonDetailsDialog.DetailForm.template}}</span>
				<span>&nbsp;&nbsp;状态&nbsp;:&nbsp;{{ lessonDetailsDialog.DetailForm.status}}</span>
				<span>&nbsp;&nbsp;创建于&nbsp;:&nbsp;{{ lessonDetailsDialog.DetailForm.createdDate}}</span>
				<span></span>
			</div>
			

		 <h3>课程实验环境详情</h3>
		 <el-table :data="gridData" style='text-align:center' size="mini">
		   <el-table-column property="enviName" label="实验环境名称"></el-table-column>
		   <el-table-column property="template" label="实验模板"></el-table-column>
		   <el-table-column property="status" label="状态"></el-table-column>
		   <el-table-column property="peizhi" label="配置"></el-table-column>
		   <el-table-column property="createdDate" label="创建时间"></el-table-column>
		   <el-table-column property="belongStudent" label="所属学生"></el-table-column>
		   <el-table-column property="belongClazz" label="所属校区班级"></el-table-column>
		 </el-table>
		</el-dialog>
	  <!-- 详情结束 -->
	  <!-- 获取环境模态框 -->
	  <el-dialog title="获取环境" :visible.sync="envirmentDialog.visiable">
		  <el-form :model="envirmentDialog.form">
		    <el-form-item label="课程名称" :label-width="formLabelWidth">
		      <el-input v-model="envirmentDialog.form.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="实验模板" :label-width="formLabelWidth">
		      <el-input v-model="envirmentDialog.form.region" auto-complete="off"></el-input>
		    </el-form-item>
		     <el-form-item label="到期时间" :label-width="formLabelWidth">
		      <el-input v-model="envirmentDialog.form.endTime" auto-complete="off"></el-input>
		    </el-form-item>
		   
		    <el-form-item label="资源配置" :label-width="formLabelWidth">
		      <el-input v-model="envirmentDialog.form.region" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="SSH账号" :label-width="formLabelWidth">
		      <el-input v-model="envirmentDialog.form.name" auto-complete="off"></el-input>
		    </el-form-item>
		     <el-form-item label="SSH密码" :label-width="formLabelWidth">
		      <el-input v-model="envirmentDialog.form.name" auto-complete="off"></el-input>
		    </el-form-item>
		    
		   
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button size="small" @click="envirmentDialog.visiable = false">取 消</el-button>
		    <el-button type="primary" size="small" @click="envirmentDialog.visiable = false" >确 定</el-button>
		  </div>
		</el-dialog>
	  <!-- 获取环境结束 -->
		  
	</div>
</template>
<script>
	import {mapGetters,mapActions,mapMutations} from 'vuex';
	export default {
		data(){
			return {
				value:"李四",
				current:{
					page:1
				},
				//模型
				addCourseDialog:{//添加课程模态框信息
					visiable:false,
					innerDialogVisible:false,
					allTemplates:[],//默认所有模板
					form:{
						
					}
				},
				lessonDetailsDialog:{
					visiable:false,//获取详情模态框状态默认关闭
					DetailForm:{},//获取详情模态框-》实验课程详情
				},
				envirmentDialog:{
					//获取环境模态框
					visiable:false,//获取环境模态框默认关闭
					form:{}
				},
				allStudents:[],
				formLabelWidth:'5em',
				titles:["未选择","已选择"],
			}
		},
		 //映射数据
		computed:{
			...mapGetters(['courses','templates','students','configures','stactics','clazzes','gridData'])
		},
		created(){
			// 通过视口高度减去其余组件高度求出表格高度
			this.tblHeight= $(window).height()-215;

			var self=this;
			//查找所有实验课程
			this.findAllCourses();
			//this.coursesData=this.courses;
			//查找所有实验模板，在新建模态框中显示
			this.findAllTemplates();
			this.addCourseDialog.allTemplates=this.templates;
			//查找所有学生，在新建模态框中显示
			this.findAllStudents();
			this.students.forEach(function(item){
				var obj={
					key:item.studentId,
					label:item.studentName
				}
				self.allStudents.push(obj);
			});

			//查找所有资源配置
			this.findAllConfigure();
			//查找所有回收策略
			this.findAllStactic();
			//查找所有班级
			this.findAllClazz();

		},
		methods:{
			//点击内嵌的模态框中确定按钮
			getAllChoseStudents(){
				this.addCourseDialog.innerDialogVisible=false;
			},
			//弹出内嵌学生选择模态框；
			choseStudent(){
				this.addCourseDialog.innerDialogVisible=true;
			},
			handleSizeChange(){},
			handleCurrentChange(){},
			//点击模态框确认按钮提交数据
			submitDate(){
				this.addCourseDialog.visiable=false
			},
			handleSelectionChange(){},
			//新建课程
			createCourse(){
				this.addCourseDialog.visiable=true;
			},
			//获取详情按钮
			getDetails(index,row){
				this.findGridData();//获取环境详情
				this.lessonDetailsDialog.visiable=true;
				this.lessonDetailsDialog.DetailForm.lessonName=row.lessonName;
				this.lessonDetailsDialog.DetailForm.beginDate=row.beginDate;
				this.lessonDetailsDialog.DetailForm.endDate=row.endDate;
				this.lessonDetailsDialog.DetailForm.belongTeacher=row.belongTeacher;
				this.lessonDetailsDialog.DetailForm.template=row.template;
				this.lessonDetailsDialog.DetailForm.status=row.status;
				this.lessonDetailsDialog.DetailForm.createdDate=row.createdDate;
				
			},
			//获取环境按钮
			getEnvironment(){
				this.envirmentDialog.visiable=true;
			},
			//映射Store中的方法
	    	...mapActions([
				'findAllCourses',
				'findAllTemplates',
				'findAllStudents',
				'findAllConfigure',//所有资源配置
				'findAllStactic',//所有回收策略
				'findAllClazz',//查找所有班级
				'findGridData'//查找课程环境详情
			
			])
		}
	}
</script>

<style>
	/* .topBtns {
		margin-bottom: 0.5em;
	}
	.pageLine {
		text-align: right;
	} */
	
	.newLesson{
		float: right;
		margin:0 10px 10px 0;
	}
	.myForm .item{
		float: left;
		/* width: 300px;
		text-align: right; */
	}

	.one,.two{
		height: 50px;
		display: flex;
		flex-direction: row;
	}

	.one span,.two span{
		width: 230px;
		height: 30px;
	}

	
</style>