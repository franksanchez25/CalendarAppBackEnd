const { response } = require('express');
const bcrypt = require('bcryptjs');
const User  = require('../models/User');
const {generateJWT} = require('../helpers/jwt');

const createUser = async (req,res = response)=>{

        const {email, password} = req.body
        
        try {

            let user = await User.findOne({ email });

            if ( user ) {
                return res.status(400).json({
                    ok:false,
                    msg: 'Account already exists'
                });
            }

            user = new User( req.body );

            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync( password, salt);

        
            await user.save();      
        
            const token = await generateJWT(user.id, user.name); 

            res.status(201).json({
                ok:true,
                uid: user.id,
                name: user.name,
                token
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok:false,
                msg: 'error'
            })
        }

}


const userLogin = async (req,res = response)=>{

    const {email, password} = req.body;


        const user = await User.findOne({ email });

            if ( !user ) {
                return res.status(400).json({
                    ok:false,
                    msg: 'User not exists with email'
                });
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({
                    ok:false,
                    msg: 'Incorrect email or password. Please try again'
                })
            }

            const token = await generateJWT(user.id, user.name);

            res.json({
                ok:true,
                uid:user.id,
                name:user.name,
                token
            })

           

   
}

const renewToken = async (req,res = response)=>{

   const {uid, name } = req;

 const token = await generateJWT(uid, name);

    res.json({
        ok:true,
        token
    })
}

module.exports = {
    createUser,
    userLogin,
    renewToken
}