const User = require('../Models/User')
const Group = require('../Models/Group')

module.exports = {
    getGroupUsers : (groupId)=>{
        return new Promise( async (resolve,reject)=>{
            Group.findById(groupId)
            .then((group)=>{
                console.log(group)
                User.find({ _id:{ $in :group.members } } ).select(['-pass','-email','-phone','-terms'])
                .then((res)=>{
                    console.log(res)
                    resolve(res)
                }).catch((err)=>{
                    reject(err)
                })
            }).catch((err)=>{
                reject(err)
            })
        })
    }
}