const userModel = require('../models/user.model');


const editUserProfile = async (req, res) => {

    const updatedData = req.body;

    try {
        const updateUser = await userModel.findByIdAndUpdate(req.user.id,
            updatedData,
            { new: true, runValidators: true }
        );

        if (!updateUser) {
            return res.status(404).json({
                success: false,
                message: 'User Does not exists'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Profile Edited Successfully',
            user: updateUser
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Problem in editing profile'
        })
    }
}


const deleteUser = async (req, res) => {

    try {
        const user = await userModel.findByIdAndDelete(req.user.id);


        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User Does not exits'
            })
        }

        res.status(204).json({
            success: true,
            message: 'Profile Deleted Successfully'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Problem in deleting profile'
        })
    }

}

module.exports = { deleteUser, editUserProfile }