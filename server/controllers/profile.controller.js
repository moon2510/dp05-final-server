const UserSchema = require("../models/user.model")
const bcrypt = require('bcryptjs');

const ProfileController = {
    getProfile: async (req, res) => {
        try {
            const userProfile = await UserSchema.findById({_id: req.user._id});
            if(!userProfile) return res.status(400).json({ msg: 'Account does not exists!' });

            res.json(userProfile)
        } catch (error) {
            console.log(error)
        }
    },
    updateProfile: async (req, res) => {
        try {
            const {fullName, phone, password, avatar } = req.body

            const validUser = await UserSchema.findById({_id: req.user._id})
            if(!validUser) return res.status(400).json({ msg: 'Account does not exists!' });

            const passwordHash = await bcrypt.hash(password, 10);

            const userUpdate = {
                fullName, phone, password: passwordHash, avatar
            }

            await UserSchema.findByIdAndUpdate({_id: req.user._id}, userUpdate, {new: true})

            res.json({msg: 'update successfully!'})

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProfileController