const express = require('express')
const User = require('../models/user')
const Comment = require('../models/comment') // or const { Comment } = require('../models')

const router = express.Router()

router.route('/')
    .get(async (req,res,next) => {
        try {
            const users = await User.findAll({})
            res.json(users)
        } catch (err) {
            console.error(err)
            next(err)
        }
    })
    .post(async (req,res,next) => {
        try {
            const user = User.create({
                name:req.body.name,
                age:req.body.age,
                married:req.body.married
            })
            console.log(user)
            res.status(201).send(user)
        } catch (err) {
            console.error(err)
            next(err)
        }
    })


router.get('/:id/comments', async (req,res,next) => {
    try {
        const comments = await Comment.findAll({
            // relation, User id 를 이용하여 comment 엔티티를 조회
            include: {
                model: User,
                where: { id : req.params.id }

            }
        })
        console.log(comments)
        res.json(comments)
    } catch (err) {
        console.error(err)
        next(err)
    }
})

module.exports = router