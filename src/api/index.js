import user from "./user.js";
import register from "./register.js";
import drug from "./drug.js";
import bed from "./bed.js";
import hospital from "./hospital.js";

const api = {
  user,
  register,
  drug,
  bed,
  hospital,
}

export default {
  install(Vue) {
    Vue.prototype.$api = api
  }
}