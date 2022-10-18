import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { allUsersRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

function Chat(props) {

    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)
    const [currentChat, setCurrentChat] = useState(undefined)
    const [isLoaded, setIsLoaded] = useState(false) 

    const navigate = useNavigate()

    useEffect(() => {
        async function myFunc () {
            if(!localStorage.getItem('chat-app-user')) {
                navigate('/login')
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
                setIsLoaded(true)
            }
        }
        myFunc()
    }, [])

    useEffect(() => {
        async function myFetchApi () {
            if(currentUser) {
                if(currentUser.isAvatarImageSet) {
                    const users = await axios.get(`${allUsersRoute}/${currentUser._id}`)
                    setContacts(users.data)
                } else {
                    navigate('/setAvatar')
                }
            }
        }
        myFetchApi()
    }, [currentUser])

    const handleChatChange = (chat) => {
        setCurrentChat(chat)
    }
 
    return <Container>
        <div className="container">
            <Contacts 
                contacts={contacts} 
                currentUser={currentUser} 
                changeChat={handleChatChange}
            />
            {
                isLoaded && currentChat === undefined ?  
                <Welcome currentUser={currentUser} /> :
                <ChatContainer currentChat={currentChat} currentUser={currentUser} />
            }
        </div> 
    </Container>
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: rgb(38, 38, 38);
    .container {
        height: 85vh;
        width: 85vw;
        background-color: rgb(114, 212, 183);
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
        }
    }
`

export default Chat