import React  from "react";
import styled from "styled-components";
const FriendListWrapper = styled.li`
`

const FriendsList = ({ friends, selectedFriend }) => {


    const handleClick = (event) => {
        event.preventDefault();
        console.log(event.target.id);
        console.log("executing on click");
        selectedFriend(event.target.name);   
     }

    return(
        <ul>
            {
                friends.map((friend) => { 
                    <div onClick={handleClick} name={friend}>{friend}</div>
                })
            }
        </ul>
    )

};

export default FriendsList;