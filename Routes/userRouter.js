const userRouter = require('express').Router()
const { login , register, verifyUser, addCategory, getGraphData, addIncome } = require('../Controllers/userController')
const { veriftyUserToken } = require('../Middlewares/Auth')



userRouter.get('/is-user-auth' , veriftyUserToken , verifyUser)
userRouter.post('/login' , login)
userRouter.post('/register', register)
userRouter.post('/add-category' , veriftyUserToken , addCategory)
userRouter.post('/add-income' , veriftyUserToken , addIncome)
userRouter.get('/get-graph-data' , veriftyUserToken , getGraphData)

module.exports = userRouter
