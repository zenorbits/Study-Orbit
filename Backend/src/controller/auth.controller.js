const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');


//Register 

const registerUser = async (req, res) => {

    const { username, email, password, secretKey } = req.body;

    try {

        const userExists = await userModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: 'User already Exists'
            })
        }

        let setRole = ''


        const hashedPassword = await bcrypt.hash(password, 10);

        if (secretKey === process.env.ADMIN_SECRETKEY) {
            setRole = 'admin'
        } else if (secretKey === process.env.TEACHER_SECRETKEY) {
            setRole = 'teacher'
        } else if (secretKey === process.env.STUDENT_SECRETKEY) {
            setRole = 'student'
        } else if (secretKey === process.env.PARENT_SECRETKEY) {
            setRole = 'parent'
        } else {
            return res.status(400).json({
                message: 'Invalid Credentials'
            })
        }

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            role: setRole
        });

        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        },
            process.env.JWT_SECRETKEY,
            {
                expiresIn: '3h'
            }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3 * 60 * 60 * 1000
        })

        return res.status(201).json({
            message: 'User Registered Successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })



    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });

    }
}

//Login

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'User does not exist'
            })
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
            return res.status(401).json({
                message: 'Invalid Credentials'
            })
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        },
            process.env.JWT_SECRETKEY,
            {
                expiresIn: '3h'
            })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })


        res.status(200).json({
            message: 'User Logged in successfull',
            token,
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

const userLogout = async (req, res) => {

    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    return res.status(200).json({
        message: 'User Logged Out Successfully'
    })
}

module.exports = { registerUser, loginUser, userLogout }