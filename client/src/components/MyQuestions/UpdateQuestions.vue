<template>
    <v-container grid-list-xs>
      <v-flex xs12>
          <v-card>
        <v-container grid-list-xs>
          
            <v-form ref="form" >
              <h2>Update Questions</h2>
              <v-text-field
                v-model="oneQuestions.title"
                label="Title"
                required
              ></v-text-field><br>
              <wysiwyg v-model="oneQuestions.questions" label="Questions"/>
              <v-btn class="btn" @click="update">
                Update
              </v-btn>
            </v-form>
        </v-container>
          </v-card>
      </v-flex>
    </v-container>  
</template>

<script>
  import axios from 'axios'
  import swal from 'sweetalert2'
  import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
       ...mapState({
            oneQuestions: 'oneQuestions'
        }),
    },
    methods: {
      ...mapActions([
        'getOneQuestions',
        'updateQuestions'
      ]),
      update () {
        this.updateQuestions(this.oneQuestions)
      }
    },
    mounted() {
      let id = this.$route.params.id
      this.getOneQuestions(id)
    }
  }
</script>

<style>
.btn {
  color:white;
  background-color: #00B746;
}
</style>
