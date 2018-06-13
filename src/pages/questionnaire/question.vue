<!-- 题库管理 -->
<template>
	<div class="question">
		<!-- 按钮区 -->
		<el-row>
			<el-col :span="12">
				<el-input v-model='keywords' size="small" style='width:180px'></el-input>
				<el-button size="small" @click="handlerQueryQuestion">搜索</el-button>
			</el-col>
			<el-col :span="12" class="content-right">
				<el-button size="small" @click="toAddQuestion">添加</el-button>
				<el-button size="small">批量删除</el-button>
			</el-col>
		</el-row>
		<!-- 按钮区结束 -->
		<!-- {{getQuestionList}} -->
		<!-- {{questionList}} -->
		<!-- 问题列表 -->
		<div class="question_list" :style='questionListStyle' v-loading='questionListLoading'>
			<!-- 问题 -->
			<div class="question" :key='question.id' v-for='(question,index) in getQuestionList'>
				<!-- 问题标题 -->
				<div class="question_title">
					<el-checkbox v-model='questionList' :label='question.id'>
						<span class="bold">序号{{index+1}}：{{question.title}}</span>
					</el-checkbox>
				</div>
				<!-- 问题标题结束 -->
				<!-- 选项列表 -->
				<ul class="option_list">
					<li v-for='option in question.options' :key='option.id'>
						<span>{{option.label}}：</span>
						<span>{{option.content}}</span>
					</li>
				</ul>
				<!-- 选项列表结束 -->
				<!-- 修改和删除按钮 -->
				<div class="editAndDelete">
					<i class="fa fa-pencil-square-o"></i>
					<i class="fa fa-trash-o"></i>
				</div>
			</div>
			<!-- 问题结束 -->
		</div>
		<!-- 问题列表结束 -->
		<!-- 添加、修改问题的模态框 -->
		<el-dialog 
			:title="questionDialog.title" 
			width='800px'
			:visible.sync="questionDialog.visible">
			
			表单：{{questionDialog.form}} <br>
			<!-- {{questionType}}	 <br> -->
			选项：{{questionDialog.options}}
		  
		  <el-form :model="questionDialog.form" 
				label-position='right'
		  	label-width='100px'>
		  	<el-row>
		  		<el-col :span='24'>
		  			<el-form-item label="题目名称" >
				      <el-input v-model="questionDialog.form.name" auto-complete="off"></el-input>
				    </el-form-item>
		  		</el-col>
		  	</el-row>
		  	<el-row>
		  		<el-col :span='12'>
		  			<el-form-item label="题目类型" >
				    	<el-select style="width:100%"  value-key='id' v-model='questionDialog.form.questionType'>
				    		<el-option 
				    			:key='type.id'
				    			:label='type.questionTypeLabel' 
				    			:value='type' 
				    			v-for='type in questionType'>
				    		</el-option>
				    	</el-select>  
				    </el-form-item>
		  		</el-col>
		  		<el-col :span='12'>
		  			<el-form-item label="所属课程" >
				      <el-select style="width:100%" value-key='id' v-model='questionDialog.form.course_id'>
				    		<el-option 
				    			:key='course.id'
				    			:label='course.name' 
				    			:value='course.id' 
				    			v-for='course in questionCourses'>
				    		</el-option>
				    	</el-select> 
				    </el-form-item>
		  		</el-col>
		  	</el-row>
		     
		    <el-form-item label="题目选项" >
		      <el-table 
						:data='questionDialog.options'
		      	size="mini" border>
		      	<el-table-column label="序号" width='60' align='center'>
		      		<template slot-scope='scope'>
		      			{{scope.$index+1}}
		      		</template>
		      	</el-table-column>
		      	<el-table-column label="label" width='60' align='center'>
		      		<template slot-scope='scope'>
		      			{{scope.row.label}}
		      		</template>
		      	</el-table-column>
		      	<el-table-column label="选项">
		      		<template slot-scope='scope'>
		      			<el-input size='small' v-model='scope.row.content'></el-input>
		      		</template>
		      	</el-table-column>
		      	<el-table-column label="分值" width='80'>
		      		<template slot-scope='scope'>
		      			<el-input size='small' v-model='scope.row.score'></el-input>
		      		</template>
		      	</el-table-column>
		      	<el-table-column label="操作" width='60' align='center'>
		      		<template slot-scope='scope'>
		      			<el-button type='text' @click='removeOption(scope.row)'>删除</el-button>
		      		</template>
		      	</el-table-column>
		      </el-table>
		    </el-form-item>
		  </el-form>

		  <div class="content-right">
		  	<el-button type="text" @click="addOption">添加选项</el-button>
		  </div>

		  <div slot="footer" class="dialog-footer">
		    <el-button size="small" @click="questionDialog.visible = false">取 消</el-button>
		    <el-button size="small" type="primary" @click="questionDialog.visible = false">确 定</el-button>
		  </div>
		</el-dialog>

	</div>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
	export default {
		data(){
			return {
				questionListLoading:false,
				questionListHeght:400,
				questionList:[],
				questionType:[],
				questionCourses:[],
				keywords:'',
				// 模态框相关的数据
				questionDialog:{
					title:'',
					form:{},
					visible:false,
					options:[]
				}
			}
		},
		watch:{
			'questionDialog.options':{
				handler:function(now,old){
					//遍历所有选项，重新整理label的值
					console.log(Array.isArray(now));
					for(var index in now){
						let option = now[index];
						let label ='A';
						switch(+index){
							case 0:
								label = 'A';
								break;
							case 1:
								label = 'B';
								break;
							case 2:
								label = 'C';
								break;
							case 3:
								label = 'D';
								break;
							case 4:
								label = 'E';
								break;
						}
						option.label = label;
						console.log(index,label);
					}
				}
			}
		},
		computed:{
			...mapGetters(['getQuestionList']),
			//动态计算出问题列表的高度
			questionListStyle(){
				return {
					'height':this.questionListHeght+'px',
					'overflow-y':'auto'
				}
			}
		},
		created(){
			this.questionListHeght = $(window).height()-200;
			this.loadQuestionList();
			// 加载所有的题目类型数据
			this.findAllQuestionType().then((result)=>{
				this.questionType = result;
			})
			//加载所有的课程数据
			this.findAllCourses().then((result)=>{
				this.questionCourses = result;
			})
		},
		methods:{
			...mapActions([
				'findAllQuestion',
				'findAllQuestionType',
				'findAllCourses',
				'queryQuestion'
			]),
			removeOption(option){
				_.remove(this.questionDialog.options,(item)=>{
					return item === option;
				})
				this.questionDialog.options.push({});
				this.questionDialog.options.pop();
				//console.log(JSON.stringify(this.questionDialog.options));
			},
			//添加选项操作
			addOption(){
				let option = {
					label:'',
					content:'',
					score:0
				}
				
				this.questionDialog.options.push(option);
			},
			// 执行查询操作
			handlerQueryQuestion(){
				this.questionListLoading = true;
				this.queryQuestion(this.keywords).finally(()=>{
					this.questionListLoading = false;
				});
			},
			//打开添加题目的模态框
			toAddQuestion(){
				this.questionDialog.title = '添加题目';
				this.questionDialog.visible = true;

			},
			//加载题目数据
			loadQuestionList(){
				this.questionListLoading = true;
				this.findAllQuestion().catch((error)=>{
					this.$notify({type:"warning",message:"数据加载异常"+error.message})
				}).finally(()=>{
					this.questionListLoading = false;
				});
			}
		}
	}
</script>
<style scoped="scoped">
	.question {
		position: relative;
		border-bottom: 1px solid #ededed;
	}
	.question > .question_title {
		height: 3em;
		line-height: 3em;
	}
	.question > .question_title .bold{
		font-weight: 900 !important;
	}
	.question > .editAndDelete{
		position: absolute;
		right: 1em;
		bottom: .5em;
	}
	.question > .option_list {
		padding: 0 2em;
	}
	.question > .option_list > li {
		height: 30px;
		line-height: 30px;
	}
</style>











