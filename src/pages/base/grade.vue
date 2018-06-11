<template>
	<div class="grade">
		<el-row class='topBtns'>
			<el-col :span='12'>
				<el-input style='width:220px'></el-input>
			</el-col>
			<el-col :span='12' class='content-right'>
				<el-button @click='toAddGrade'>添加</el-button>
				<el-button>批量删除</el-button>
			</el-col>
		</el-row>

		<el-row>
			<el-col :span='24'>
				<el-table
					size='mini'
					border
			    ref="multipleTable"
			    :data="getGradeList"
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
			    <el-table-column
			    	align='center'
			      type="selection"
			      width="55">
			    </el-table-column>
			    <el-table-column
			    	prop="name"
			      label="名称">
			    </el-table-column>
			    <el-table-column
			      prop="description"
			      label="简介">
			    </el-table-column>
			    <el-table-column
			    	width='120'
			    	align='center'
			      label="操作">
			      <template slot-scope='scope'>
			      	<el-button type='text' @click='toEditGrade(scope.row)'>修改</el-button>
			      	<el-button type='text' @click='toDeleteGrade(scope.row)'>删除</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
			</el-col>
		</el-row>
		
		<!-- 添加年级、修改年级模态 -->
		<el-dialog
		  :title="gradeDialog.title"
		  :visible.sync="gradeDialog.visible"
		  :before-close="handleGradeDialogClose">
		  {{gradeDialog.form}}
			<el-form 
				ref='gradeDialogForm'
				:rules='gradeDialog.rules'
				:model='gradeDialog.form' 
				label-position='right'
				label-width='100px'>
				<el-form-item label='年级名称' prop='name'>
					<el-input v-model='gradeDialog.form.name'></el-input>
				</el-form-item>	
				<el-form-item label='年级简介' prop='description'>
					<el-input type='textarea' v-model='gradeDialog.form.description'></el-input>
				</el-form-item>	
			</el-form>


		  <span slot="footer" class="dialog-footer">
		    <el-button @click="gradeDialog.visible = false">取 消</el-button>
		    <el-button type="primary" @click="submitGradeForm">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				// 仅维护年级模态框中相关数据
				gradeDialog:{
					visible:false,		//可见性
					title:'', 				//标题
					form:{ 						//表单数据
						id:'',
						name:'',
						description:''
					},
					rules:{						//校验规则
						name:[{required:true,message:'请输入年级名称',trigger:'blur'}],
						description:[{required:true,message:'请输入年级简介',trigger:'blur'}]
					}
				}
			}
		},
		computed:{
			getGradeList(){
				return [{
					id:1001,
					name:'webui',
					description:'前端开发'
				},{
					id:1002,
					name:'javaee',
					description:'服务器端开发'
				}];
			}
		},
		methods:{
			// 去添加年级数据
			toAddGrade(){
				//1. 弹出模态框
				this.gradeDialog.title = '添加年级';
				this.gradeDialog.visible = true;
			
				//2. 初始化或者是重置模态框中的默认值
			},
			// 提交年级表单
			submitGradeForm(){
				
				//0. 数据校验
				this.$refs['gradeDialogForm'].validate((valid)=>{
					if(valid){
						//1. 向后台发送数据
						let grade = this.gradeDialog.form;
						console.log('submit',grade);
						//2. 当添加成功，提示用户，然后关闭模态框
						//3. 当添加失败，提示用户，不关闭模态框
						this.$refs['gradeDialogForm'].resetFields();
						this.gradeDialog.visible = false;
					} 
				});
				
			},
			// 去修改年级数据
			toEditGrade(row){
				//1. 弹出模态框
				this.gradeDialog.title = '修改年级';
				this.gradeDialog.visible = true;
				this.gradeDialog.form = row;
				console.log('edit',JSON.stringify(row));
			},
			// 去删除年级数据
			toDeleteGrade(row){
				console.log('delete',JSON.stringify(row));
			},
			handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      handleGradeDialogClose(done){
      	this.$refs['gradeDialogForm'].resetFields();
      	done();
      }
		}
	}
</script>
<style scoped="scoped">
	.topBtns {
		margin-bottom: .5em;
	}
</style>







