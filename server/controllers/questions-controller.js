const Questions = require('../models/questions')
const jwt = require('jsonwebtoken')

class QuestionsController {
    
    static createQuestions (req, res) {
        let token = req.headers.token 
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        Questions.create({
            title: req.body.title,
            questions: req.body.questions,
            userId: decode.id
        })
        .then((result) => {
            res.status(200).json({
                message: 'create questions success',
                result
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            });
        });
    }

    static getMyQuestions (req, res) {
        let token = req.headers.token
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        Questions.find({userId: decode.id})
        .then((result) => {
            res.status(200).json({
                message: 'my questions',
                result
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
    }

    static deleteMyQuestions (req, res) {
        let id = req.params.id
        Questions.deleteOne({_id: id})
        .then(() => {
            res.status(200).json({
              message: "questions successfully deleted"
            });
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            });
        });
    }

    static updateMyQuestions (req, res) {
        let id = req.params.id
        Questions.updateOne(
            { _id: id },
            {
                $set: {
                title: req.body.title,
                questions: req.body.questions,
                }
            }
        )
        .then(() => {
            res.status(200).json({
              message: "questions successfully deleted"
            });
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            });
        });
    }

    static getOneQuestions (req, res) {
        let id = req.params.id 
        Questions.find({_id: id})
        .populate('userId')
        .then((result) => {
            res.status(200).json({
                result
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
    }

    static getAllQuestions (req, res) {
        let id = req.params.id 
        Questions.find({})
        .populate('userId')
        .then((result) => {
            res.status(200).json({
                result
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
    }

    static upVote (req, res) {
        let id = req.params.id
        let token = req.headers.token
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
         Questions.find({_id: id})
         .then((result) => {
             if(result[0].userId == decode.id) {
                 res.status(200).json({
                    message: 'dilarang vote question sendiri!'
                 })
             }else{
                 let status = false
                 result[0].upvote.forEach(element => {
                     if(element.userId == decode.id) {
                         status = true
                     }
                 })
                 result[0].downvote.forEach(element => {
                    if(element.userId == decode.id) {
                        status = true
                    }
                })

                 if(status == false) {
                    Questions.updateOne(
                        {_id: id},
                        {$push: {
                            upvote: {userId: decode.id}
                        }}
                    )
                    .then((result) => {
                        res.status(200).json({
                            message: 'upvote berhasil!'
                         })
                    })
                    .catch((err) => {
                        res.status(400).json({
                            message: err.message
                        })
                    });
                 }else{
                    res.status(200).json({
                        message: 'sudah nge-vote!'
                     })
                 }  
             }
         })
         .catch((err) => {
             res.status(400).json({
                 message: err.message
             })
         })
    }

    static downVote (req, res) {
        let id = req.params.id
        let token = req.headers.token
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
         Questions.find({_id: id})
         .then((result) => {
             if(result[0].userId == decode.id) {
                 res.status(200).json({
                    message: 'dilarang vote question sendiri!'
                 })
             }else{
                 let status = false
                 result[0].downvote.forEach(element => {
                     if(element.userId == decode.id) {
                         status = true
                     }
                 })
                 result[0].upvote.forEach(element => {
                    if(element.userId == decode.id) {
                        status = true
                    }
                })

                 if(status == false) {
                    Questions.updateOne(
                        {_id: id},
                        {$push: {
                            downvote: {userId: decode.id}
                        }}
                    )
                    .then((result) => {
                        res.status(200).json({
                            message: 'downvote berhasil!'
                         })
                    })
                    .catch((err) => {
                        res.status(400).json({
                            message: err.message
                        })
                    });
                 }else{
                    res.status(200).json({
                        message: 'sudah nge-vote!'
                     })
                 }  
             }
         })
         .catch((err) => {
             res.status(400).json({
                 message: err.message
             })
         })
    }

    static addAnswer (req, res) {
        let id = req.params.id
        let token = req.headers.token
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        Questions.updateOne({_id: id},
            {$push: {
                    answer: {
                        answer: req.body.answer,
                        name: decode.name,

                    }}
            }
        )
        .then((result) => {
            res.status(200).json({
                message: 'add answer berhasil!'
             })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
    }

    static upvoteAnswer (req, res ) {
        let id = req.params.id 
        let token = req.headers.token
        let idAnswer = req.body.dataAnswer._id
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        Questions.find({_id: id})
        .then((result) => {   
                let status = false
                let dataTmpAnswer
                result[0].answer.forEach(element => {
                    if(element._id == idAnswer) {
                        dataTmpAnswer = element 
                    }
                })
                dataTmpAnswer.upvote.forEach(element => {
                    if(element.userId == decode.id) {
                        status = true
                    }
                })
                dataTmpAnswer.downvote.forEach(element => {
                    if(element.userId == decode.id) {
                        status = true
                    }
                })
                dataTmpAnswer.upvote.push({userId: decode.id})
                let allAnswer = result[0].answer
                allAnswer.forEach(element => {
                    if(element._id == idAnswer) {
                        element = dataTmpAnswer 
                    }
                    
                })

                if(status == false) {
                        Questions.updateOne(
                        {_id: id},
                        {$set: {
                            answer: allAnswer
                        }}
                    )
                    .then((result) => {
                        res.status(200).json({
                            message: 'upvote berhasil!'
                         })
                    })
                    .catch((err) => {
                        res.status(400).json({
                            message: err.message
                        })
                    });
                 }
                 else{
                    res.status(200).json({
                        message: 'sudah nge-vote!'
                     })
                 } 
            
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
            
        });
    }

    static downvoteAnswer (req, res ) {
        let id = req.params.id 
        let token = req.headers.token
        let idAnswer = req.body.dataAnswer._id
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        Questions.find({_id: id})
        .then((result) => {   
           
                let status = false
                let dataTmpAnswer
                result[0].answer.forEach(element => {
                    if(element._id == idAnswer) {
                        dataTmpAnswer = element 
                    }
                })
                dataTmpAnswer.downvote.forEach(element => {
                    if(element.userId == decode.id) {
                        status = true
                    }
                })
                dataTmpAnswer.upvote.forEach(element => {
                    if(element.userId == decode.id) {
                        status = true
                    }
                })
                dataTmpAnswer.downvote.push({userId: decode.id})
                let allAnswer = result[0].answer
                allAnswer.forEach(element => {
                    if(element._id == idAnswer) {
                        element = dataTmpAnswer 
                    }
                    
                })

                if(status == false) {
                        Questions.updateOne(
                        {_id: id},
                        {$set: {
                            answer: allAnswer
                        }}
                    )
                    .then((result) => {
                        res.status(200).json({
                            message: 'upvote berhasil!'
                         })
                    })
                    .catch((err) => {
                        res.status(400).json({
                            message: err.message
                        })
                    });
                 }
                 else{
                    res.status(200).json({
                        message: 'sudah nge-vote!'
                     })
                 } 
            
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
            
        });
    }

}

module.exports = QuestionsController