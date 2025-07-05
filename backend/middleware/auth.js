// import jwt from "jsonwebtoken"

// const authMiddleware = async (req,res,next) => {
//     const {token} = req.headers;
//     if(!token){
//         return res.json({success:false,message:"Not Authorized Login Again"})
//     }
//     try {
//         const token_decode = jwt.verify(token,process.env.JWT_SECRET);
//         req.body.userId = token_decode.id;
//         next();
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }

// export default authMiddleware;

import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login again." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!req.body) req.body = {};

        if (!req.body.userId) {
            req.body.userId = decoded.id;
        }

        next();
    } catch (error) {
        console.log("JWT error:", error);
        res.json({ success: false, message: "Invalid token" });
    }
};

export default authMiddleware;
