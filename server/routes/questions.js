var express = require('express');
var router = express.Router();
const QuestionsController = require('../controllers/questions-controller')

router.get('/', QuestionsController.getAllQuestions)
router.get('/me', QuestionsController.getMyQuestions)
router.get('/question/:id', QuestionsController.getOneQuestions)
router.post('/create', QuestionsController.createQuestions)
router.put('/update/:id', QuestionsController.updateMyQuestions)
router.put('/update/upvote/:id', QuestionsController.upVote)
router.put('/update/downvote/:id', QuestionsController.downVote)
router.put('/update/upvote/answer/:id', QuestionsController.upvoteAnswer)
router.put('/update/downvote/answer/:id', QuestionsController.downvoteAnswer)
router.put('/update/addanswer/:id', QuestionsController.addAnswer)
router.delete('/delete/:id', QuestionsController.deleteMyQuestions)

module.exports = router