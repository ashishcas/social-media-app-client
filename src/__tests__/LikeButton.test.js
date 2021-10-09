import React from 'react';
import { shallow, mount, render} from 'enzyme';
import { LikeButton } from '../components/common/LikeButton';
import { MockedProvider, LIKE_POST_MUTATION } from '@apollo/client/testing';


describe('snapshot testing like button',()=>{

    const mocks = []
    const mockMutation = {
        request: {
            query: LIKE_POST_MUTATION,
            variables: { postId: '1' },
          },
          result: {
            data: { post: { id: 1, name: 'Buck', breed: 'poodle' } },
          },
    };
    const post = {id:'1', likeCount: 0, likes:[]};

    it('should render like button', () => {

        const ShallowWrapper = shallow(
            <MockedProvider mocks={mocks}>
            <LikeButton user="somename" post={post}/>
            </MockedProvider>
        );
        expect(ShallowWrapper).toMatchSnapshot();
    });

    it('test onclick after render like button', () => {

        const ShallowWrapper = render(
            <MockedProvider mocks={mocks}>
            <LikeButton user="somename" post={post}/>
            </MockedProvider>
        );
        console.log((ShallowWrapper.find('#likeButton').length));
        // ;
        // expect(ShallowWrapper).toMatchSnapshot();
        // ShallowWrapper.unmount();
    });
});
