import styled from "styled-components";

export const ChatWindow = styled.div`
    display: flex;
    flex-direction: ${props => props.isMobile ? "column" : "row"};

`