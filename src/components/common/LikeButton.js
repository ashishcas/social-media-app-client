import React, {useState, useEffect} from 'react';

import { Button, Icon, Label, Popup } from 'semantic-ui-react';

import { gql, useMutation } from '@apollo/client';

import { Link } from 'react-router-dom';


const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`


export const LikeButton = ({ user, post: { id , likeCount, likes }}) =>{

    const [ liked, setLiked] = useState(false);

    useEffect(() =>{
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true)
        }else {
            setLiked(false);
        }
    },[user, likes])


    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    });

    const likeButton = user ? (
      liked ?
      (  <Button color='red' >
            <Icon name='heart' />
        </Button>
      ) : (
        <Button color='red' basic>
            <Icon name='heart' />
        </Button>
      )
    ): (
        <Button as={Link} to='/login' color='red' basic>
            <Icon name='heart' />
        </Button>
    )
    return(
        <>
        <Popup 
        content={ liked ? 'Unlike': 'like'} 
        inverted
        trigger={            
          <Button as='div' labelPosition='right' onClick={likePost}>
          {likeButton}
          <Label as='a' basic color='red' pointing='left'>
              {likeCount}
          </Label>
          </Button>
            }
          />

        </>
    )
}