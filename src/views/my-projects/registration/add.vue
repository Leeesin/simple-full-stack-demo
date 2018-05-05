<template>
  <div class="add">
    <div class="header">病人登记</div>
    <div class="content">
      <Form ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="80">

        <FormItem label="姓名"
                  prop="name">
          <Input v-model="formValidate.name"
                 placeholder="请输入姓名"></Input>
        </FormItem>

        <FormItem label="年龄"
                  prop="age">
          <Input v-model="formValidate.age"
                 placeholder="请输入年龄"></Input>
        </FormItem>

        <FormItem label="性别"
                  prop="sex">
          <Select v-model="formValidate.sex"
                  clearable
                  placeholder="选择性别">
            <Option value="man">男</Option>
            <Option value="women">女</Option>
          </Select>
        </FormItem>

        <FormItem label="床位"
                  prop="bed">
          <Select v-model="formValidate.bed"
                  clearable
                  placeholder="选择床位">
            <Option v-for="item in options.bed"
                    :value="item.name"
                    :key="item">{{ item.name }}</Option>
          </Select>
        </FormItem>

        <FormItem label="药品"
                  prop="drug">
          <Select v-model="formValidate.drug"
                  clearable
                  placeholder="选择药品">
            <Option v-for="item in options.drug"
                    :value="item.name"
                    :key="item._id">{{ item.name }}</Option>
          </Select>
        </FormItem>

        <FormItem label="挂号时间">
          <Row>
            <Col span="11">
            <FormItem prop="date">
              <DatePicker type="date"
                          format='yyyy年MM月dd日'
                          value='MM/dd/yy'
                          placeholder="选择日期"
                          v-model="formValidate.date"></DatePicker>
            </FormItem>
            </Col>
            <Col span="2"
                 style="text-align: center">-</Col>
            <Col span="11">
            <FormItem prop="time">
              <TimePicker type="time"
                          format="HH点mm分ss秒"
                          placeholder="选择时间"
                          v-model="formValidate.time"></TimePicker>
            </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem label="医保类型"
                  prop="gender">
          <RadioGroup v-model="formValidate.gender">
            <Radio label="城镇医疗保险">城镇医疗保险</Radio>
            <Radio label="农村合作医疗">农村合作医疗</Radio>
            <Radio label="职工医疗保险">职工医疗保险</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="报销比例"
                  prop="ratio">
          <i-circle :percent="formValidate.percent"
                    :stroke-color="color">
            <div class="demo-Circle-custom">
              <h3 v-if="formValidate.percent == 100"
                  style="margin-bottom:10px;">全部报销</h3>
              <h3 v-if="formValidate.percent == 0"
                  style="margin-bottom:10px;">不报销</h3>
              <span style="font-size:24px">{{ formValidate.percent }}%</span>
            </div>
          </i-circle>

          <ButtonGroup size="large">
            <Button icon="ios-plus-empty"
                    @click="add"></Button>
            <Button icon="ios-minus-empty"
                    @click="minus"></Button>
          </ButtonGroup>

        </FormItem>

        <FormItem label="备注">
          <Input v-model="formValidate.remark"
                 type="textarea"
                 :autosize="{minRows: 2,maxRows: 5}"></Input>
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
      options: {
        bed: [],
        drug: []
      },
      formValidate: {
        name: "",
        age: "",
        sex: "",
        gender: "",
        bed: "",
        drug: "",
        date: "",
        time: "",
        remark: "",
        percent: 0
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        age: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        drug: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        bed: [
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
        gender: [{ required: true, message: "必填项", trigger: "change" }],
        date: [
          {
            required: true,
            type: "date",
            message: "必填项",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
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
          let url = this.$api.register.save;
          this.$http.post(url, this.formValidate).then(res => {
            if (res.data.status == 1) {
              this.$Message.success(res.data.message);
            }
          });
        }
      });
    },
    async update() {
      let url = this.$api.register.update;
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
        let url = this.$api.register.find;
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
    },
    async getDrug() {
      let url = this.$api.drug.find;
      let res = await this.$http.post(url, {
        key: {},
        page: 1,
        size: 20
      });
      this.options.drug = res.data.items;
    },
    async getBed() {
      let url = this.$api.bed.find;
      let res = await this.$http.post(url, {
        key: {},
        page: 1,
        size: 20
      });
      this.options.bed = res.data.items;
    }
  },
  mounted() {
    this.getDrug();
    this.getBed();
    this.whenEdit();
  },
  computed: {
    color() {
      let color = "#2db7f5";
      if (this.formValidate.percent == 100) {
        color = "#5cb85c";
      }
      return color;
    }
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
