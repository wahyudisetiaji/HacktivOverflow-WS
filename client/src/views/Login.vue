<template>
    <div class="login">
        <WelcomeLogin></WelcomeLogin>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs6>
                    <v-container grid-list-md>
                    <h2>Log In</h2>
                    <FormLogin></FormLogin> 
                    <h3><span><hr></span>Or <span><hr></span></h3><br>
                    <fb:login-button scope="public_profile,email" onlogin="checkLoginState();" style="text-align: center">Login with Facebook</fb:login-button>
                    </v-container>
                </v-flex>
                <v-flex xs6>
                    <v-container grid-list-xs>
                    <h2>Register</h2>
                    <FormRegister></FormRegister>
                    </v-container>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import FormLogin from '@/components/Login/FormLogin.vue'
import FormRegister from '@/components/Login/FormRegister.vue'
import WelcomeLogin from '@/components/Login/WelcomeLogin.vue'

export default {
  name: 'login',
  components: {
    FormLogin,
    FormRegister,
    WelcomeLogin
  },
  methods: {
      checkLoginState() {
        FB.getLoginStatus(function(response) {
          if (response.status == "connected") {
            axios
              .post(
                "http://35.192.235.119/users/loginFacebook",
                response.authResponse
              )
              .then(result => {
                localStorage.setItem("token", result.data.token);
                window.location="http://localhost:8080/dashboard.html"
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      }
    
    }
  }

window.fbAsyncInit = function() {
  FB.init({
    appId: "1862928357347154",
    autoLogAppEvents: true,
    xfbml: true,
    version: "v3.1"
  });
};

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk")

</script>
