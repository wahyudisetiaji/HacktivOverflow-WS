<template>
    <div class="form">
    <div class="container">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    ></v-text-field>
                      <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    :counter="5" type="password"
                    label="Password"
                    required
                    ></v-text-field>
                    <v-btn
                    :disabled="!valid"
                    @click="submit"
                    >
                    Log In
                    </v-btn>
                    <v-btn @click="clear">clear</v-btn>
                </v-form>
            </div>
            <div class="col register">
    </div>
    </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    data: () => ({
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 5) || 'Password must be more than 5 characters'
      ],
    }),
    methods: {
       ...mapActions([
            'login'
        ]),
      submit () {
        if (this.$refs.form.validate()) {
            let data = {
              email: this.email,
              password: this.password
            }
            this.login(data)
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>
