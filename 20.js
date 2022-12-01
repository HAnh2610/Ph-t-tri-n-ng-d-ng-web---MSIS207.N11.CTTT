import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Message from './dbMessages.js'
import Pusher from 'pusher'

const app= express()
const port = process.env.port || 9000
const connection_url = 'your-mongodb'

const pusher = new Pusher({
    appId: "your-app-id",
    key: "your-key",
    secrect: "your",
    useTSL: true
});

app.use(express.json())
app.use(Cors())


mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.once("open", () => {
    console.log("DB Connected")
    const msCollection = db.connection("messagingmessages")
    const changStream = msgCollection.watch()
    changStream.on('change', change => {
        console.log(change)

        if(change.operationType === "insert") {
            const messageDetails = change.fullDocument
            pusher.trigger("message", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            })
        } else {
            console.log('Error trigerring Pusher')
        }
    })
})

app.get("/", (req, res) => res.status(200).send("Hello UIT guys"))
app.post('/messages/new', (req, res) => {
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
        if(err)
        {
            res.status(500).send(err)
        }  else {
            res.status(200).send(data)
        }
    })
})

app.listen(port, () => console.log(`Listening on localhost: ${port}`))