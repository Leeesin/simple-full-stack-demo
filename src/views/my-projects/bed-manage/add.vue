<template>
    <div class="add">
        <div class="header">床位信息登记</div>
        <div class="content">
            <Form ref="formValidate"
                  :model="formValidate"
                  :rules="ruleValidate"
                  :label-width="100">
                <!-- 床位号，床位性别，状态，床位医生 -->
                <FormItem label="床位号"
                          prop="name">
                    <Input v-model="formValidate.name"
                           placeholder="请输入床位号"></Input>
                </FormItem>

                <FormItem label="床位医生"
                          prop="doctor">
                    <Input v-model="formValidate.doctor"
                           placeholder="请输入床位医生"></Input>
                </FormItem>

                <FormItem label="床位性别"
                          prop="sex">
                    <Select v-model="formValidate.sex"
                            placeholder="选择床位性别">
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                    </Select>
                </FormItem>

                <FormItem label="床位状态"
                          prop="status">
                    <Select v-model="formValidate.status"
                            placeholder="选择床位状态">
                        <Option value="有人">有人</Option>
                        <Option value="无人">无人</Option>
                    </Select>
                </FormItem>

                <FormItem>
                    <Button type="primary"
                            @click="handleSubmit('formValidate')">提交</Button>
                    <Button type="ghost"
                            @click="handleReset('formValidate')"
                            style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>

        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      isEdit: false,
      editKey: "",
      formValidate: {
        name: "",
        doctor: "",
        sex: "",
        status: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        doctor: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "必填项",
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            message: "必填项",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.update();
            return;
          }
          let url = this.$api.bed.save;
          this.$http.post(url, this.formValidate).then(res => {
            if (res.data.status == 1) {
              this.$Message.success(res.data.message);
            }
          });
        }
      });
    },
    async update() {
      let url = this.$api.bed.update;
      delete this.formValidate._id;
      let res = await this.$http.post(url, {
        name: this.editKey,
        newValue: this.formValidate
      });
      this.$Message.success(res.data.message);
      this.$router.push("search");
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    add() {
      if (this.formValidate.percent >= 100) {
        return false;
      }
      this.formValidate.percent += 10;
    },
    minus() {
      if (this.formValidate.percent <= 0) {
        return false;
      }
      this.formValidate.percent -= 10;
    },
    async whenEdit() {
      if (this.$route.query.name) {
        this.isEdit = true;
        let name = this.$route.query.name;
        let url = this.$api.bed.find;
        let res = await this.$http.post(url, {
          key: {
            name: name
          },
          page: 1,
          size: 5
        });
        this.formValidate = res.data.items[0];
        this.editKey = this.formValidate.name;
      }
      // console.log(res);
    }
  },
  mounted() {
    this.whenEdit();
  }
};
</script>
<style lang='less' scoped>
@import "../../common.less";
.add {
  .content {
    width: 500px;
  }
}
</style>
