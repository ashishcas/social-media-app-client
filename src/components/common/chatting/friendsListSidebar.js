import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import {Card } from 'semantic-ui-react';
import { Image, List, Icon , Button, Label } from 'semantic-ui-react'


const StyledListItem = styled(List.Item)`
    min-width: 10rem;
    border-radius: 50px;
    margin: 10px;
    background: #e0e0e0;
    box-shadow:  20px 20px 60px #bebebe,
             -20px -20px 60px #ffffff;

    &:hover {
        transform: scale(1);
        box-shadow:   20px 20px 60px black,
        -20px -20px 60px #ffffff;
    }
`;

const StyledList = styled(List)`
    min-width: 20rem;
`
const StyledDiv = styled.div`
    margin-top: 1rem;

`
const StyledButton = styled(Button)`
    border-radius: 50px;
    width: 100%;


`



const SideBar = ({friendList, selectedFriend}) => {

    const handleClick = (event) => {
        event.preventDefault();
        console.log(event.target.id);
        selectedFriend(event.target.dataset.name  || event.target.id);   
     }

    return(
        
    <StyledDiv>
            <StyledButton>
            <Button icon>
                <Icon name='heart' />
                Like
            </Button>
            <Label as='a' basic pointing='left'>
                2,048
            </Label>
            </StyledButton>
        <StyledList selection>
                {Object.keys(friendList).length && friendList.map((name) => (
                    <StyledListItem onClick={handleClick} data-name={name} id={name}>
                        <Image avatar src='https://react.semantic-ui.com/images/avatar/large/patrick.png' />

                        <List.Content>
                            <List.Header>{name}</List.Header>
                        </List.Content>
                    </StyledListItem>

                ))}
            </StyledList>
        </StyledDiv>
    )

}

export default SideBar;