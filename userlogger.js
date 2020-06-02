const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/line', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', err => console.error('Connection error', err))
db.once('open', db => console.log('Connected to MongoDB'))

const UserSchema = new mongoose.Schema({
    userId: String,
    type: String,
    timestamp: Number,
    userProfile: Object
});

const User = mongoose.model('User', UserSchema)

const userlogger = async (req, res, next) => {
    const event = req.body.events[0]
    const { source, type, timestamp } = event
    if (type === 'follow') {
        const result = await User.findOne({ userId: source.userId })
        if (result === null) {
            const user = new User({
                userId: source.userId,
                type: source.type,
                timestamp,
                userProfile: {}
            });
            user.save((err, user) => {
                if (err) return console.log('Saving error.')
                console.log(`New user '${source.userId}' was saved.`)
            })
        }
    } else if (type === 'unfollow') {
        User.findOneAndDelete({ userId: source.userId }, (err) => {
            if (err) return console.log('Deleting error.')
        })
    }
    next()
}

module.exports = userlogger