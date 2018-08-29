<template>
    <v-container grid-list-xs>
      <v-layout row wrap>
        <v-layout class="card-layout">
        <v-flex xs12 >
          <v-card class="card" >
            <v-card-text primary-title>
              <h4 class="headline text-sm-left font-weight-bold">{{oneQuestions.title}}</h4> 
               <br>
                <div id="content" v-html="oneQuestions.questions"></div>
               <br>
                <p class="caption text-sm-right font-italic font-weight-light">Questions from {{oneQuestions.userId.name}}</p> 
                <p class="caption text-sm-right font-italic font-weight-light"> {{ moment(oneQuestions.createdAt).format("dddd, MMMM Do YYYY, h:mm") }} WIB</p>
                <p class="title text-sm-center font-bold" style="color:#00B746">
                    Upvote : {{oneQuestions.upvote.length}} / Downvote: {{oneQuestions.downvote.length}}
                </p>
                    <v-btn v-if="token" class="text-sm-right" @click="upvote"><i class="fa fa-thumbs-o-up" style="font-size:30px;color:#00B746"></i></v-btn>
                    <v-btn v-if="token" class="text-sm-right" @click="downvote"><i class="fa fa-thumbs-o-down" style="font-size:30px;color:#00B746"></i></v-btn>
            </v-card-text>
            <v-card-text class="explore-btn">
              <router-view/> 
            </v-card-text>
          </v-card>
        </v-flex>
       </v-layout>
      </v-layout>
      <v-layout row wrap>
        <v-layout row wrap>
            <v-layout class="card-layout">
                <v-flex xs12 >
                    <AllAnswer></AllAnswer>
                </v-flex>
            </v-layout>
        </v-layout>
      </v-layout>
    </v-container>
</template>

<script>
import AllAnswer from '@/components/Home/AllAnswer.vue'
import {mapState, mapActions} from 'vuex'
import moment from 'moment'
import axios from 'axios'
import swal from 'sweetalert2'

export default {
    components: {
      AllAnswer
    },
        computed: {
        ...mapState({
            oneQuestions: 'oneQuestions',
            token: 'token',
        }),
    },
    methods: {
        ...mapActions([
            'getOneQuestions',
        ]),
        moment: function (date) {
            return moment(date);
        },
        upvote () {
            let id = this.$route.params.id
            let token = localStorage.getItem('token')
            axios({
                method: 'PUT',
                url: `http://localhost:3000/questions/update/upvote/${id}`,
                headers: {
                    token
                }
            })
            .then((result) => {
                swal(result.data.message)
            })
            .catch((err) => {
                swal(err.message)
            });
        },
        downvote () {
            let id = this.$route.params.id
            let token = localStorage.getItem('token')
            axios({
                method: 'PUT',
                url: `http://localhost:3000/questions/update/downvote/${id}`,
                headers: {
                    token
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

</style>
