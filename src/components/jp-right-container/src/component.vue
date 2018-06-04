<!-- 
	属性
		visiable	默认右侧容器是否打开

	函数
		close	关闭右侧容器

	插槽
		rc_content 内容
 -->
<template>
	<transition     
		enter-active-class='animated slideInRight'    
	 	leave-active-class='animated slideOutRight'>
		<div class="jp-right-container" v-show="visiable" :style="dyLayout">
			<!-- 头部 -->
			<div class="rc_header">
				<div class="topBar">
					<div class="rc_option">
						<slot name="rc_option"></slot>
					</div>
					<i class="fa fa-close" @click='close'></i>
				</div>
			</div>
			<!-- 体部 -->
			<div class="rc_content">
				<slot name="rc_content"></slot>
			</div>
			
		
		</div>
	</transition>
</template>
<script>
	export default {
		name:'jp-right-container',
		data(){
			return {
				msg:'hello component'
			}
		},
		computed:{
			dyLayout(){
				return this.width?"width:"+this.width:'';
			}
		},
		props:['visiable','width'],
		methods:{
			close(){
				// 关闭模态框

				//向父元素发射关闭时间
				this.$emit('close');
			}
		}
	}
</script>
<style scoped lang="scss">
	.jp-right-container {
		position:absolute;
		right:0; 
		width:640px;
		top:-42px;bottom:0;
		background-color:#fff;
		z-index:100;
		border-left:1px solid #ededed;
		overflow-y:scroll;
		box-shadow: 0 3px 8px rgba(110,106,106,.3);

		.rc_header {
			height:4em;
			padding:0 1em;
			background-color:#f4f6fc;

			.topBar {
				line-height:4em;
				position:relative;

				.rc_option {
					position:absolute;
					left:0; right:3em;
				}

				i.fa {
					cursor:pointer;
					line-height:4em;
				}
				i.fa-close {
					position:absolute;
					right:1em;
					top:0;
					color:#606266;
				}
			}
		}

		.rc_content {
			padding:1em;
		}
	}
</style>