<template>
    <v-container>
        <form @submit.prevent="login">
            <h1>Login</h1>

            <span class="red--text" v-if="hasError">Account does not exist in our database</span>

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
            minlength=6
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
            },
            hasError: false
        }
    },

    created(){
      if(User.loggedIn()) {
          this.$router.push({name: 'customer'});
      }
    },

    methods: {
        login(){
            User.login(this.form, _ => {
                this.hasError = true;
            })
        }
    }
}
</script>

<style>

</style>