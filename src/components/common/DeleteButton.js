import React, {useState, useEffect} from 'react';

import { Button, Icon, Confirm, Popup } from 'semantic-ui-react';

import { gql, useMutation } from '@apollo/client';

import { Link } from 'react-router-dom';

import { FETCH_POSTS } from '../utils/graphqlQueries';


const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`
const DELETE_COMMENT_MUTATION=gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;



export const DeleteButton = (props) =>{

    const [ confirmOpen, setConfirmOpen] = useState(false);

    const mutation = props.commentId ? DELETE_COMMENT_MUTATION: DELETE_POST_MUTATION;
    const [deletePost] = useMutation(mutation, {
        update(proxy){       
            setConfirmOpen(false);
            if(!props.commentId){
                let data = proxy.readQuery({
                    query: FETCH_POSTS
                })
                let getPostsData = data.getPosts.filter(p => p.id !== props.postId);
                proxy.writeQuery({query: FETCH_POSTS, data:{
                    getPosts: [...getPostsData],
                }});
            }
            if(props.callback){
                props.callback();
            }
        },
        variables: { postId: props.postId , commentId: props.commentId}
    });


    return(
        <>
        <Popup 
        content={ props.commentId ? 'Delete Comment': 'Delete post'} 
        inverted
        trigger={            
          <Button as='div' 
            color="grey" 
            floated="right"
            onClick={() => { setConfirmOpen(true)}}
            >
              <Icon name="trash" style={{margin: 0}} />
            </Button>
            }
          />
            <Confirm 
                open={confirmOpen}
                onCancel = { () => { setConfirmOpen(false)}}
                onConfirm = { deletePost }
            />
        </>
    )
}