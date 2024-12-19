import JWT from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId , res) => {

    const token = JWT.sign({userId}, process.env.JWT_SECRET_KEY , {expiresIn:"15d"});

    res.cookie("jwt" , token , {
        maxAge: 15 * 24 * 60 * 60 * 1000, //15 days in milliseconds
        httpOnly: true, //prevent  XSS attacks cross-site scripting attacks 
        sameSite:true, // CSRF attacks Cross-Site Request Forgery
        secure: process.env.NODE_ENV !== "development"
    });
}

export default generateTokenAndSetCookie;