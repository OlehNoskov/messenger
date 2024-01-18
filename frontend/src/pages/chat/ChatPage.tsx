import React, {useEffect, useState} from 'react';
import {
    Alert,
    Button,
    Card,
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import {useAuth} from "../../service/AuthContext";
import {createChat, findChatsByUserName, findUserByUsername} from "../../service/Service";
import {handleLogError} from "../../service/HendlerErrors";
import {Message} from "../../dto/Message";
import {User} from "../../dto/User";
import {Chat} from "../../dto/Chat";

import "./ChatPage.css";
import UserAvatar from "./UserAvatar";

let stompClient: any = null;

export default function ChatPage() {
    const Auth = useAuth();
    const user = Auth.getUser();

    const initialMessage: Message = {
        senderName: user?.data.username,
        receiverName: '',
        message: '',
        date: new Date
    }

    const [userName, setUserName] = useState('');
    const [friends, setFriends] = useState<User[]>([]);
    const [isError, setIsError] = useState(false);
    const [friend, setFriend] = useState('');
    const [tab, setTab] = useState('');
    const [chats, setChats] = useState<Chat[]>([]);
    const [currentChat, setCurrentChat] = useState<Chat | null>(null);
    const [message, setMessage] = useState<Message>(initialMessage);

    const [messages, setMessages] = useState<Message[]>([]);


    useEffect(() => {
        window.localStorage.setItem("name", userName);
        findChats();
    }, []);

    const logout = () => {
        Auth.userLogout();
    }

    const isSearchUserButtonDisable = (): boolean => {
        return userName.length < 2;
    }

    const isMessageEmpty = (): boolean => {
        return message.message.trim().length < 1;
    }

    const getFriend = async () => {
        try {
            const newFriends = await findUserByUsername(user, userName);
            const users: User[] = newFriends.data;

            setFriends(users);
            setIsError(false);

        } catch (error) {
            handleLogError(error);
            setIsError(true);
            setFriends([]);
        }
    }

    const menuItemFriends = friends?.map(friend => (
        <MenuItem key={friend.username} value={friend.username}>{friend.username}</MenuItem>
    ));

    const addFriendAndHideSelect = async () => {
        const chat: Chat = {
            senderName: user?.data.username,
            receiverName: friend,
            messages: []
        }

        await createChat(user, chat);
        await findChats();

        setFriends([]);
    }

    const handleFriend = (event: SelectChangeEvent) => {
        setFriend(event.target.value as string);
    };

    const connect = () => {
        const Stomp = require("stompjs");
        let SockJS = require("sockjs-client");
        SockJS = new SockJS("http://localhost:8080/ws");
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        stompClient.subscribe("/user/" + user?.data.username + "/chat/messages", sendPrivateValue);
    };

    const onError = (error: any) => {
        console.log(error);
    };

    const handleMessage = (event: { target: { value: any; }; }) => {
        const {value} = event.target;
        setMessage({...message, message: value, senderName: user?.data.username, receiverName: tab, date: new Date()});
    };

    const sendPrivateValue = () => {
        if (stompClient) {
            stompClient.send('/messenger/chat', {}, JSON.stringify(message));
            setMessage(initialMessage);

            // @ts-ignore
            const newMessages = [...messages];
            newMessages.push(message);
            setMessages(newMessages);
        }
    };

    const findChats = async () => {
        const chats: any = await findChatsByUserName(user, user?.data.username);
        setChats(chats.data);
    };

    const getNameTab = (chat: Chat) => {
        return chat.senderName === user?.data.username ? chat.receiverName : chat.senderName;
    }

    const updateCurrentChat = (chat: Chat) => {
        connect();
        // @ts-ignore
        setTab(getNameTab(chat));
        setCurrentChat(chat);
        setMessages(chat.messages);
    }

    return (
        <div className={"chat-page"}>
            <div className="messenger-label">
                <img className={"icon"} src={"./images/messenger-big.png"} alt={"messenger-icon"}></img>
                <Typography className="label">Messenger</Typography>
                <div className={"log-out"}>
                    <Button className={"log-out-button"} variant="outlined" size="large"
                            component={Link} to="/" onClick={logout}>
                        Log out
                    </Button>
                </div>
            </div>
            <Grid container component={Paper} className={"chat-card"}>
                <Grid item xs={4} className={"friends"}>
                    <div className={"user-info"}>
                        <List>
                            <ListItem>
                                <UserAvatar
                                    currentUserName={user?.data.username}
                                    isOnline={true}/>
                                <ListItemText primary={user?.data.username}></ListItemText>
                            </ListItem>
                        </List>
                        {isError &&
                            <Alert className={"user-search-alert-message"} severity="info"
                                   sx={{display: "flex", justifyContent: "center"}}>
                                Users with username: '{userName}' have not found!
                            </Alert>}
                        <div className={"search-friend"}>
                            <Grid item xs={9} style={{padding: '10px'}}>
                                <TextField id="outlined-basic-email" label="Search" variant="outlined"
                                           fullWidth
                                           helperText={isSearchUserButtonDisable() && userName.length > 0
                                               ? "Length of Username must be more than 2 characters!"
                                               : null}
                                           onChange={(value) => {
                                               setUserName(value.target.value);
                                           }}/>
                            </Grid>
                            <div>
                                <Grid item xs={3} style={{padding: '10px'}}>
                                    <Button variant="outlined"
                                            color="success"
                                            size="large"
                                            disabled={isSearchUserButtonDisable()}
                                            onClick={() => getFriend()}>Search</Button>
                                </Grid>
                            </div>
                        </div>
                        {friends.length > 0 &&
                            <div className={"search-friend"}>
                                <Grid item xs={9} style={{padding: '10px'}}>
                                    <FormControl fullWidth>
                                        <InputLabel id="select-friends">Friends</InputLabel>
                                        <Select
                                            labelId="select-friends"
                                            id="select-friends"
                                            value={friend}
                                            onChange={handleFriend}
                                            label="Friends">
                                            {menuItemFriends}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3} style={{padding: '10px'}}>
                                    <Button className={"add-friend-button"}
                                            variant="outlined"
                                            size="large"
                                            color="success"
                                            onClick={addFriendAndHideSelect}>
                                        Add friend
                                    </Button>
                                </Grid>
                            </div>
                        }
                    </div>
                    <div className="friends-list">
                        <List>
                            {chats.map((chat) => (
                                <ListItemButton
                                    onClick={() => {
                                        updateCurrentChat(chat);
                                    }}
                                    className={`member ${tab === chat.senderName && 'active'}`}>
                                    <UserAvatar
                                        currentUserName={chat.senderName}
                                        isOnline={true}/>
                                    <ListItemText primary={getNameTab(chat)}/>
                                </ListItemButton>
                            ))}
                        </List>
                    </div>
                </Grid>
                <Grid item xs={8} className={"messages"}>
                    {currentChat !== null ? (
                            <div className="chat-content">
                                <List>
                                    {messages.map((message) => (
                                        <ListItem key={message.id}
                                                  className={`message ${user?.data.username !== message.receiverName && 'self'}`}>
                                            <div className="message-data">{message.message}</div>
                                        </ListItem>
                                    ))}
                                </List>
                                <Grid container style={{padding: '20px'}} className={"type-field"}>
                                    <Grid item xs={10}>
                                        <TextField className={'input-message'} id="outlined-basic-email"
                                                   label="Type a message..."
                                                   onChange={handleMessage} value={message.message} fullWidth/>
                                    </Grid>
                                    <Button disabled={isMessageEmpty()} className={"send"} variant="contained"
                                            onClick={sendPrivateValue}
                                            endIcon={<SendIcon/>}>Send</Button>
                                </Grid>
                            </div>
                        )
                        :
                        (<Card className={"select-chat"}>
                            <Typography>
                                Select a chat to start a messaging!
                            </Typography>
                        </Card>)}
                </Grid>
            </Grid>
        </div>
    );
}