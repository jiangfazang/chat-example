<template>
  <div :class="['TUIKit', isH5 && 'TUIKit-h5']">
    <!-- <div v-if="!(isH5 && currentConversationID)" class="TUIKit-navbar">
      <div
        v-for="item of navbarList"
        :key="item.id"
        :class="['TUIKit-navbar-item', currentNavbar === item.id && 'TUIKit-navbar-item-active']"
        @click="currentNavbar = item.id"
      >
        {{ item.label }}
      </div>
    </div> -->
    <div class="TUIKit-main-container">
      <div v-if="currentNavbar === 'conversation'" class="TUIKit-main">
        <div v-if="!(isH5 && currentConversationID)" class="TUIKit-main-aside">
          <TUISearch searchType="global"></TUISearch>
          <TUIConversation></TUIConversation>
        </div>
        <div v-if="!isH5 || currentConversationID" class="TUIKit-main-main">
          <TUIChat>
            <h1>欢迎使用腾讯云即时通信IM</h1>
          </TUIChat>
          <TUIGroup :class="isH5 ? 'chat-popup' : 'chat-aside'" />
          <TUISearch :class="isH5 ? 'chat-popup' : 'chat-aside'" searchType="conversation" />
        </div>
        <TUIGroup v-if="isH5 && !currentConversationID" class="chat-popup" />
        <TUIContact displayType="selectFriend" />
      </div>
      <div v-else-if="currentNavbar === 'contact'" class="TUIKit-main">
        <TUIContact
          displayType="contactList"
          @switchConversation="currentNavbar = 'conversation'"
        />
      </div>
      <TUICallKit class="callkit-container" :allowedMinimized="true" :allowedFullScreen="false" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { TUIStore, StoreName } from "@tencentcloud/chat-uikit-engine";
import { TUICallKit } from "@tencentcloud/call-uikit-vue2.6";
import { TUISearch, TUIConversation, TUIChat, TUIContact, TUIGroup } from "./TUIKit";
import { isH5 } from "./TUIKit/utils/env";
export default Vue.extend({
  name: "App",
  components: {
    TUISearch,
    TUIGroup,
    TUIConversation,
    TUIChat,
    TUIContact,
    TUICallKit,
  },
  data() {
    return {
      isH5: isH5,
      currentConversationID: "",
      currentNavbar: "conversation",
      navbarList: [
        {
          id: "conversation",
          label: "会话",
        },
        {
          id: "contact",
          label: "通讯录",
        },
      ],
    };
  },
  mounted: function () {
    TUIStore.watch(StoreName.CONV, {
      currentConversationID: (id: string) => {
        this.currentConversationID = id;
      },
    });
  },
});
</script>
<style scoped lang="scss">
@import "./TUIKit/assets/styles/common.scss";
@import "./TUIKit/assets/styles/sample.scss";
</style>