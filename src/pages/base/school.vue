<template>
	<div class="school" v-loading='schoolFormLoading'>
		<el-form ref="form" :model="form" label-width="80px">
		  <el-form-item label="校园名称">
		    <el-input size="small" v-model="form.name"></el-input>
		  </el-form-item>
		  <el-form-item label="校园地址">
		    <el-input size="small" v-model="form.address"></el-input>
		  </el-form-item>
		  <el-form-item label="校园电话">
		    <el-input size="small" v-model="form.telephone"></el-input>
		  </el-form-item>
		  <el-form-item label="版权信息">
		    <el-input size="small" v-model="form.copyright"></el-input>
		  </el-form-item>
		  <el-form-item label="校园介绍">
		    <el-input size="small" type="textarea" v-model="form.description"></el-input>
		  </el-form-item>
		  <el-form-item class="content-right">
		    <el-button type="primary" @click="submitSchoolForm">保存</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>
<script type="text/javascript">
	import {mapGetters,mapActions} from 'vuex'
	export default {
		data(){
			return {
				schoolFormLoading:false,
				form:{

				}
			}
		},
		created(){
			this.loadSchool();
		},
		computed:{

		},
		methods:{
			...mapActions(['findSchool','saveOrUpdateSchool']),
			submitSchoolForm(){
				this.saveOrUpdateSchool(this.form)
				.then((result)=>{
					this.$notify({type:"success",message:result.message})
				})
				.catch((error)=>{
					this.$notify({type:"warning",message:error.message})
				})
				.finally(()=>{
					this.loadSchool();
				});
			},
			loadSchool(){
				this.schoolFormLoading = true;
				this.findSchool().then((result)=>{
					//将ajax请求的结果数据设置到form中
					this.form = result.data;
				}).catch((error)=>{
					//错误提示
					this.$notify({type:'warning',message:'数据加载异常'})
				}).finally(()=>{
					// 取消加载状态
					this.schoolFormLoading = false;
				});
			}
		}
	}
</script>















