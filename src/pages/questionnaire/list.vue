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
			      	<el-button type='text' @click='toEditQn(scope.row)'>修改</el-button>
			      	<el-button type='text' @click='toDeleteQn(scope.row)'>删除</el-button>
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
				ref='gradeDialogForm'
				:rules='qnDialog.rules'
				:model='qnDialog.form' 
				label-position='right'
				label-width='100px'>
				
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

			<!-- 内嵌的模态框，设置问卷题目 -->
			<el-dialog
	      width="600px"
	      :title="questionDialog.title"
	      :visible.sync="questionDialog.visible"
	      append-to-body>

	      <div class="question_list">
	      	<div class="question_list_left">

	      		<el-input size="small"></el-input>
	      		<ul>
	      			<el-checkbox-group v-model="questionList">
						  <li><el-checkbox label="复选框 A"></el-checkbox></li>
						  <li><el-checkbox label="复选框 B"></el-checkbox></li>
						  <li><el-checkbox label="复选框 C"></el-checkbox></li>
						  </el-checkbox-group>
	      		</ul>
	      	</div>
	      	<div class="question_list_right">
	      		<div>已选定的题目：</div>
	      	</div>
	      </div>

	      <span slot="footer" class="dialog-footer">
			    <el-button size="small" @click="questionDialog.visible = false">取 消</el-button>
			    <el-button size="small" type="primary" @click="questionDialog.visible = false">确 定</el-button>
			  </span>
	    </el-dialog>
			<!-- 内嵌的模态框结束，设置问卷题目 -->

		  <span slot="footer" class="dialog-footer">
		    <el-button size="small" @click="qnDialog.visible = false">取 消</el-button>
		    <el-button size="small" type="primary" @click="qnDialog.visible = false">确 定</el-button>
		  </span>
		</el-dialog>

	</div>
</template>
<script>
	export default {
		data(){
			return {
				qnTblLoading:false,
				selectedQns:[],
				questionList:[],
				qnDialog:{
					title:'',
					visible:false,
					rules:{},
					form:{}
				},
				questionDialog:{
					title:'',
					visible:false
				}
			}
		},
		computed:{
			getQnList:()=>[]
		},
		methods:{

			toSetQuestion(){
				this.questionDialog.title = '设置问卷题目';
				this.questionDialog.visible = true
			},

			//--------



			handleSelectionChange(val) {
        this.selectedQns = val;
      },
      // 关闭问卷模态框
      closeQnDialog(){
      	this.qnDialog.visible = false;
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

</style>








