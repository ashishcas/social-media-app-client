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