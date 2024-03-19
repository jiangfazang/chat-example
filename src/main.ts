import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import './main.css'

import { TUIComponents, TUIChatKit, genTestUserSig } from "./TUIKit";
import { TUILogin } from "@tencentcloud/tui-core";

import VueCompositionAPI from "@vue/composition-api";
Vue.use(VueCompositionAPI);

const SDKAppID = 1600027725; // Your SDKAppID
const secretKey = "843f5e892714d6fa1fcbb796a807829d84f23fd0eeef3d564c946e7d2048f6e3"; //Your secretKey
const userID = "9527"; // User ID

// TUIChatKit add TUIComponents
TUIChatKit.components(TUIComponents, Vue);
// TUIChatKit init
TUIChatKit.init();
// TUICore login
TUILogin.login({
  SDKAppID,
  userID,
  // UserSig 是用户登录即时通信 IM 的密码，其本质是对 UserID 等信息加密后得到的密文。
  // 该方法仅适合本地跑通 Demo 和功能调试，详情请参见 https://cloud.tencent.com/document/product/269/32688
  userSig: genTestUserSig({
    SDKAppID,
    secretKey,
    userID,
  }).userSig,
  // 如果您需要发送图片、语音、视频、文件等富媒体消息，请设置为 true
  useUploadPlugin: true,
  // 本地审核可识别、处理不安全、不适宜的内容，为您的产品体验和业务安全保驾护航
  // 此功能为增值服务，请参考：https://cloud.tencent.com/document/product/269/79139
  // 如果您已购买内容审核服务，开启此功能请设置为 true
  useProfanityFilterPlugin: false,
  framework: "vue2",
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

export { SDKAppID, secretKey };
