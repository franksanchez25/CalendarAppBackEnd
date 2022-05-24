
const { response } = require('express');
const jwt = require('jsonwebtoken');


    const jwtValidator = (req, res = response, next)=>{
        const token = req.header('x-token');


        if( !token){
            return res.status(401).json({
                ok:false,
                msg:'No token in the request'
            });
        }

        try {

            const {uid, name} = jwt.verify(
                    token, 
                    process.env.SECRET_JWT__SEED
                    );

                req.uid = uid;
                req.name = name;

           
            
        } catch (error) {
            return response.status(401).json({
                ok:false,
                msg:'invalid token'
            });
        }

        next();

    }

module.exports = {
    jwtValidator
}