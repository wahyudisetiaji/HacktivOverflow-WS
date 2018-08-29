import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import HomeQuestions from '@/components/Home/HomeQuestions.vue'
import DetailQuestions from '@/components/Home/DetailQuestions.vue'
import AddAnswer from '@/components/Home/AddAnswer.vue'
import MyQuestions from '@/views/MyQuestions.vue'
import CreateQuestions from '@/components/MyQuestions/CreateQuestions.vue'
import UpdateQuestions from '@/components/MyQuestions/UpdateQuestions.vue'

Vue.use(Router)

export default new Router({

  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'homequestions',
          component: HomeQuestions
        },
        {
          path: '/home/questions/:id',
          name: 'detailquestions',
          component: DetailQuestions,
          children: [
            {
              path: '/',
              name: 'addanswer',
              component: AddAnswer
            }
          ]
        }
      ]
    },
    {
      path: '/myquestions',
      name: 'myquestions',
      component: MyQuestions,
      children: [
        {
          path: '/myquestions',
          name: 'createquestions',
          component: CreateQuestions
        },
        {
          path: '/myquestions/update/:id',
          name: 'updatequestions',
          component: UpdateQuestions
        }
      ]
    },
  ]
})
