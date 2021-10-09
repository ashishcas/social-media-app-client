import React  from "react";
import styled from "styled-components";
import { Header, Image } from 'semantic-ui-react'



const Container = styled.div`
 display: flex;
`;

const chatHeader = ({sender}) => {

    return(
        <Container>
            <Header as="h2">
                <Image circular src="https://react.semantic-ui.com/images/avatar/large/patrick.png" />
                {sender}
            </Header>
        </Container>
    )
}

export default chatHeader;