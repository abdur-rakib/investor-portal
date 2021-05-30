const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: String,
    father_name: String,
    mother_name: String,
    date_of_birth: String,
    profession: String,
    religion: String,
    nationality: String,
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    blood_group: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] },
    nid_number: { type: String, unique: true, required: true },
    passport_number: String,
    email: { type: String, unique: true, required: true },
    encryptedPassword: { type: String, required: true },
    role: { type: String, enum: ['admin', 'moderator', 'investor'], required: true },
});

const User = model('User', UserSchema);

module.exports = { User };
