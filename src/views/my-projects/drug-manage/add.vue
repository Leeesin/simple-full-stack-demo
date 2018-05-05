<template>
    <div class="add">
        <div class="header">药品信息登记</div>
        <div class="content">
            <Form ref="formValidate"
                  :model="formValidate"
                  :rules="ruleValidate"
                  :label-width="100">

                <FormItem label="药品名称"
                          prop="name">
                    <Input v-model="formValidate.name"
                           placeholder="请输入药品名称"></Input>
                </FormItem>

                <FormItem label="药品零售价"
                          prop="price">
                    <Input v-model="formValidate.price"
                           placeholder="请输入药品零售价"></Input>
                </FormItem>

                <FormItem label="药品产地"
                          prop="origin">
                    <Select v-model="formValidate.origin"
                            clearable
                            placeholder="选择药品产地">
                        <Option value="武汉">武汉</Option>
                        <Option value="上海">上海</Option>
                        <Option value="北京">北京</Option>
                    </Select>
                </FormItem>

                <FormItem label="生产日期">
                    <FormItem prop="date">
                        <DatePicker type="date"
                                    format='yyyy年MM月dd日'
                                    value='MM/dd/yy'
                                    placeholder="选择日期"
                                    v-model="formValidate.date"></DatePicker>
                    </FormItem>
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
        price: "",
        origin: "",
        date: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        origin: [
          {
            required: true,
            message: "必填项",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
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
          let url = this.$api.drug.save;
          this.$http.post(url, this.formValidate).then(res => {
            if (res.data.status == 1) {
              this.$Message.success(res.data.message);
            }
          });
        }
      });
    },
    async update() {
      let url = this.$api.drug.update;
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
        let url = this.$api.drug.find;
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
  },
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
