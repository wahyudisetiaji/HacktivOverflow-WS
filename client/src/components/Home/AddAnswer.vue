<template>
     <v-card id="post-answer">
        <v-container grid-list-xs>
                <v-flex xs12>
                    <h2>Your Answer</h2><br>
                     <wysiwyg v-model="answer"/>  
                </v-flex>
                <v-flex offset-xs9>
                    <v-layout row wrap style="padding:10px">
                        <v-btn v-if="token" @click="addAnswer" class="button-answer">Add Answer</v-btn> 
                        <v-btn v-if="!token" :to="`/login`" class="button-answer">Please Login</v-btn>    
                    </v-layout>
                </v-flex>
        </v-container>
    </v-card>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'

export default {
    data() {
        return {
            answer: ''
        }
    },
    computed: {
        ...mapState({
            token: 'token',
            oneQuestions: 'oneQuestions'
        }),
    },
    methods: {
        ...mapActions([
            'getOneQuestions'
        ]),
        addAnswer() {
            let id = this.$route.params.id
            let token = localStorage.getItem('token')
            axios({
                method: 'PUT',
                url: `http://35.192.235.119/questions/update/addanswer/${id}`,
                headers: {
                    token
                },
                data: {
                    answer: this.answer
                }
            })
            .then((result) => {
                swal(result.data.message)
                this.answer = ''
                let id = this.$route.params.id
                this.getOneQuestions(id)
            })
            .catch((err) => {
                swal(err.message)
            })
        },
    },
    watch: {
       oneQuestions: function() {
           let id = this.$route.params.id
            this.getOneQuestions(id);
        }
    }
}
</script>

<style>
.button-answer {
    text-align: right;
    color: white;
    background-color: #00B746;
}
</style>
