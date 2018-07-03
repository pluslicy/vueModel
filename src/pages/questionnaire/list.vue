<template>
	<div class="qn">
		<el-row class='topBtns'>
			<el-col :span='12'>
				<el-input style='width:220px' size='small'></el-input>
			</el-col>
			<el-col :span='12' class='content-right'>
				<el-button @click='toAddQn' size="small">添加</el-button>
				<el-button @click="toBatchDelete" size="small">批量删除</el-button>
			</el-col>
		</el-row>
		<!-- 顶部按钮结束 -->
		<!-- 问卷列表 -->
		<el-row>
			<el-col :span='24'>
				<el-table
					v-loading='qnTblLoading'
					size='mini'
					border
			    ref="multipleTable"
			    :data="getQnList"
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
			    <el-table-column align='center' type="selection" width="55"></el-table-column>
			    <el-table-column prop="name" label="名称"></el-table-column>
			    <el-table-column prop="description" label="简介"></el-table-column>
			    <el-table-column width='120' align='center' label="操作">
			      <template slot-scope='scope'>
			      	<el-button size="small" type='text' @click='toEditQn(scope.row)'>修改</el-button>
			      	<el-button size="small" type='text' @click='toDeleteQn(scope.row)'>删除</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
			</el-col>
		</el-row>
		<!-- 问卷列表结束 -->
		<!-- 添加问卷的模态框 -->
		<el-dialog
		  :title="qnDialog.title"
		  :visible.sync="qnDialog.visible"
		  fullscreen>
			<el-form 
				ref='qnDialogForm'
				:rules='qnDialog.rules'
				:model='qnDialog.form' 
				label-position='left'
				label-width='100px'>
				<!--  {{qnDialog.form}} <br>
				{{questionList}}  -->
				<el-form-item label='问卷标题' prop='name'>
					<el-input size="small" v-model='qnDialog.form.name'></el-input>
				</el-form-item>	
				<el-form-item label='问卷描述' prop='description'>
					<el-input size="small" type="textarea" v-model='qnDialog.form.description'></el-input>
				</el-form-item>	
				<el-form-item label='问卷题目' >
					<el-button size="small" @click="toSetQuestion">点击设置问卷题目</el-button>
				</el-form-item>	
			</el-form>
			<!-- 问题列表 -->
			<div class="qn_question_list">
				<div class="qn_question" v-for='(question,index) in questionList'>
					<!-- 标题 -->
					<div class="question_title">
						<span>{{index+1}}、</span>
						<span>{{question.title}}</span>
					</div>
					<!-- 选项 -->
					<div class="question_content">
						<ul>
							<li v-for='option in question.options'>
								<span>{{option.label}}.</span>
								<span>{{option.content}}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- 内嵌的模态框，设置问卷题目 -->
			<el-dialog
	      width="600px"
	      :title="questionDialog.title"
	      :visible.sync="questionDialog.visible"
	      @click='closeQnDialog'
	      append-to-body>

	      <div class="question_list">
	      	<div class="question_list_left">
	      		<el-input size="small" v-model='keywords' @keyup.enter='searchQuestion'></el-input>
	      		<!-- ---{{questionList}} -->
      			<el-checkbox-group v-model="questionList">
					  	<el-checkbox :key='q.id' :label="q" v-for='q in getQuestionList'>{{q.title}}</el-checkbox>
					  </el-checkbox-group>
	      	</div>
	      	<div class="question_list_right">
	      		<div>已选定的题目：</div>
	      		<el-checkbox-group v-model="questionList">
					  	<el-checkbox :key='q.id' :label="q" v-for='q in questionList'>{{q.title}}</el-checkbox>
					  </el-checkbox-group>
	      	</div>
	      </div>

	      <span slot="footer" class="dialog-footer">
			    <el-button size="small" @click="questionDialog.visible = false">取 消</el-button>
			    <el-button size="small" type="primary" @click="questionDialog.visible = false">确 定</el-button>
			  </span>
	    </el-dialog>
			<!-- 内嵌的模态框结束，设置问卷题目 -->
		  <span slot="footer" class="dialog-footer">
		    <el-button size="small" @click="closeQnDialog">取 消</el-button>
		    <el-button size="small" type="primary" @click="submitQnForm">确 定</el-button>
		  </span>
		</el-dialog>

	</div>
</template>
<script>
	import {mapActions,mapGetters} from 'vuex';
	export default {
		data(){
			return {
				qnTblLoading:false,
				selectedQns:[],
				keywords:'',
				questionList:[],
				qnDialog:{
					title:'',
					visible:false,
					rules:{
						name:[{required:true,message:'请输入问卷信息',trigger:'blur'}],
						description:[{required:true,message:'请输入问卷描述信息',trigger:'blur'}]
					},
					form:{}
				},
				questionDialog:{
					title:'',
					visible:false,
					qustionList:[]
				}
			}
		},
		created(){
			this.loadQnList();
		},
		computed:{
			...mapGetters(['getQnList','getQuestionList'])
		},
		methods:{
			...mapActions(['findQnList','findAllQuestion','queryQuestion','saveOrUpdateQn']),
			toSetQuestion(){
				this.questionDialog.title = '设置问卷题目';
				this.loadQuestionList();
				this.questionDialog.visible = true
			},
			//--------
			// 提交问卷表单
			submitQnForm(){
				this.$refs['qnDialogForm'].validate((valid)=>{
					if(valid){
						let qn = _.clone(this.qnDialog.form);
						let questions = this.questionList.map((item)=>{
							return {
								id:item.id
							}
						});
						qn.questionVMs = questions;
						// 保存或更新
						this.saveOrUpdateQn(qn).then((result)=>{
							this.$notify({type:'success',message:result.message})
							this.closeQnDialog();
							this.loadQnList();
						}).catch((error)=>{
							this.$notify({type:'error',message:error.message})
						});
					}
				})
			},
			// 过滤问题
			searchQuestion(){
				alert(this.keywords);
				this.queryQuestion(this.keywords);
			},
			//加载所有问题
			loadQuestionList(){
				this.findAllQuestion();
			},
			// 加载所有的问卷信息
			loadQnList(){
				this.qnTblLoading = true;
				this.findQnList().catch((error)=>{
					this.$notify({type:'warning',message:error.message});
				}).finally(()=>{
					this.qnTblLoading = false;
				});
			},
			handleSelectionChange(val) {
        this.selectedQns = val;
      },
      // 关闭问卷模态框
      closeQnDialog(){
      	// 0.重置校验状态
				this.$refs['qnDialogForm'].resetFields();
				// 1.重置表单
				this.resetQnForm();
				// 2.关闭模态框
      	this.qnDialog.visible = false;
      },
      resetQnForm(){
      	this.qnDialog.form.name = '';
      	this.qnDialog.form.description = '';
      	this.qnDialog.form.questionVMs = [];
      },
      // 打开问卷模态框
      openQnDialog(){
      	this.qnDialog.visible = true;
      },
			// 去添加问卷信息
			toAddQn(){
				this.qnDialog.title = '创建问卷';
				// 打开模态框
				this.openQnDialog();
			},
			// 去修改问卷
			toEditQn(qn){

			},
			// 去单个删除问卷
			toDeleteQn(qn){

			},
			// 去批量删除数据
			toBatchDelete(){

			}

		}
	}
</script>

<style scoped="scoped">
	.question_list{
		display: flex;
		border:1px solid #ccc;
	}
	.question_list > div {
		flex:1;
		height: 300px;
		overflow-y: scroll;
		padding: 1em;
	}
	.question_list > div.question_list_left {
		border-right: 1px solid #ccc;
	}

	.qn_question_list {

	}
	.qn_question_list .qn_question{

	}
	.qn_question_list .qn_question .question_title{
		font-weight: bold;
	}
	.qn_question_list .qn_question .question_content{
		padding-left: 2em;
	}


</style>








