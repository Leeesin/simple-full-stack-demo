<template>

  <div class="add">
    <div class="header">
     挂号病人入院
    </div>
    <div class="search-area"
         style="margin-bottom:0px;">
      <Form inline
            :label-width='40'>
        <FormItem label='姓名'>
          <Input v-model="query.name"
                 placeholder="请输入姓名搜索..." />
        </FormItem>

        <FormItem label='年龄'>
          <Input v-model="query.age"
                 placeholder="请输入年龄搜索..." />
        </FormItem>

        <FormItem label="性别">
          <Select v-model="query.sex">
            <Option value="man">男</Option>
            <Option value="women">女</Option>
          </Select>
        </FormItem>
        <FormItem :label-width='10'>
          <Button type="primary"
                  @click="search"
                  icon="search">搜索</Button>
        </FormItem>
        <FormItem :label-width='10'>
          <Button type="success"
                  @click="batchIn"
                  icon="search">入院</Button>
        </FormItem>
      </Form>

    </div>
    <div class="content">
      <Table border
             @on-selection-change='changeSelections'
             :columns="columns"
             :data="data"></Table>
      <Page :total="page.total"
            show-total
            :page-size='5'
            @on-change='changePage'
            style="margin-top:10px;"></Page>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      page: {
        size: 5,
        page: 1,
        total: 0
      },
      query: {
        name: "",
        sex: "",
        age: ""
      },
      columns: [
        {
          type:'selection',
          width:'60',
        },
        {
          title: "姓名",
          key: "name",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.name)
            ]);
          }
        },
        {
          title: "药品",
          key: "drug"
        },
        {
          title: "床位号",
          key: "bed"
        },
        {
          title: "年龄",
          key: "age"
        },
        {
          title: "性别",
          key: "sex",
          render: (h, params) => {
            let colors = params.row.sex == "man" ? "green" : "red";
            let sexName = params.row.sex == "man" ? "男" : "女";
            return h("div", [
              h(
                "Tag",
                {
                  props: {
                    color: colors
                  }
                },
                sexName
              )
            ]);
          }
        },
        {
          title: "保险类型",
          key: "gender",
          render: (h, params) => {
            return h("div", [
              h(
                "Tag",
                {
                  props: {
                    color: "blue"
                  }
                },
                params.row.gender
              )
            ]);
          }
        },
        {
          title: "报销比例（%）",
          key: "percent"
        },
        {
          title: "挂号日期",
          key: "date",
          render: (h, params) => {
            let text = params.row.date.toString();
            let i = text.indexOf("T");
            let flag = text.substring(0, i);

            return h("span", flag);
          }
        },
        {
          title: "挂号时间",
          key: "time"
        },

        {
          title: "备注",
          key: "remark"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "add",
                        query: { name: params.row.name }
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.name);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [],
      selected: []
    };
  },
  methods: {
    async batchIn() {
      this.$Modal.confirm({
        content: "确认执行该操作吗？",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          let url = this.$api.hospital.in;
          this.$http.post(url, this.selected).then(res => {
            //删除已经入院的数据
            for (const item of this.selected) {
              this.delete(item.name);
            }
          });
        }
      });
    },
    async getInfo({ key, page, size }) {
      let url = this.$api.register.find;
      let res = await this.$http.post(url, {
        key,
        page,
        size
      });
      this.data = res.data.items;

      if (this.data.length === 0) {
        this.getInfo({
          key,
          page: page - 1,
          size
        });
      }
      this.page.total = res.data.total;
      1;
    },
    search() {
      let flag = this.initQuery(this.query);

      this.getInfo({
        key: flag,
        page: this.page.page,
        size: 5
      });
    },
    initQuery(obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const element = obj[key];

          if (element === "") {
            delete obj[key];
          }
        }
      }
      return obj;
    },
    async remove(params) {
      this.$Modal.confirm({
        content: "确认执行该操作吗？",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          let url = this.$api.register.remove;
          this.$http
            .post(url, {
              name: params
            })
            .then(res => {
              this.search();
            });
        }
      });
    },
    async changePage(page) {
      this.page.page = page;
      let flag = this.initQuery(this.query);
      this.getInfo({
        key: flag,
        page: page,
        size: 5
      });
    },
    changeSelections(item) {
      for (const i of item) {
        delete i._id;
      }
      this.selected = item;
    },
    delete(params) {
      let url = this.$api.register.remove;
      this.$http
        .post(url, {
          name: params
        })
        .then(res => {
          this.search();
        });
    }
  },
  mounted() {
    this.search();
  }
};
</script>
<style lang="less" scoped>
@import "../../common.less";
</style>
