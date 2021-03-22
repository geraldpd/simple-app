<template>
    <div>
        <AppHeader></AppHeader>
        <router-view></router-view>
        <AppFooter></AppFooter>
    </div>
</template>

<script>
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import Login from './auth/Login'

export default {
    components:{AppHeader, AppFooter, Login}
}
</script>

<style>

</style>