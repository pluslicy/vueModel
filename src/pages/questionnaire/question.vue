<!-- 题库管理 -->
<template>
	<div class="question">
		<!-- 按钮区 -->
		<el-row>
			<el-col :span="12">
				<el-input size="small"></el-input>
			</el-col>
			<el-col :span="12" class="content-right">
				<el-button size="small">添加</el-button>
				<el-button size="small">批量删除</el-button>
			</el-col>
		</el-row>
		<!-- 按钮区结束 -->
		<!-- {{getQuestionList}} -->
		<!-- {{questionList}} -->
		<!-- 问题列表 -->
		<div class="question_list" :style='questionListStyle'>
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
	</div>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
	export default {
		data(){
			return {
				questionListHeght:400,
				questionList:[]
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
			this.findAllQuestion();
		},
		methods:{
			...mapActions(['findAllQuestion'])
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











