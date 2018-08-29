<template>
    <div class="navbar">
        <v-toolbar>
        <v-toolbar-title>HacktivOverflow<img class="logo-ws" alt="ws logo" src="../assets/logo-ws.png"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down button-navbar">
            <v-btn to="/" flat>Home</v-btn>
            <v-btn v-if="token" to="/myquestions" flat>My Questions</v-btn>
            <v-btn v-if="!token" to="/login" flat>Log In</v-btn>
            <v-btn v-if="token" @click="logoutWeb" flat>Log Out</v-btn>
        </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>
import swal from 'sweetalert2'
import {mapState, mapActions} from 'vuex'

export default {
    computed: {
        ...mapState({
            token: 'token',
        }),
    
    },
    methods: {
        ...mapActions([
            'logout'
        ]),
        logoutWeb() {
            let token = localStorage.getItem('token')
            this.logout()
        }
    }
}
</script>

<style>
.logo-ws{
    width: 15%;
}

.navbar a {
    color:#293D52;
}

</style>
