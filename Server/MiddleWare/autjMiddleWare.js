// import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'

// dotenv.config()

// const secrect = process.env.JWT_KEY

// const authMiddleWare = async(req, res, next) =>{
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         console.log(token);
//         if(token){
//             const decoded = jwt.verify(token, secrect)
//             console.log(decoded)
//             req.body._id = decoded.id;
            
//         }
//         next();
//     } 
//     catch (error) {
//         console.log(error)
//     }
// }

// export default authMiddleWare;