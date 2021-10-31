import React, { useEffect, useState, useContext}  from "react";
import styled from "styled-components";
import ChatBoxHeader from "./chatHeader";
import { FETCH_MESSAGES , MESSAGE_SUBSCRIPTION, CREATE_MESSAGE } from "../../utils/graphqlQueries";
import { gql, useQuery, useSubscription, useMutation } from '@apollo/client';
import { AuthContext } from '../../context/auth';
import { Dropdown, Input, Button, Icon, Label,  } from 'semantic-ui-react'





const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
    height: 100%;
    background-color: white;
    word-wrap: break-word;
    margin-top: 1rem;
    padding: 1em;
    scroll-behavior: smooth;
`;


const MessageRecieved = styled.div`
    margin: 2px;
    margin-left: ${props => props.received ? 'auto' : 0};
    margin-right: ${props => props.received ? 0 : 'auto'};
    p{
        font-size: 20px;
        background: rgba(0, 0, 0, .05);
        border-radius: ${props => props.received ? '15px 0px 0px 15px': '0px 15px 15px 0px'};
        padding: 0.15rem;
    }   
`;

const StyledInput = styled.input`
    width: 100%;
    height: 50px;
    border-radius: 5px;
    border: solid teal;
    padding: 0.5rem;
    font-size: 1.2rem;
    margin: 1rem 0rem 1rem 0rem;
    &:focus{
        outline: none;
    }
`;

const FlexContainer = styled.div`
    display: flex;
    flex: 2 1 ;
`

const StyledButton = styled(Button)`
    margin: 1rem !important;
    height: 50px;
`

const FETCH_MESSAGES_SENT = gql`
  query getMessages($sendername: String!){
    getMessages(sendername: $sendername, inverse: true){ 
      sender
      receiver
      message 
      createdAt
    }
  }
`;


function byDate (a, b) {
    if (a.createdAt < b.createdAt) return -1; 
    if (a.createdAt > b.createdAt) return 1; 
    return 0;  
}

const MainChat = ({ sender, messages }) => { 

    const { user } = useContext(AuthContext);


    const [ messagesReceived, setMessagesReceived ] = useState(messages || []);
    const [newmessage, setNewMessage] = useState('');

    const { data: { getMessages = [] } = {}, loading: friendsLoading, error: getMessagesError, refetch } = useQuery(FETCH_MESSAGES_SENT, {
        variables: { sendername: sender }
    });

    const { data='', loading, error } = useSubscription(MESSAGE_SUBSCRIPTION, {
        variables: { receivername: user.username}
      });

    useEffect(() => {
        if(!loading && data){
            const messagesR  =  [...messagesReceived, data.newMessage];
            let  allMessages = messagesR.sort(byDate);
            setMessagesReceived(allMessages);
        }
    }, [loading, error]);
    
    useEffect(() => {
        if(!friendsLoading && getMessages){
            const messagesR  =  [...getMessages, ...messagesReceived];
            let  allMessages = messagesR.sort(byDate);
            setMessagesReceived(allMessages);
        }
     }, [friendsLoading]);
    
        const Chats =  messagesReceived.map( singleMessage => (
            
                    <MessageRecieved received={singleMessage.sender == user.username}>
                    <p>{singleMessage.message}</p>
                </MessageRecieved>
        ))
    
        
    const handleChange= (event) =>{
        event.preventDefault();
        setNewMessage(event.target.value);
    }

    const [sendMessage, { data: newMessageReponse, loading: newMessageLoading, error: newMessageError} ] = useMutation(CREATE_MESSAGE, {
        update(proxy, result) {
            // const data = proxy.readQuery({
            //     query: FETCH_MESSAGES_SENT,
            //     variables: { sendername: sender }
            // });
            // console.log('running inside proxy', data);
            // data.getMessages.push(result.data.createMessage);
            // proxy.writeQuery({
            //     query: FETCH_MESSAGES_SENT,
            //     variables: { sendername: sender },
            //     data
            // });
            setNewMessage('');
        },
        variables: {
            receiver: sender,
            message: newmessage
        }
    });

    useEffect(() => {
        if(!newMessageLoading && newMessageReponse){
            console.log('getMessages', newMessageReponse.createMessage);
            const messagesR  =  [...messagesReceived, newMessageReponse.createMessage];
            let  allMessages = messagesR.sort(byDate);
            setMessagesReceived(allMessages);
        }
    }, [newMessageLoading]);
    return (
        <Container>
                  {Chats}
        <FlexContainer>
            <StyledInput  placeholder='Start texting' onChange={handleChange} name="message" value={newmessage}/>
            <StyledButton
                floated="right"
                onClick={sendMessage}
                icon="send"
                />
        </FlexContainer>
        </Container>
    )
}

export default MainChat;