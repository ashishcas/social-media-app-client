import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react'
import { isMobile } from 'react-device-detect';

import PostCard from '../common/PostCard';
import PostForm from '../common/PostForm';

import { AuthContext } from '../context/auth';

import { FETCH_POSTS } from '../utils/graphqlQueries';

function Home(){

    const { user } = useContext(AuthContext);
    const { loading, error, data: { getPosts: posts = []} = {}} = useQuery(FETCH_POSTS);


    return(

    <Grid columns={ isMobile ? 1 : 3} >
        <Grid.Row className="page-title">
            <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
            {
                user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )
                            
            }
            {
                loading ? (
                    // add spinner here
                    <h1>Loading Posts...</h1>
                ) : (
                    <Transition.Group>
                        {
                                posts && posts.map(post => (
                                <Grid.Column key={post.id} style={{marginBottom: 20}} fluid>
                                    <PostCard  post={post}/>
                                </Grid.Column>
                            ))
                            
                        }
                    </Transition.Group>
                )
            }
        </Grid.Row>
    </Grid>
    )
}

export default Home;