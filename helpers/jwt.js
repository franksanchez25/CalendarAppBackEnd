const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {

    return new Promise ( (resolve,rejected)=>{

        const payload = {uid, name};

        jwt.sign( payload, process.env.SECRET_JWT__SEED,{
            expiresIn:'2h'
        }, (err,token)=>{

            if (err) {
                console.log('failed to generate token')
                rejected(err);
            }

            resolve( token );
           
        } )

    })

}

module.exports = {generateJWT};