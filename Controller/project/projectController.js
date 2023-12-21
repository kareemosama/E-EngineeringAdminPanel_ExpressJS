var projectdb = require('../../Model/project/projectdb')


exports.CreateProject=async(req,res)=>{


    var projectExist = await projectdb.findOne({projectName : req.body.projectName})

    if(projectExist){
        res.status(404).send({err: "project exist"})
    }

    var addProject = new projectdb({
        projectName: req.body.projectName,
        description: req.body.description,
        status: req.body.status,
        user: req.body.user
    })

    addProject.save(addProject).then(data=>{
        res.status(200).send({message:"User Added successfully 😊 👌",data:data})
    }).catch(err=>{
        res.status(404).send({message:"User didnt ",err:err})
    })

}