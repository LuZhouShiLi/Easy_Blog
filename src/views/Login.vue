<template>
  <div class = "login-body">
    <div class  = "login-panel">
      <div class = "login-title">用户登录</div>

      <!-- 填入表单 -->
      <el-form :model = "formData"
               :rules = "rules"
               ref = "formDataRef">
          <el-form-item label="" prop = "account">
            <el-input placeholder="请输入账号" 
            v-model ="formData.account" size = "large">
            <!-- 添加插槽  引入图标 -->
            <template #prefix>
              <span class = "iconfont icon-icons_accout"></span>
            </template>

            </el-input>
          </el-form-item>

          <el-form-item label="" prop = "password">
            <el-input type = "password" placeholder="请输入密码" 
            v-model ="formData.password" size = "large">

            <template #prefix>
              <span class = "iconfont icon-password"></span>
            </template>

            </el-input>
          </el-form-item>

          <el-form-item label="" prop = "checkCode">
           <div class = "checkCode-panel">
            <el-input placeholder="请输入验证码" 
            v-model ="formData.checkCode"  class = "input-panel" size = "large" @keyup.enter.native = "login"/>
            
            <img :src = "checkCodeUrl" class = "check-code" @click="changeCheckCode">
           </div>
          </el-form-item>

          <el-form-item label="">
            <el-checkbox v-model ="formData.rememberMe" :label = "1">记住我</el-checkbox>
          </el-form-item>

          <el-form-item label="">
            <el-button type = "primary" :style = "{width: '100%'}" @click="login()">登录</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import VueCookies from 'vue-cookies'
import md5 from 'js-md5'
import {getCurrentInstance, getCurrentScope, reactive, ref} from "vue"
import {useRouter} from 'vue-router'

const router = useRouter();


const {proxy} = getCurrentInstance();




const api = {
  checkCode:"api/checkCode",
  login:"login"
}

const formData = reactive({});
const checkCodeUrl = ref(api.checkCode);

const changeCheckCode = () =>{
  checkCodeUrl.value = "api.checkCode" + "?" + new Date().getTime();
}

const formDataRef = ref();

const rules = {
  account:[{
    required:true,
    message:"请输入用户名",
  }],

  password:[{ 
    required:true,
    message:"请输入密码",
  }],

  checkCode:[{ 
    required:true,
    message:"请输入验证码",
  }]
}


// 登录之前进行初始化  自动填充信息
const init = ()=>{
  const loginInfo = VueCookies.get("loginInfo");
  if(!loginInfo)
  {
    return;
  }
  Object.assign(formData,loginInfo);
}


init();

// 校验表单
const login = () =>{
  formDataRef.value.validate(async (valid) =>{
    if(!valid){
      return;
    }

    let cookieLoginInfo = VueCookies.get("loginInfo");
    let cookiePassword = cookieLoginInfo == null ? null:cookieLoginInfo.password;

    if(formData.password != cookiePassword)
    {
      formData.password = md5(formData.password);
    }

    // 将参数封装到对象中
    let params = {
      account:formData.account,
      password:formData.password,
      checkCode:formData.checkCode
    }

    let result = await proxy.Request({
      url:api.login,
      params:params,
      errCallback:()=>{
        changeCheckCode();// 刷新验证码
      }
    })

    if(!result){
      return;
    }

    proxy.message.success("登录成功");

    setTimeout(()=>{
      router.push("/home")
    },1500);

    // 如果登陆成功 保存账号信息 密码信息
    const loginInfo = {
      account:params.account,
      password:params.password,
      rememberMe:formData.rememberMe
    }

    VueCookies.set("userInfo",result.data,0);
    if(formData.rememberMe == 1){
      VueCookies.set("loginInfo",loginInfo,"7d");// 登录信息保留七天时间  使用cookies进行保存信息
    }

  });

}

</script>

<style lang = "scss">
.login-body{
  
  width:100%;
  height: calc(100vh);
  background-size: cover;
  background-position: center;
  background-image:url(../assets/vue.png);

  .login-panel{
    margin-top: 180px;
    float: right;
    width:350px;

    margin-right:100px;
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    background:rgba(255,255,255,0.7);
    box-shadow: 2px 2px 10px #ddd;
  }

  .login-title{
    font-size:18px;
    text-align: center;
    margin-bottom: 10px;

  }

  .checkCode-panel{
    width:100%;
    display:flex;
    align-items: center;
    .input-panel{
      flex:1;
      margin-right:5px;
    }

    .check-code{
        // height: 30px;
        cursor: pointer;
    }
  }

}

</style>