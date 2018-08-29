<template>
<div>
      <v-layout row wrap>
        <v-layout class="card-layout">
        <v-flex xs12 >
          <v-card class="card" v-for="(data, index) in oneQuestions.answer" :key='index'>
            <v-card-text primary-title>
                <div id="content" v-html="data.answer"></div>
               <br>
                <p class="caption text-sm-right font-italic font-weight-light">Answer from {{data.name}}</p> 
                <p class="title text-sm-left font-bold" style="color:#00B746">
                    Upvote : {{data.upvote.length}} / Downvote: {{data.downvote.length}}
                </p>
                <p class="caption text-sm-right font-italic font-weight-light">
                    <v-btn v-if="token" class="text-sm-right" @click="upvote(data)"><i class="fa fa-thumbs-o-up" style="font-size:30px;color:#00B746"></i></v-btn>
                    <v-btn v-if="token" class="text-sm-right" @click="downvote(data)"><i class="fa fa-thumbs-o-down" style="font-size:30px;color:#00B746"></i></v-btn>
                </p>
            </v-card-text>
            <v-card-text class="explore-btn">
            </v-card-text>
          </v-card>
        </v-flex>
       </v-layout>
      </v-layout>
</div>
</template>

<script>
import ModalEditAnswer from '@/components/Home/ModalEditAnswer.vue'
import {mapState, mapActions} from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'

export default {
    data: () => ({
      dialog: false
    }),
    computed: {
        ...mapState({
            oneQuestions: 'oneQuestions',
            token: 'token'
        })
    },
    methods: {
        ...mapActions([
            'getOneQuestions',
        ]),
        upvote (dataAnswer) {
            let id = this.$route.params.id
            let token = localStorage.getItem('token')
            axios({
                method: 'PUT',
                url:  `http://localhost:3000/questions/update/upvote/answer/${id}`,
                headers: {
                    token
                },
                data: {
                     dataAnswer
                }
            })
            .then((result) => {
                swal(result.data.message)
            })
            .catch((err) => {
                swal(err.message)
            });
        },
        downvote(dataAnswer) {
            let id = this.$route.params.id
            let token = localStorage.getItem('token')
            axios({
                method: 'PUT',
                url:  `http://localhost:3000/questions/update/downvote/answer/${id}`,
                headers: {
                    token
                },
                 data: {
                     dataAnswer
                }
            })
            .then((result) => {
                swal(result.data.message)
            })
            .catch((err) => {
                swal(err.message)
            });
        }
    },
    created () {
        let id = this.$route.params.id
        this.getOneQuestions(id)
    }
}
</script>

<style>
.button-modal {
  color:white;
  background-color: #00B746;
}
.edit-answer {
    background-color: white;
}
</style>
