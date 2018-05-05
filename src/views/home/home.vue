<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
.con {
  max-width: 1260px;
  margin: 100px auto;
  .left {
    img {
      width: 215px;
      height: 215px;
      float: right;
      margin-right: 60px;
    }
    width: 29%;
    float: left;
  }
  .right {
    width: 71%;
    float: right;
    .btn {
      margin-top: 30px;
      .ivu-btn-primary {
        font-size: 30px;
        margin-right: 10px;
        color: #fff;
        background-color: #4fc08d;
        border-color: #4fc08d;
      }
    }
  }
}
.intr {
  max-width: 1260px;
  margin: 0 auto;
  clear: both;
  .ivu-card-bordered {
    margin: 20px;
  }
  .ivu-card-head-inner,
  .ivu-card-head p {
    font-size: 20px;
    color: #4fc08d;
  }
  .ivu-card {
    font-size: 18px;
    color: #7f8c8d;
  }
}
</style>
<template>
    <div class="home-main">
        <div class="con">
            <div class="left">
                <img src="./../../images/logo.png">
            </div>
            <div class="right">
                <h1 style="margin-top:18px;">
                    14物联本1覃佳雷
                </h1>
                <h1 style="margin-top:30px;">
                    基于web的医院信息管理系统
                </h1>
                <div class="btn">
                    <Button type="primary"
                            shape='circle'>前后端分离架构</Button>
                    <Button type="primary"
                            shape='circle'>Vue.js</Button>
                    <Button type="primary"
                            shape='circle'>Node.js</Button>
                    <Button type="primary"
                            shape='circle'>MongoDb数据库</Button>
                </div>
            </div>
        </div>
        <div class="intr">
            <Row>
                <Col span="6">
                <Card>
                    <p slot="title">挂号系统</p>
                    <p>负责处理病人挂号</p>
                </Card>
                </Col>
                <Col span="6">
                <Card dis-hover>
                    <p slot="title">药库管理系统</p>
                    <p>负责医院的药品管理</p>
                </Card>
                </Col>
                <Col span="6">
                <Card dis-hover>
                    <p slot="title">床位管理</p>
                    <p>负责医院住院床位管理</p>
                </Card>
                </Col>
                <Col span="6">
                <Card dis-hover>
                    <p slot="title">出入院管理</p>
                    <p>负责处理病人出入院</p>
                </Card>
                </Col>
            </Row>
        </div>

    </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
