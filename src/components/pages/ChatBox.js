import React, { useContext, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react'
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import ChatBoxHeader from '../common/chatBoxHeader';
import { AuthContext } from '../context/auth';
import { Message } from 'semantic-ui-react';
import { useSubscription } from '@apollo/client';
import { MESSAGE_SUBSCRIPTION } from '../utils/graphqlQueries';
import SideBar from '../common/chatting/friendsListSidebar'
import MainChat from '../common/chatting/mainChat';
import { ChatWindow} from './chatBoxStyle';

const FETCH_MESSAGES = gql`
  query getMessages($sendername: String!){
    getMessages(sendername: $sendername, inverse: false){ 
      sender
      receiver
      message 
      createdAt
    }
  }
`;

const FETCH_FRIENDS_LIST = gql`
  query getFriendsList($sendername: String!){
    getMessages(sendername: $sendername, inverse: false){ 
      sender
    }
  }

`

// problem with subscriber u can get latest data not the prevous once
function ChatBox(props) {

  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [sender , setSender] = useState('');
  console.log(user.username)
  const { data={}, loading, error } = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { receivername: user.username}
  });

  // running query to get all the messages which in case results in the over fetching of data
  const { data: { getMessages : messagesData = {}} = {}, loading: loading2, error: error2 } = useQuery(FETCH_MESSAGES, {
    variables: { sendername: '' }
  })

  console.log(messagesData)
    useEffect(() => {
      console.log({messages})
    } , [messages])

    if(Object.keys(messagesData).length > 0 && Object.keys(messages).length === 0){
      setMessages([...messages , ...messagesData])
      console.log({messages})
    }

  
    // running query to get only to fetch the senders list

    const {data: { getMessages: friendList = {}} ={}, loading : getFriendListLoading, error : getFriendListError} = useQuery(FETCH_FRIENDS_LIST, {
      variables: { sendername: '' }
    });

    if(Object.keys(messagesData).length > 0 && Object.keys(messages).length === 0){
      setMessages([...messages , ...messagesData])
      // console.log({messages})
    }

    useEffect(() => {
        if( Object.keys(friendList).length > 0  && Object.keys(friends).length === 0){
          console.log({friendList})
          const uniqueFriendList = friendList.map(friend => friend.sender).filter((elem, pos, self) => self.indexOf(elem) === pos);
          setFriends(uniqueFriendList)
        }
    } , [friendList, getFriendListLoading])


  // const senders = ['ashish', 'new', 'satwik']
  // if(Object.keys(data).length){
  //     data.forEach(item=>{
  //       senders.push(item.sender)
  //     });
  // }
  // read data from grpahql server and populate it below

  console.log({data, loading, error});
  return (
    <ChatWindow>
      {/* <ChatBoxHeader nameOfFriend={'name'}/> */}
      <SideBar friendList={friends} selectedFriend={setSender}/>
      <MainChat  friendList={friends} />
    </ChatWindow>
  );
};


export default ChatBox;