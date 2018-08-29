import Vue from 'vue'
import Vuex from 'vuex'
import swal from 'sweetalert2'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    myQuestions: '',
    oneQuestions: '',
    allQuestions: '',
    dataForWatch: '',
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setMyQuestions(state, payload) {
      state.myQuestions = payload
    },
    setOneQuestions(state, payload) {
      state.oneQuestions = payload
    },
    setAllQuestions(state, payload) {
      state.allQuestions = payload
    },
    setForWatch(state, payload) {
      state.dataForWatch = payload
    },
  },
  actions: {

    logout(context) {
      context.commit('setToken', '') 
      localStorage.clear()
    },

    login (context, data) {
        axios.post(`http://localhost:3000/users/login`, data)
        .then((result) => {
          localStorage.setItem('token', result.data.data.token) 
          swal(`Hai ${result.data.data.name}, Your has been login!`)
          let datatoken = result.data.data.token
          context.commit('setToken', datatoken) 
          router.push('/')
        })
        .catch((err) => {
          swal(err.message)
        });
      },

    register (context, data) {
      axios.post(`http://localhost:3000/users/register`, data)
      .then((result) => {
        swal(`Hai ${result.data.data.name}, Register success, You must be login!`)
        router.push('/login')
      })
      .catch((err) => {
        swal(err.message)
      });
    },


    getMyQuestions (context) {
      let token = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: `http://localhost:3000/questions/me`,
        headers: {
          token
        }
      })
      .then((result) => {
        let data = result.data.result    
        context.commit('setMyQuestions', data)
      })
      .catch((err) => {
        swal(err.message)
      });
    },


    deleteMyQuestions (context, id) {
      let token = localStorage.getItem('token')
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/questions/delete/${id}`,
        headers: {
          token 
        }
      })
      .then(() => {
        swal('Questions has been created!')
      })
      .catch((err) => {
        swal(err.message)
      });
    },


    getOneQuestions (context, id) {
      let token = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: `http://localhost:3000/questions/question/${id}`,
        headers: {
          token
        }
      })
      .then((result) => {
        let data = result.data.result[0]
        context.commit('setOneQuestions', data) 
      })
      .catch((err) => {
        swal(err.message)
      });
    },

    updateQuestions (context, question) {
      let token = localStorage.getItem('token')
      axios({
        method: 'PUT',
        url: `http://localhost:3000/questions/update/${question._id}`,
        headers: {
          token
        },
        data: {
          title: question.title,
          questions: question.questions
        }
      })
      .then(() => {
        swal('Questions has been updated!')
        router.push('/myquestions')
      })
      .catch((err) => {
        swal(err.message)
      });
    },

    getAllQuestions (context) {
      let token = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: `http://localhost:3000/questions`,
        headers: {
          token
        }
      })
      .then((result) => {
        let data = result.data.result
        context.commit('setAllQuestions', data)  
      })
      .catch((err) => {
        swal(err.message)
      });
    }
  }
})
