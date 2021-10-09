import React, { useEffect, useState}  from "react";
import styled from "styled-components";
import ChatBoxHeader from "./chatHeader";
import FriendList from "./friendsList";
import SideBar from "./friendsListSidebar";



const Container = styled.div`
    display: flex;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
`;




const MainChat = ({ messages , friendList}) => {  

    const [selectedFriend, setSelectedFriend] = useState('null');
    // fetch messages from the server

    // how to show the messages in the chat  

    useEffect(()=>{
        console.log({selectedFriend});

    },[selectedFriend])

    return (
        <Container>
            <ChatBoxHeader sender={'ashish'}/>
            <h1>Main ChatBox</h1>
        </Container>
    )
}

export default MainChat;