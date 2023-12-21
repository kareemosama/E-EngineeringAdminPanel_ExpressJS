var Userdb = require('../../Model/user/userdb')
const validation = require('../../Controller/user/UserValidation');

exports.create = async(user)=>{
    
    const existUser = await Userdb.findOne({username: user.username})

    return new Promise((res,rej)=>{

        //validate user data information
        
        //console.log(JSON.stringify(user.username))
        const error = validation.UserCreateValidation(user)
        if (error.error) return rej(error.error.details[0].message) 
        
        //check if user already exist
        // if(userexist!=null) {
        //     rej({err:"User exist"})
        // }

        const adduser = new Userdb({
            name:   user.name,
            username : user.username,
            password : user.password,
            position : user.position,
            dateOfBirth : user.dateOfBirth,
            role: user.role 
        }) 

        adduser.save(adduser).then(data=>{
            //console.log("IN"+data)
            res(data)
        }).catch(err=>{
           // console.log("OUT"+err)
            rej(err)
        })
    })


   
}

exports.find = async(id)=>{



    return  new  Promise ((res,rej)=>{

        if(id){
            Userdb.findById(id).then(data=>{
                return res(data);
            }).catch(err=>{
                //return rej(err|| `Cant find user with id ${id}`);
                return rej(`Cant find user with id ${id}`+err);
            })
        }else{
            Userdb.find().then(data=>{
             return res(data);
        }).catch(err=>{
            return rej(err);
        })
        }
    })

    // if(id){
    //    return await Userdb.find(id)
    // }else{
    //    return await Userdb.find()
    // }

}

exports.update = async(id,user)=>{

    return new Promise ((res,rej)=>{

        const {error} = validation.UserUpdateValidation(user)
        if (error) return rej(error.details[0].message) ; 

        Userdb.findByIdAndUpdate(id,user,{useFindAndModify:false}).then(data=>{
            res(data);
        }).catch(err=>{
            rej(err);
        })

    })
}

exports.delete = async(id)=>{

    return new Promise ((res,rej)=>{
        
        Userdb.findByIdAndDelete(id).then(data=>{
            res(data)
        }).catch(err=>{
            rej(err)
        })
     })
}