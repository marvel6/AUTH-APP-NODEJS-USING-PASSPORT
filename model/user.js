const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})


userSchema.pre('save', async function () {

    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.comparePassword = async function (password) {
    const isPassword = await bcrypt.compare(password, this.password);
    return isPassword;
}



module.exports = mongoose.model('User', userSchema)