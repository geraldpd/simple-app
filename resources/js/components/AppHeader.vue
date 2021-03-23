<template>
    <v-toolbar dense>
      <v-toolbar-title>SIMPLE APP</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">

          <v-btn
          v-for="item in items"
          v-if="item.show"
          :key="item.title"
          :to="item.to"
          text
          >
            {{item.title}}
          </v-btn>

      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {title:'customer', to:'/customer', show: User.loggedIn() },
        {title:'logout', to:'/logout', show: User.loggedIn() },
        {title:'login', to:'/login', show: !User.loggedIn() },
        {title:'register', to:'/register', show: !User.loggedIn() },
      ]
    }
  },
  created() {
    EventBus.$on('logout', _ => {
      User.logout()
    })
  }
}
</script>

<style>

</style>