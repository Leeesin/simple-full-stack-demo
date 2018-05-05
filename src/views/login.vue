<style lang="less">
@import "./login.less";
.my-q-login{
  .ivu-btn{
    border-radius: 18px;
  }
}
</style>

<template>
  <div class="login my-q-login"
       @keydown.enter="handleSubmit">
   
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎使用医院信息管理系统
        </p>
        <div class="form-con">
          <Form ref="loginForm"
                :model="form"
                :rules="rules">
            <FormItem prop="username">
              <i-input v-model="form.username"
                       placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16"
                        type="person"></Icon>
                </span>
              </i-input>
            </FormItem>
            <FormItem prop="password">
              <i-input v-model="form.password"
                       placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14"
                        type="locked"></Icon>
                </span>
              </i-input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit"
                      style="margin-bottom:20px;"
                      type="primary"
                      :loading="loginLoading"
                      long>登录</Button>
              <Button @click="model.isRegisterShow=true"
                      type="success"
                      long>注册</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>

    <div class="register-con">
      <Modal v-model="model.isRegisterShow"
             width="360">
        <p slot="header"
           style="color:#19be6b;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>用户注册</span>
        </p>
        <div style="text-align:center">
          <Form ref="loginForm2"
                :model="form2"
                :rules="rules2">
            <FormItem prop="username">
              <i-input v-model="form2.username"
                       placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16"
                        type="person"></Icon>
                </span>
              </i-input>
            </FormItem>
            <FormItem prop="password">
              <i-input v-model="form2.password"
                       placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14"
                        type="locked"></Icon>
                </span>
              </i-input>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success"
                  size="large"
                  long
                  :loading="model.btnLoading"
                  @click="register">确认</Button>
        </div>
      </Modal>
    </div>

  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      loginLoading: false,
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },

      form2: {
        username: "",
        password: ""
      },

      rules2: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },

      model: {
        isRegisterShow: false,
        btnLoading: false
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loginLoading = true;
          let url = this.$api.user.login;
          this.$http
            .post(url, {
              username: this.form.username,
              password: this.form.password
            })
            .then(res => {
              console.log(res.data.status, "res");

              if (res.data.status == "1") {
                //success
                this.$Message.success(res.data.message);
                setTimeout(() => {
                  this.loginLoading = false;
                  Cookies.set("user", this.form.username);
                  Cookies.set("password", this.form.password);
                  this.$store.commit(
                    "setAvator",
                    "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
                  );
                  if (this.form.username === "iview_admin") {
                    Cookies.set("access", 0);
                  } else {
                    Cookies.set("access", 1);
                  }
                  this.$router.push({
                    name: "home_index"
                  });
                }, 1000);
              } else {
                setTimeout(() => {
                  this.loginLoading = false;
                  this.$Message.error(res.data.message);
                  return;
                }, 1000);
              }
            });
        }
      });
    },
    async register() {
      let url = this.$api.user.register;
      this.$refs.loginForm2.validate(valid => {
        if (valid) {
          this.model.btnLoading = true;
          this.$http
            .post(url, {
              username: this.form2.username,
              password: this.form2.password
            })
            .then(res => {
              if (res.data.status == 1) {
                setTimeout(() => {
                  this.model.btnLoading = false;
                  this.model.isRegisterShow = false;
                  this.$Message.success(res.data.message);
                }, 1000);
              }
              //重复注册
              if (res.data.status == 0) {
                setTimeout(() => {
                  this.model.btnLoading = false;
                  this.$Message.error(res.data.message);
                }, 1000);
              }
            });
        }
      });
    }
  }
};
</script>

<style>

</style>
