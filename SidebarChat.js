import React, { useEffect, useState} from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'

const SidebarChat = ({message }) => {
    const [seed, setSeed] = useState("")

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    return (
        <div className="sidebarChat">
            <Avatar src={`your-avatar-icon-api`} />
            <div className="sidebarChat_info">
                <h2>Dev Help</h2>
                <p>{messages[message.length -1].message}</p>
            </div>
        </div>
    )
}

export default SidebarChat