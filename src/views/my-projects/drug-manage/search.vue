<template>

    <div class="add">
        <div class="header">
            药品信息查询
        </div>
        <div class="search-area"
             style="margin-bottom:0px;">
            <Form inline
                  :label-width='80'>
                <FormItem label='药品名称'>
                    <Input v-model="query.name"
                           placeholder="请输入药品名称搜索..." />
                </FormItem>

                <FormItem label='药品单价'>
                    <Input v-model="query.price"
                           placeholder="请输入药品单价搜索..." />
                </FormItem>

                <FormItem label='药品产地'>
                    <Select v-model="query.origin">
                        <Option value="武汉">武汉</Option>
                        <Option value="上海">上海</Option>
                        <Option value="北京">北京</Option>
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
        price: "",
        origin: ""
      },
      columns: [
        {
          title: "药品名称",
          key: "name"
        },
        {
          title: "产地",
          key: "origin"
        },
        {
          title: "药品零售价",
          key: "price"
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
      let url = this.$api.drug.find;
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
          let url = this.$api.drug.remove;
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
