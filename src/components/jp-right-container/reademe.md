<jp-right-container 
	:visiable='rightContainer.visible'
	:width='rightContainer.width'
	@close='closeRightContainer'>
	<div slot='rc_option' >
		{{rightContainer.title}}
	</div>
	<div slot='rc_content'>
		
	</div>
</jp-right-container>

rightContainer:{
	visible:false,
	width:'100%',
	title:''
},

closeRightContainer(){
	this.rightContainer.visible = false;
},