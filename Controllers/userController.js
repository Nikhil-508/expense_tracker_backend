const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../Models/User')
const CategoryModel = require('../Models/categories')
const IncomeModel = require('../Models/Income')
const ExpenseModel = require('../Models/Expense')


const verifyUser = async (req, res, next) => {
    try {
        const userId = req?.userId
        const member = UserModel.findOne({ _id: userId })
        if (member) {
            res.status(200).json({ message: "Verified user from server side", isUser: true })
        } else {
            res.status(401).json({ message: "Failed user authentication at database" })
        }

    } catch (err) {
        next(err)
    }
}


const register = async (req,res) => {
    try {
        const {name,email,password} = req.body
        const user = await UserModel.findOne({email});
        console.log("USERRRR" , user)
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({name,email,password})
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save()
        res.status(200)
        .json({
            message: "Signup successfully",
            success: true
        })
    } catch (error) {
        res.status(500)
        .json({
            message: "Internal server errror",
            success: false
        })
    }
}

const login = async (req , res , next) => {
    try {
        const {email,password} = req.body
        const user = await UserModel.findOne({email : email})
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
            throw new Error(errorMsg)
        }
        const isValidUser = await bcrypt.compare(password,user.password)
        if(!isValidUser){
            return res.status(403).json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            {name:user?.name,userId:user?._id},
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        return res.status(200).json({message: "Login Success",success: true,jwtToken,email: user.email})
    } catch (error) {
        res.status(500).json({
            message: "Internal server errror",
            success: false
        })
    }
}

const addIncome = async(req, res, next) => {
    try {
        const {amount, description, category} =req?.body
        const userId = req?.userId
userRouter.post('/add-category' , veriftyUserToken , addCategory)
        const income = await IncomeModel.find({amount : amount, description : description , category : category, userId : userId})
        if(income.length > 0){
            return res.status(200).json({message: "Income already exist",success: false})
        }else{
            const incomeModel = new IncomeModel({
                amount : amount,
                description : description,
                category : category,
            
            })
            const result = await incomeModel.save()
            if(result){
                return res.status(200).json({success : true , message : "Income added successfully"})
            }
        }
    } catch (error) {
        console.error(error)
        
    }
}

const addCategory = async (req , res , next) => {
    try {
        const {name , isIncome , description , budgetLimit} = req?.body
        const userId = req?.userId
        const category = await CategoryModel.find({name : name , userId : userId , isIncome : isIncome})
        if(category.length > 0) {
            return res.status(200).json({success : false , message : "Category already exists"})
        } else {
            const catModel = new CategoryModel({
                name : name,
                userId : userId,
                isIncome : isIncome,
                description : description,
                budgetLimit : budgetLimit
            })
            const result = await catModel.save()
            if(result){
                return res.status(200).json({success : true , message : "Category added successfully"})
            }
        }

    } catch (error) {
        console.error(error)
    }
}

const getAllCategories = async (req , res , next) => {
    try {
        const {isIncome} = req.body
        const catData = await CategoryModel.find({userId , isIncome})
    } catch (error) {
        
    }
}

const getGraphData = async (req ,res , next) => {
    const incomeData = await IncomeModel.find({userId : userId , isIncome : true})
    const incomeNumber = incomeData.reduce((prev))
    const expenseData = await ExpenseModel.find({userId : userId , isIncome : false})
    const expenseNumber = incomeData.reduce((prev))
    res.json({incomeNumber : incomeNumber , expenseNumber : expenseNumber})
    

}



module.exports = {
    login,
    register,
    verifyUser,
    addCategory,
    getGraphData,
    addIncome
}