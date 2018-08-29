<template>
    <v-container grid-list-xs>
      <v-layout row wrap v-for="(data, index) in allQuestions" :key='index'>
        <v-layout class="card-layout">
        <v-flex xs12 >
          <v-card class="card" >
            <v-card-text primary-title>
              <h4 class="headline text-sm-left font-weight-bold">{{data.title}}</h4> 
               <br>
                <div id="content" v-html="data.questions"></div>
               <br>
              <p class="date caption text-sm-right font-italic font-weight-light">Question from {{data.userId.name}}</p>
              <p class="date caption text-sm-right font-italic font-weight-light">{{ moment(data.createdAt).format("dddd, MMMM Do YYYY, h:mm") }} WIB</p>
              <v-flex xs1>
                <v-btn :to="`/home/questions/${data._id}`" class="button-detail">Detail</v-btn>
              </v-flex> 
            </v-card-text>
          </v-card>
        </v-flex>
       </v-layout>
      </v-layout>
    </v-container>
</template>

<script>
  import moment from 'moment'
  import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
        ...mapState({
            allQuestions: 'allQuestions',
        }),
    },
    methods: {
        ...mapActions([
            'getAllQuestions',
        ]),
         moment: function (date) {
            return moment(date);
        },
    },
    created () {
        this.getAllQuestions()
    }
  }
</script>

<style>
.button-detail {
  color:white;
  background-color: #00B746;
}

.card-layout {
  padding: 10px;
}
</style>
