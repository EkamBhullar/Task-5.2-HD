import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(400).json({
            success: false,
            message: 'did not find auth token'
        })
    }
    const token = authorization.split(' ')[1]
    try {
        const { _id, name } = jwt.verify(token, process.env.JWT_SECRET);
        const { email, address } = await User.findOne({ _id })
        if (email !== "ekamjot4782.be22@chitkara.edu.in" ) {
            return res.status(501).json({
                success: false,
                message: "This is an admin route"
            })
        }
        req.user = {
            userid: await User.findOne({ _id }),
            name: name,
            email: email,
            address: address
        }
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}
export default adminAuth;