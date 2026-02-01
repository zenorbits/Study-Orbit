const userModel = require('../models/user.model');


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

module.exports = {deleteUser}