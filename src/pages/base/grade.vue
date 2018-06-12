<template>
	<div class="grade">
		<el-row class='topBtns'>
			<el-col :span='12'>
				<el-input style='width:220px' size='small'></el-input>
			</el-col>
			<el-col :span='12' class='content-right'>
				<el-button @click='toAddGrade' size="small">添加</el-button>
				<el-button @click="toBatchDelete" size="small">批量删除</el-button>
			</el-col>
		</el-row>

		<el-row>
			<el-col :span='24'>
				<el-table
					v-loading='gradeTblLoading'
					size='mini'
					border
			    ref="multipleTable"
			    :data="getGradeList"
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
			    <el-table-column align='center' type="selection" width="55"></el-table-column>
			    <el-table-column prop="name" label="名称"></el-table-column>
			    <el-table-column prop="description" label="简介"></el-table-column>
			    <el-table-column width='120' align='center' label="操作">
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
		    <el-button @click="gradeDialog.visible = false" size="small">取 消</el-button>
		    <el-button type="primary" @click="submitGradeForm" size="small">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
	export default {
		data(){
			return {
				gradeTblLoading:false,
				selectedGrades:[],	//复选的年级信息
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
		created(){
			this.loadGradeList();
		},
		computed:{
			...mapGetters(['getGradeList'])
		},
		methods:{

			...mapActions(['findAllGrade','saveOrUpdateGrade','deleteGradeById','batchDeleteGrade']),
			// 加载年级数据
			loadGradeList(){
				// 查询所有年级信息
				this.gradeTblLoading = true;
				this.findAllGrade().catch((error)=>{
					this.$notify({title: '失败', message: '数据异常:'+error.message, type: 'error'});
				}).finally(()=>{
					this.gradeTblLoading = false;
				});
			},

			// 去添加年级数据
			toAddGrade(){
				//1. 弹出模态框
				this.gradeDialog.title = '添加年级';
				this.gradeDialog.visible = true;
				//2. 初始化或者是重置模态框中的默认值
				this.gradeDialog.form.id = '';
				this.gradeDialog.form.name ='';
				this.gradeDialog.form.description ='';
			},
			// 提交年级表单
			submitGradeForm(){
				//0. 数据校验
				this.$refs['gradeDialogForm'].validate((valid)=>{
					if(valid){
						//1. 向后台发送数据
						let grade = this.gradeDialog.form;
						this.saveOrUpdateGrade(grade).then(()=>{
							//2. 当添加成功，提示用户，然后关闭模态框
							this.$notify({title: '成功', message: '年级信息保存成功', type: 'success'});
							this.loadGradeList();
							this.$refs['gradeDialogForm'].resetFields();
							this.gradeDialog.visible = false;
						}).catch(()=>{
							//3. 当添加失败，提示用户，不关闭模态框
							this.$notify({title: '失败', message: '年级信息保存失败', type: 'error'});
						});
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
			//去批量删除
			toBatchDelete(){
				if(this.selectedGrades && this.selectedGrades.length>0){
					//1, 询问用户是否删除
					this.$confirm('此操作将永久删除这些数据, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	//2. 获取要删除的id
	        	let ids  = this.selectedGrades.map((item)=>{
	        		return item.id;
	        	})
	        	// 3. 调用接口进行删除
	        	this.batchDeleteGrade(ids.join()).then(()=>{
          		this.$notify({type: 'success', message: '删除成功!'});

	        		this.loadGradeList();
	        	});
	        })
        } else {
          this.$notify({type: 'warning', message: '请选选中要删除的数据!'});

        }
			},
			// 去删除年级数据
			toDeleteGrade(row){
				//1, 询问用户是否删除
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	// 2. 确定删除，调用store中的函数，删除
        	this.deleteGradeById(row.id).then(()=>{
          	this.$notify({type: 'success', message: '删除成功!'});
          	//3. 刷新列表
          	this.loadGradeList();
        	}).catch(()=>{
          	this.$notify({type: 'error', message: '删除失败!'});
        	});
        })
			},
			handleSelectionChange(val) {
        this.selectedGrades = val;
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







