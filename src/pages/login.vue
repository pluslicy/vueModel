<template>
  <div class="login" :style="style">
    <div class="login_content">
        <div class="login_body">
            <div class="one">
                <div class="left">
                  <p>智慧校园</p>
                </div>
            </div>
            <div class="two">
                 <el-form :rules='rules' class='demo-ruleForm form' ref="form" :model="form">
                    <el-form-item prop='user'>
                       <el-input  placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop='passwd'>
                       <el-input type='password'  placeholder="密码" @keyup.enter.native="login('loginForm')"></el-input>
                    </el-form-item>
                     <el-form-item>
                        <el-checkbox-group v-model="form.type">
                          <el-checkbox label="记住密码" name="type"></el-checkbox>
                          <el-checkbox label="忘记密码" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-row>
                        <el-col :span="24">
                            <el-button  id='submit' @click="login">登录</el-button>
                        </el-col>
                    </el-row>
                </el-form>  
            </div> 
        </div>
      </div>
  </div>
</template>

<script>
import $ from 'jquery';
let height = $(window).height();
export default {
  name: 'Login',
  data(){
    return {
       style:"height:"+height+"px",
       form:{
            type: [],
       },
       rules:{
            user:[
                {required:true,message:'请输入用户名',trigger: 'blur'},
            ],
            passwd:[
                {required:true,message:'请输入密码',trigger: 'blur'},
            ],
        },
    }
  },
  methods:{
    login(){
      //默认访问
      this.$router.push('/app');
    }
  }
}
</script>

<style type="text/css" scoped>
.login {
  position: relative;  
  background-image: url('../images/bg.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.login .login_content {
  position: absolute;
  top: 80px;
  bottom: 0;
  left: 0;
  right: 0;
}
.login .login_content .login_body{
  width: 27%;
  height: 60%;
  margin-left: 57%;
  margin-top: 3.5%;
  border-radius: 5px;
  background: #fff;
  animation-name: boxShadowBody;
  animation-duration: 1.5s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
}
.login .login_content .login_body .one {
  /* border:1px solid rosybrown;  */
  padding:18px;
}
.login .login_content .login_body .one:after {
  content: '';
  display: block;
  clear: both;
}
.login .login_content .login_body .one .left {
  width: 100%;
  float: left;
  text-align: center;
}
.login .login_content .login_body .one .left>p:nth-child(1) {
  font-size: 22px;
  color:  rgb(136, 136, 136);
}
.login .login_content .login_body .two {
  background-color: rgb(238, 238, 238);
  padding: 18px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.login .login_content .login_body .two .el-row:not(:nth-child(3)) {
  margin-bottom: 20px;
}
.login #submit {
  width: 100%;
  margin-bottom:20px;
  background:#4c8c7c;
  text-align: center;
  color: rgb(238, 238, 238);
}
</style>