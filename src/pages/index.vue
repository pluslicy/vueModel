<!-- 入口文件 -->
<template>
 <div id="app">
    <!-- 头部布局开始 -->
    <header class="header container-fluid">
      <div class="row">
        <div class="logo col-sm-6 ">
          <i class="fa fa-tv"></i>
          <router-link to="/pandect" @click="goBackPandect">智慧校园</router-link>
        </div>
        <div class="info col-sm-6 hidden-xs">
          <el-dropdown class="user">
            <span class="el-dropdown-link">
              <img src="@/assets/xm.jpg">
              超级管理员<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><i class="fa fa-exclamation-circle fa-fw"></i>待办事宜</el-dropdown-item>
              <el-dropdown-item><i class="fa fa-commenting-o fa-fw"></i>通知</el-dropdown-item>
              <el-dropdown-item divided>
                <i class="fa fa-power-off fa-fw"></i>退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </header>
    <!-- 头部布局结束 -->
    <!-- 体部布局开始-->
    <article class="app_content container-fluid">
      <!-- 内容区左侧 -->
      <!-- 当屏幕大小小于768的时候，隐藏 -->
      <div class="app_left hidden-xs" :class="collapseLeft">
        <div class="app_left_bottom">
          <el-menu :default-active="tabs.defaultMenu.path" class="el-menu-vertical-demo" 
            @select="handleMenuSelect">
            <el-menu-item :key="tab.id" :index="tab.path" v-for="tab in tabs.menus">
             &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<i class="fa fa-fw" :class="tab.icon"></i>&nbsp;&nbsp;&nbsp;&nbsp;{{tab.name}}
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <!-- 内容区右侧 -->
      <div class="app_right" :class="collapseRight">
        <div class="app_right_top">
          <el-tabs v-model="tabs.activePage" @tab-click="handleTabClick">
            <el-tab-pane v-for="page in tabs.pages" :key="page.id" :label="page.name" :name="page.path"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="app_right_bottom" style="padding:.5em">
          <!-- 视图显示区 -->
          <router-view></router-view>
        </div>
      </div>
    </article>
    <!-- 体部布局结束-->
    <!-- 底部布局开始-->
    <footer class="footer">
      <div>版权所有：昆山杰普软件科技有限公司</div>
    </footer>
    <!-- 底部布局结束-->
  </div>
</template>

<script>
import $ from 'jquery';
import tabList from '../tabs.js';

export default {
  data(){
    return {
      isCollapse: false,  //默认关闭
      currentModule:'班级文化', //当前模块
      currentModuleindex:-1,
      tabs:{
        defaultMenu:null,
        menus:tabList,
        pages:[],
        activePage:null,
        currentTab:''
      }
    }
  },
  created(){
    this.tabs.defaultMenu = tabList[0];
    this.handleMenuSelect(this.tabs.defaultMenu.path);
  },
  computed:{
    collapseLeft (){
      return this.isCollapse?"app_left_collapse":""
    },
    collapseRight(){
      return this.isCollapse?"app_right_collapse":"";
    }
  },
  methods:{
    //点击logo字体，返回首页
    goBackPandect(){
      this.$router.push('/pandect');
    },
    // 点击菜单操作
    handleMenuSelect(path){
      //设置当前二级选项卡数据
     this.tabs.defaultMenu= this.tabs.menus.filter((item)=>{
        return item.path == path;
      })[0];
      this.tabs.pages = this.tabs.defaultMenu.children;
      //设置二级选项卡默认值
      this.tabs.activePage = this.tabs.pages[0].path;
      //页面跳转
      // this.$router.push(this.tabs.defaultMenu.path+'/'+this.tabs.activePage);
      this.$router.push(this.tabs.defaultMenu.path);
    },
    // 点击二级菜单操作
    handleTabClick(tab,event){
      this.$router.push(this.tabs.defaultMenu.path+'/'+tab.name);
    },
    collapse(){
      this.isCollapse = !this.isCollapse
       //62
      if(this.isCollapse){

      }
    }
  }
}
</script>
<style scoped="scoped" lang="scss">
$bgColor:#f8f8f8;
$bgColor_header:#fff;
$text_color:#666;
$leftNav_color:#4c8c7c;
$leftNav_font_color:#fff;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  left: 0;
  right: 0;
  top:0;
  bottom: 5px;
  background-color: $bgColor;

  ul {
    margin:0;padding:0;
    list-style:none;
  }
  // 头部样式开始
  .header {
    position:absolute;
    left:0;right:0;
    background-color:$bgColor_header;
    padding:0 2em;
    color:$text_color;
    box-shadow: 0 1px 2px rgba(0,0,0,.3);
    z-index:1000;
    * {
      line-height:56px;
      height:56px;
    }
    .logo{
      text-align:left;
      font-size:1.5em;
      a {
        text-decoration: none;
        color:$text_color;
      }
    }
    .info {
      text-align:right;

      .user {
        cursor:pointer;
        .el-dropdown-link {
          color:$text_color;
        }
        img{
          height:2.5em;
          width:2.5em;
          border-radius:50%;
          background-color:#FFFFFF;
          margin:0 .5em;
        }
      }
    }
  }
  // 头部样式结束
  // 体部样式开始
  .app_content {
    position:absolute;
    left:0;right:0;
    top:56px;
    bottom:30px;
    overflow-x:hidden;
    
    

    .app_left {
      position:absolute;
      top:0; bottom:0;
      left:0;
      width:212px;
      box-sizing:border-box;
      z-index:3;
      // border-right:1px solid #ededed;
      box-shadow: 0 3px 8px rgba(110,106,106,.3);
      background-color:$leftNav_color;

      .app_left_top {
        position:absolute;
        top:0;
        left:0;right:0;
        height:3em;
        line-height:3em;
        //padding:0 1em;
        border-bottom:1px solid #ededed;

        ul {
          padding:0.25em;
          li {
            float:left;
            width:2.5em;
            height:2.5em;
            line-height:2.5em;
            text-align:center;
            color:$leftNav_font_color;
            border-radius:.25em;
            cursor:pointer;
            margin-right:.25em;
          }
          li:nth-child(1){
            background-color:$bgColor_header;
          }
          li:nth-child(2){
            background-color:#ffb35f;
          }
          li:nth-child(3){
            background-color:#f78989;
          }
        }
      }
      
      .app_left_bottom {
        position:absolute;
        top:0;
        bottom:0;
        left:0;right:0;
        padding:.1em 0;
        //padding:0 1em;
        // overflow-y: scroll;

        .el-menu {
          border-right:none;

        }
        .el-menu--collapse {
          width:63px;
        }
        // 重置左侧栏导航项目高度
        .el-submenu .el-menu-item,.el-menu-item{
          height:3em;
          line-height:3em;

          .fa-hand-o-right {
            position:absolute;
            top:1em;
            left:1.5em;
          }
        }
      }
    }
    
    // 左侧动态折叠样式
    .app_left_collapse {
      width:64px;
    }
    
    .app_right {
      position:absolute;
      top:0; bottom:0;
      left:210px; 
      right:0;
      // 如果屏幕大小小于768，则铺满整个屏幕
      @media screen and (max-width: 767px) {
        left:0;
      }

      .app_right_top {
        position:absolute;
        top:0;
        left:0;right:0;
        height:3em;
        line-height:3em;
        padding:0 1em;
        background-color:#fff;
        border-bottom:1px solid #ededed;
      }
      
      .app_right_bottom {
        background:#FFFFFF;
        position:absolute;
        top:3em;
        bottom:0;
        left:0;right:0;
        padding:.5em 0;
      }
    }
    // 右侧动态折叠样式
    .app_right_collapse {
      left:64px;
    }
  }
  // 体部样式结束
  // 底部样式开始
  .footer {
    position:absolute;
    background-color:$bgColor_header;
    left:0;right:0;
    bottom:0;
    height:30px;
    line-height:30px;
    text-align:center;
    color:$text_color;
    border-top:1px solid #ededed;
  }
  // 底部样式结束
}
</style>
