import React, { useContext, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { isMobile } from 'react-device-detect';
import { AuthContext } from '../context/auth';
import { Loader } from 'semantic-ui-react'
import { useSubscription } from '@apollo/client';
import { MESSAGE_SUBSCRIPTION } from '../utils/graphqlQueries';
import SideBar from '../common/chatting/friendsListSidebar'
import MainChat from '../common/chatting/MainChat';
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
  const [messages, setMessages] = useState('');
  const [friends, setFriends] = useState([]);
  const [sender , setSender] = useState('');

  // running query to get all the messages which in case results in the over fetching of data 
      const { data: { getMessages } = {}, loading: friendsLoading, error: getMessagesError, refetch } = useQuery(FETCH_MESSAGES, {
        variables: { sendername: sender }
      })  

        const { data: { getMessagesInverse } = {}, loading: messagesLoading, error: callFiled } = useQuery(FETCH_MESSAGES, {
          variables: { sendername: sender , inverse: true}
        })  


      useEffect(() => {
        console.log("Lets refetch")
        refetch();
      },[sender]);
      

  
    // running query to get only to fetch the senders list

    const {data: { getMessages: friendList = {}} ={}, loading : getFriendListLoading, error : getFriendListError} = useQuery(FETCH_FRIENDS_LIST, {
      variables: { sendername: '' }
    });

    const [loadincCompleted , setLoadincCompleted] = useState(getFriendListLoading);

    useEffect(() => {
      setLoadincCompleted(getFriendListLoading);
    } , [loadincCompleted])



    useEffect(() => {
        if( Object.keys(friendList).length > 0  && Object.keys(friends).length === 0){
          const uniqueFriendList = friendList.map(friend => friend.sender).filter((elem, pos, self) => self.indexOf(elem) === pos);
          setFriends(uniqueFriendList)
          setSender(uniqueFriendList[0]);
        }
    } , [friendList, getFriendListLoading])


  return (
    <ChatWindow isMobile={isMobile}>
      {/* <ChatBoxHeader nameOfFriend={'name'}/> */}
      <SideBar friendList={friends} selectedFriend={setSender}/>
     { !getFriendListLoading && getMessages ?
        (<MainChat sender={sender} messages={getMessages} />)  :  <Loader active inline='centered' content='Loading...' />
    }
    </ChatWindow>
  );
};


export default ChatBox;