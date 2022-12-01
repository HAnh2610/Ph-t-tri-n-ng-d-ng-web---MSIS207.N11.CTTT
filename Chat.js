import React, { useEffect, useState} from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined, InsertEmotion } from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic'
import './Chat.css'
import axios from './axios'
import { useStateValue } from './StateProvider';

const Chat = ({ message }) => {
    const [seed, setSeed] = useState("")
    const [input, setInput] = useState("")
    const [{ user }, dispatch] = useStateValue()

    const sendMessage = async (e) => {
        await axios.post('/messages/new', {
            message: input,
            name: user.displayName,
            timestamp: new Date().toUTCString(),
            received: true
        })
        setInput("")
    }

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    return (
        <div className="chat">
            <div className= "chat_header">
                <Avatar src={`http://avatars.dicebear.com/api/human/b${seed}.svg`} />
                <div className="chat_headerInfo">
                    <h3>Dev Help</h3>
                    <p>Last seen at {" "}
                          {messages[messages.length -1]?.timestamp}
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map(message => (
                    <p className={`chat_message ${message.name === user.displayName && 'chat_'}`}>
                        <span className="chat_name">{message.name}</span>
                              {message.message}
                        <span className="chat_timestamp">
                            {message.timestamp}
                        </span>
                    </p>
                ))}
            </div>
            <div className="chat_footer">
                <InsertEmotion />
                <form>
                    <input
                          value={input}
                          onChange={e => setInput(e.target.value)}
                          placeholder="Type a message"
                          type="text"
                    />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat