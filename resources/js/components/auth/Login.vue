<template>
    <v-container>
        <form @submit.prevent="login">
            <h1>Login</h1>

            <v-text-field
            v-model="form.email"
            label="E-mail"
            type="email"
            required
            ></v-text-field>

            <v-text-field
            v-model="form.password"
            label="password"
            type="password"
            required
            ></v-text-field>

            <v-btn
            class="mr-4"
            type="submit"
            >
            Login
            </v-btn>

        </form>
    </v-container>
</template>


<script>
export default {
    data() {
        return {
            form: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        login(){
            User.login(this.form)
        }
    }
}
</script>

<style>

</style>