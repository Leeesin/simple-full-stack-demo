<template>

    <div class="add">
        <div class="header">
            床位信息查询
        </div>
        <div class="search-area"
             style="margin-bottom:0px;">
            <Form inline
                  :label-width='80'>
                <FormItem label='床位号'>
                    <Input v-model="query.name"
                           placeholder="请输入床位号搜索..." />
                </FormItem>

                <FormItem label="床位医生">
                    <Input v-model="query.doctor"
                           placeholder="请输入床位医生搜索"></Input>
                </FormItem>

                <FormItem label="床位性别">
                    <Select v-model="query.sex"
                            placeholder="选择床位性别">
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                    </Select>
                </FormItem>

                <FormItem label="床位状态">
                    <Select v-model="query.status"
                            placeholder="选择床位状态">
                        <Option value="有人">有人</Option>
                        <Option value="无人">无人</Option>
                    </Select>
                </FormItem>

                <FormItem :label-width='10'>
                    <Button type="primary"
                            @click="search"
                            icon="search">搜索</Button>
                </FormItem>
            </Form>

        </div>
        <div class="content">
            <Table border
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
        status: "",
        sex: "",
        doctor: ""
      },
      columns: [
        {
          title: "床位号",
          key: "name"
        },
        {
          title: "床位状态",
          key: "status",
          render: (h, params) => {
            return h(
              "Tag",
              {
                props: {
                  type: "border",
                  color: params.row.status == "有人" ? "red" : "green"
                }
              },
              params.row.status
            );
          }
        },
        {
          title: "床位性别",
          key: "sex",
          render: (h, params) => {
            return h(
              "Tag",
              {
                props: {
                  color: params.row.sex == "女" ? "red" : "green"
                }
              },
              params.row.sex
            );
          }
        },
        {
          title: "床位医生",
          key: "doctor"
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
      data: []
    };
  },
  methods: {
    async getInfo({ key, page, size }) {
      let url = this.$api.bed.find;
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
          let url = this.$api.bed.remove;
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
