// the header compone
import {Button, Card , Icon , Label, Image, Popup } from 'semantic-ui-react';


const ChatBoxHeader = ({profileIcon,nameOfFriend}) => {
    return (
        <Card>
            <Card.Content>
                <Image floated='left' size='mini' src={profileIcon || 'https://react.semantic-ui.com/images/avatar/large/molly.png'} alt="profile"/>
                <div className="chat-box-header-name">{nameOfFriend}</div>
            </Card.Content>
        </Card>
    )
}

export default ChatBoxHeader;