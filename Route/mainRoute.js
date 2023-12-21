const express = require('express')
const router = express.Router()
const Login_services = require('../Service/signServices')
const Project = require('../Controller/project/projectController')

router.get('', async(req,res)=>{
    res.render('login',{success:req.message,error:req.message})
})

router.get('/main',Login_services.verifyToken,async(req,res)=>{
    res.render('main')
})

router.post('/api/login',Login_services.login)



router.post('/api/createProject',Project.CreateProject)


module.exports=router