<template>
        <div>
            <v-flex xs12>
                <v-card>
                        <div class="table">
                            <v-data-table
                                :headers="headers"
                                :items="this.myQuestions"
                                hide-actions
                                class="elevation-1"
                            >
                                <template slot="items" slot-scope="props">
                                <td>{{ props.item.title}}</td>
                                <td>{{ moment(props.item.createdAt).format("dddd, MMMM Do YYYY, h:mm") }} WIB</td>
                                <td>
                                <a class="item-link">
                                    <router-link class="edit" :to="`/myquestions/update/${props.item._id}`">Edit</router-link>
                                </a> ||
                                <a class="item-link" @click="remove(props.item._id)" href="#">Delete</a>
                                </td>
                                </template>
                            </v-data-table>
                        </div>
                </v-card>
            </v-flex>     
        </div>
</template>

<script>
import moment from "moment";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      headers: [
        {
          text: "Title",
          align: "center",
          sortable: false,
          value: "title"
        },
        { text: "Created At", sortable: false, align: "center", value: "date" },
        { text: "Actions", sortable: false, align: "center", value: "actions" }
      ]
    };
  },
  props: ["questionsprops"],
  computed: {
    ...mapState({
      myQuestions: "myQuestions"
    })
  },
  methods: {
    ...mapActions(["getMyQuestions", "deleteMyQuestions"]),
    moment: function(date) {
      return moment(date);
    },
    remove(data) {
      this.deleteMyQuestions(data)
    }
  },
  watch: {
    myQuestions: function() {
      this.getMyQuestions();
    }
  },
  mounted() {
    this.getMyQuestions();
  }
};
</script>

<style>
</style>
