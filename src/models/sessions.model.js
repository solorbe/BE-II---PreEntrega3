import mongoose from 'mongoose'
const sessionSchema = new mongoose.Schema(
{
IdUser: {type: Object, required: true},
AutenticationState: {type: Boolean, required: true, default: false},
nameUser: {type: String, required: true},
password: {type: String, required: true},
role: {
    type: String,
    enum: ['user', 'admin', 'organizer'],
    default: 'user',
    },
},
{
timestamps: true
}
)
export const SessionModel = mongoose.model('Sessions', sessionSchema)
