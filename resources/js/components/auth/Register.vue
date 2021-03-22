<template>
    <v-container>
        <form @submit.prevent="register">
            <v-text-field
            v-model="form.name"
            label="Name"
            type="text"
            required
            ></v-text-field>
            <span class="red--text" v-if="errors.name">{{ errors.name[0] }}</span>

            <v-text-field
            v-model="form.email"
            label="E-mail"
            type="email"
            required
            ></v-text-field>
            <span class="red--text" v-if="errors.email">{{ errors.email[0] }}</span>

            <v-text-field
            v-model="form.password"
            label="password"
            type="password"
            required
            ></v-text-field>
            <span class="red--text" v-if="errors.password">{{ errors.password[0] }}</span>

            <v-text-field
            v-model="form.password_confirmation"
            label="confirm password"
            type="password"
            required
            ></v-text-field>
            <span class="red--text" v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</span>

            <v-btn
            class="mr-4"
            type="submit"
            >
            Register
            </v-btn>

        </form>
    </v-container>
</template>


<script>
export default {
    data() {
        return {
            form: {
                name: null,
                email: null,
                password: null
            },
            errors: {}
        }
    },
    created(){
      if(User.loggedIn()) {
          //this.$router.push({name: 'forum'});
      }
    },
    methods: {
        register(){
            axios.post('api/auth/register', this.form)
            .then(res => {
              User.responseAfterLogin(res)
              this.$router.push({name: 'customer'})
            })
            .catch(res => this.errors = res.response.data.errors);
        }
    }
}
</script>

<style>

</style>