import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import {Card } from 'semantic-ui-react';
import { Image, List } from 'semantic-ui-react'


const StyledListItem = styled(List.Item)`
    min-width: 10rem;
    border-radius: 50px;
    margin: 10px;
    background: #e0e0e0;
    box-shadow:  20px 20px 60px #bebebe,
             -20px -20px 60px #ffffff;
`;

const StyledList = styled(List)`
    min-width: 20rem;
`



const SideBar = ({friendList, selectedFriend}) => {

    console.log('Inside sidebar', {friendList});
    const handleClick = (event) => {
        event.preventDefault();
        console.log(event.target.id);
        console.log("executing on click");
        selectedFriend(event.target.name);   
     }

    return(
        <StyledList  selection>
           { Object.keys(friendList).length &&friendList.map((name) => (
            <StyledListItem onClick={handleClick} name={name}>
                      <Image avatar src='https://react.semantic-ui.com/images/avatar/large/patrick.png' />

                <List.Content>
                    <List.Header >{name}</List.Header>
                </List.Content>
            </StyledListItem>

            ))
           }
        </StyledList>
    )

}

export default SideBar;