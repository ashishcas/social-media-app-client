import { gql  } from '@apollo/client';


export  const FETCH_POSTS = gql`
    {
        getPosts{
            id body createdAt username likeCount
            likes{
                username
            }
            commentCount
            comments{
                id username createdAt body
            }
        }
    }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription($receivername: String!) {
    newMessage(receivername: $receivername) {
        id,
        sender,
        receiver,
        message
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation($receiver: String!, $message: String!) {
    createMessage(receivername: $receiver, message: $message) {
        id,
        createdAt
        sender,
        receiver,
        message
    }
  }
`


export const FETCH_MESSAGES = gql`
  query getMessages($sendername: String!){
    getMessages(sendername: $sendername, inverse: false){ 
      sender
      receiver
      message 
      createdAt
    }
  }
`;

export const FETCH_FRIENDS_LIST = gql`
  query getFriendsList($sendername: String!){
    getMessages(sendername: $sendername, inverse: false){ 
      sender
    }
  }

`