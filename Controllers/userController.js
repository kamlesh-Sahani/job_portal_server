const User = require('../Models/UserModels');
const bcrypt = require('bcryptjs');
// register the new  user and Companies 

exports.userRegister = async (req, res) => {
    try {

        const file = req.file.filename;

        const { role, jobDes, companyLoaction, email, firstName, lastName, password, confirmPassword } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.json({
                success: false,
                message: 'User is Already Exists'
            })
        }

        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: 'Does not match Passsword',
            })
        }

        const bcryptPassword = await bcrypt.hash(password, 10);
        const bcryptCPassword = await bcrypt.hash(confirmPassword, 10);
        // create the user 
        const user = await User.create({
            role,
            jobDes,
            companyLoaction,
            email,
            firstName,
            lastName,
            profileImg: file,
            password: bcryptPassword,
            confirmPassword: bcryptCPassword
        })
        // id the user faild to register
        if (!user) {
            return res.json({
                success: false,
                message: "Faild to Register"
            })
        }
        // generate the token
        const token = await user.generateToken();

        res.cookie('token', token,{
            
                httpOnly: true,
                sameSite: 'strict',
                secure:true,
               sameSite:"none"

            }).json({
                success: true,
                message: "register successfuly",
                token,
                user
            })

    } catch (error) {
        res.json({
            success: false,
            message: error.messsage
        })
    }
}


//login user 

exports.userLogin = async (req, res) => {
    try {

        const { email, password } = req.body;
        // check if the user exists

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: 'User not found'
            });
        }


        // match password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: 'Wrong Password or Email'
            });
        }

        // generate the token
        const token = await user.generateToken();
        res.cookie('token', token, {
              
            httpOnly: true,
            sameSite: 'strict',
            secure:true,
           sameSite:"none"
        }).json({
            success: true,
            message: 'Login successfully ',
            user,
            token
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message // Corrected typo
        });
    }
};


// logged user

exports.myProfile = async (req, res) => {
    try {
        const loadUser = await User.findById(req.user._id);
        if (!loadUser) {
            return res.json({
                success: false,
                message: "does not login"
            })
        }
        res.json({
            success: true,
            user: loadUser
        })
    } catch (error) {
        return error.message;
    }
}

// get all user 
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        if (!users) {
            return res.json({
                success: false,
                message: "users is not found"
            })
        }
        res.json({
            success: false,
            message: "users Found",
            users
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })

    }
}
// get specific user

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('jobPost');
        if (!user) {
            return res.json({
                success: false,
                message: "User is not Exists"
            })
        }

        res.json({
            success: true,
            message: "user is found",
            user
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


// logout user 
exports.logoutUser = (req,res)=>{
    try {
         res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true,
            sameSite:"none",
            secure:true
        })
        return res.json({
            success:true,
            message:'logout successfuly'
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}