import React, {useState} from 'react';

import { Form, Button } from 'semantic-ui-react';

import { gql, useMutation } from '@apollo/client';

import { FETCH_POSTS } from '../utils/graphqlQueries';


const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id 
            body
            createdAt
            username 
            likes{
                id
                username
                createdAt
            }
            likeCount
            comments {
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }

`

const PostForm = () => {
    const [fields , setFields] = useState({
        body: '',
    });

    const [ errors , setErrors ] = useState('');

    const handleChange =(event) => {
        setFields({...fields,[event.target.name]: event.target.value})
    };



    const [ createPost, { error  }] = useMutation(CREATE_POST_MUTATION,{
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_POSTS
            })
            // data.getPosts = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({query: FETCH_POSTS, data:{
                 getPosts: [result.data.createPost, ...data.getPosts],
            }});
            fields.body= ''
        },
        onError(err){
            setErrors(err?.graphQLErrors[0]?.message)
        },
        variables:fields
    });

    const onSubmit=(event) => {
        event.preventDefault();
        createPost();
    }

    return(
        <>
            <Form onSubmit={onSubmit}>
                    <h2>Create a Post</h2>
                    <Form.Field>
                            <Form.Input 
                                placeholder="Hi world"
                                name="body"
                                onChange={handleChange}
                                value={fields.body}
                                error={errors ? true : false}
                                />
                            <Button type="submit" color="teal">
                                Submit
                            </Button>
                    </Form.Field>
            </Form>
            {
                errors && (
                    <div className="ui error message" style={{marginBottom: 20}}>
                        <ul className="list">
                            <li>{errors}</li>
                        </ul>
                    </div>
                )
            }
        </>
    )
}

export default PostForm;