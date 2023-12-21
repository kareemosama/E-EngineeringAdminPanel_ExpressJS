const { json } = require('body-parser')
var User = require('../../Repository/user/userRepository')
const axios = require('axios')


exports.create = async(req,res)=>{ 

   
     
     await User.create(req.body).then(data=>{

       // console.log("hneaa"+data)
        req.flash('success', "User added successfully");
        res.redirect('/createUser')
     }).catch(err=>{

       
        req.flash('error', err);
        res.redirect('/createUser')
     })
   
    
}

exports.find = async(req,res)=>{

    if(req.query.id){
        
        await User.find(req.query.id).then(data=>{
            // Calculate agee
            // var diff_ms = Date.now() - data.dateOfBirth.getTime();
            // var age_dt = new Date(diff_ms); 
            // data.age = Math.abs(age_dt.getUTCFullYear() - 1970)
            
            res.status(200).send(data)
       }).catch(err=>{
            //res.status(404).json(err.message || "error occure");
            res.status(500).send({err: err});
       })
       
    }else{
       await User.find().then(data=>{
            res.status(200).send(data)
       }).catch(err=>{
            res.status(404).send({err: err});
       })
       
    }

}

exports.update = async(req,res)=>{

   
    await User.update(req.params.id,req.body).then(data=>{

       // var id = JSON.stringify(data._id).replace(/"/g,"")
        req.flash('success', "User updated successfully");
        res.redirect(`/updateUser?id=${req.params.id}`)

        //res.status(200).send({ message: "User Updated successfully 😊 👌" + data});
    }).catch(err=>{
        req.flash('error', err);
        res.redirect(`/updateUser?id=${req.params.id}`)
        //res.status(404).send({err: err})
    })
}

exports.delete = async(req,res)=>{

    //I have to validate first here after sending to function
    
    await User.delete(req.params.id).then(data=>{
        res.status(200).send({ message: "User Deleted successfully 😊 👌" + data});
    }).catch(err=>{
        res.status(404).send({err: err})
    })
}




exports.getUsers = async (req,res)=>{

    axios.get('http://localhost:5001/api/users')
        .then(response =>{
            res.render('user/users',{users : response.data,role :req.userRole})
        })
        .catch(err=>{
            res.send(err)
        })
}


exports.updateUser = async (req,res)=>{

    axios.get('http://localhost:5001/api/users',{params:{id:req.query.id}})
        .then(response =>{
            res.render('user/update',{user : response.data, success : req.flash('success'),error:req.flash('error')})
        })
        .catch(err=>{
            res.send(err)
        })
}

exports.getUserDetails =async (req,res)=>{

    axios.get('http://localhost:5001/api/users',{params:{id:req.userId}})
        .then(response =>{
            res.render('user/update',{user : response.data, success : req.flash('success'),error:req.flash('error')})
        })
        .catch(err=>{
            res.send(err)
        })
}



