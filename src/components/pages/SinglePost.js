import React, { useState, useContext, useRef} from 'react';
import { Button, Grid, Image, Card, Icon , Label, Form } from 'semantic-ui-react';
import { gql, useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import { isMobile } from 'react-device-detect';


import { AuthContext } from '../context/auth';
import { LikeButton } from '../common/LikeButton';
import { DeleteButton } from '../common/DeleteButton';

const FETCH_POST_QUERY = gql`

    query($postId: ID!){
        getPost(postId: $postId){
            id
            body
            createdAt
            username 
            likeCount
            likes{
                username
            }
            commentCount
            comments{
                id
                username
                createdAt
                body
            }
        }
    }

`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

function SinglePost(props){

    const postId = props?.match?.params?.postId;

    const { user } = useContext(AuthContext);

    const [ comment, setComment] = useState('');

    const commentInputRef = useRef(null)

    const [ submitComment ] = useMutation(SUBMIT_COMMENT_MUTATION,{
        update(proxy, result){
            setComment('');
            commentInputRef.current.blur();
        },
        variables:{
            postId,
            body: comment
        }
    })

    const { data: {getPost = {}}={} } = useQuery(FETCH_POST_QUERY,{
        variables: { postId }
    })
    let postMarkup;



     const refreshPage = () => {
         props.history.push("/")
     }
 
    if(!Object.keys(getPost).length){
        postMarkup = <p>Loading...</p>
    }else if(Object.keys(getPost).length){
        const { 
            id , 
            body , 
            createdAt,
            username ,
            likeCount,
            likes,
            commentCount,
            comments
        } = getPost


        postMarkup = (
            <Grid style={{margin: '0 auto'}} centered colums={isMobile ? 1: 2}>
                    <Grid.Column width={isMobile ? 6 : 2}>
                    <Image
                        floated='right'
                        size='small'
                        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                    />
                    </Grid.Column>
                {/* </Grid.Row>
                <Grid.Row> */}

                    <Grid.Column width={isMobile? 16: 10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                                <Card.Description>
                                {body}
                                </Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content>
                                
                                <LikeButton user={user} post={{id , likeCount, likes}}/>
                                <Button 
                                as='div' 
                                labelPosition='right'
                                >
                                    <Button color='blue' basic>
                                            <Icon name='comments' />
                                    </Button>
                                    <Label as='a' basic color='blue' pointing='left'>
                                        {commentCount}
                                    </Label>
                                </Button>
                                {user && user.username === username && (
                                    <DeleteButton postId={id} callback={refreshPage}/>
                                )} 
                            </Card.Content>
                        </Card>
                        { user && (
                            <Card fluid>
                                <Card.Content>
                                    <h3>post a comment</h3>
                                    <Form>
                                        <div className="ui action input field">
                                            <input 
                                                type="text"
                                                placeholder="Comment..."
                                                name="comment"
                                                value={comment}
                                                onChange={(event) => {setComment(event.target.value)}}
                                                ref={commentInputRef}
                                                style={{width: 'auto'}}
                                            />
                                            <button
                                                type="submit"
                                                className="ui button teal"
                                                disabled={comment.trim() === ""}
                                                onClick={submitComment}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map((comment) =>(
                            <>
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                {user && user.username === comment.username && (
                                    <DeleteButton postId={id} commentId={comment.id} />
                                )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                            </>
                        ))}
                    </Grid.Column>
            </Grid>
        )
    }

    return postMarkup;
}

export default SinglePost;