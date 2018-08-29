<template>
    <v-container grid-list-xs>
      <v-flex xs12>
        <v-card>
        <v-container grid-list-xs>
          
            <v-form ref="form" v-model="valid" lazy-validation>
              <h2>Create Questions</h2>
              <v-text-field
                v-model="title"
                :rules="titleRules"
                label="Title"
                required
              ></v-text-field><br>
              <wysiwyg v-model="questions" :rules="questionsRules" label="Questions"/>
              <v-btn class="btn"
                :disabled="!valid"
                @click="submit"
              >
                submit
              </v-btn>
              <v-btn class="btn" @click="clear">clear</v-btn>
            </v-form>
        </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12>
          <MyQuestions :questionsprops="dataQuestions"></MyQuestions>
      </v-flex>
    </v-container>  
</template>

<script>
  import axios from 'axios'
  import MyQuestions from '@/components/MyQuestions/MyQuestions.vue'
  import swal from 'sweetalert2'

  export default {
    data: () => ({
      dialog: false,
      valid: true,
      title: '',
      titleRules: [
        v => !!v || 'Title is required',
      ],
      questions: '',
      questionsRules: [
        v => !!v || 'Questions is required',
      ],
      dataQuestions: ''
    }),
    methods: {
      submit () {
        let token = localStorage.getItem('token')
          axios({
            method: 'POST',
            url: `http://35.192.235.119/questions/create`,
            headers: {
              token
            },
            data: {
              title: this.title,
              questions: this.questions 
            }
          })
          .then((result) => {
            swal('Create questions success!')
            this.title = ''
            this.questions = ''
            this.dataQuestions = result
          })
          .catch((err) => {
            swal(err.message)
          });
      },
      clear () {
         this.title = ''
         this.questions = ''
      }
    },
    components: {
      MyQuestions
    }
  }
</script>

<style>
.btn {
  color:white;
  background-color: #00B746;
}
</style>
