var express = require('express');
var router = express.Router();
var isLogin = require('../middlewares/isLogin')
const QuestionsController = require('../controllers/questions-controller')

router.get('/', QuestionsController.getAllQuestions)
router.get('/me', QuestionsController.getMyQuestions)
router.get('/question/:id', QuestionsController.getOneQuestions)
router.post('/create', isLogin, QuestionsController.createQuestions)
router.put('/update/:id', isLogin, QuestionsController.updateMyQuestions)
router.put('/update/upvote/:id', isLogin, QuestionsController.upVote)
router.put('/update/downvote/:id', isLogin, QuestionsController.downVote)
router.put('/update/upvote/answer/:id', isLogin, QuestionsController.upvoteAnswer)
router.put('/update/downvote/answer/:id', isLogin, QuestionsController.downvoteAnswer)
router.put('/update/addanswer/:id', isLogin, QuestionsController.addAnswer)
router.delete('/delete/:id', isLogin, QuestionsController.deleteMyQuestions)

module.exports = router