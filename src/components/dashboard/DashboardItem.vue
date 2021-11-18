<template>
  <router-link
    class="drawer-item"
    :to="{
      name: item.routeName
    }"
  >
    <v-list-item>
      <v-list-item-icon class="item-icon">
        <v-icon color="drawerIcon" size="20">{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="text-content drawerText--text">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </router-link>
</template>

<script>
export default {
  name: "DashboardItem",
  props: { item: Object },
  computed: {},
  methods: {}
}
</script>

<style scoped lang="scss">
.drawer-item {
  text-decoration: none;

  .item-icon.v-list-item__icon {
    margin-right: 14px;
  }

  .text-content.v-list-item__title {
    font-size: 15px;
    white-space: nowrap;
    opacity: 1;
    flex: 1 1 0%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
  }
}
.drawer-item.router-link-active {
  .text-content.v-list-item__title {
    color: #fff !important;
  }
  .item-icon.v-list-item__icon {
    i::before {
      color: #fff !important;
    }
  }
}
</style>
