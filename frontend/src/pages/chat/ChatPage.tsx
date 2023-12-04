import React, {useEffect, useState} from 'react';
import {
    Alert,
    Avatar,
    Button,
    FormControl,
    Grid, InputLabel,
    List,
    ListItem, ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Paper,
    Select, SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import "./ChatPage.css";
import {Link} from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import {useAuth} from "../../service/AuthContext";
import {findUserByUsername} from "../../service/Service";
import {handleLogError} from "../../service/HendlerErrors";
import {deepPurple} from "@mui/material/colors";
import {User} from "../../dto/User";
import SockJS from "sockjs-client";
import {over} from "stompjs";

interface ChatMessage {
    senderName: string;
    receiverName?: string;
    message: string;
    status: 'JOIN' | 'MESSAGE';
}

let stompClient: any = null;

export default function ChatPage() {
    const Auth = useAuth();
    const user = Auth.getUser();

    const [userName, setUserName] = useState('');
    const [friends, setFriends] = useState<User[]>([]);
    const [isError, setIsError] = useState(false);
    const [friend, setFriend] = useState('');
    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState(null);

    const [userData, setUserData] = useState({
        username: user?.data.username,
        receiverName: '',
        connected: false,
        message: '',
    });

    useEffect(() => {
        window.localStorage.setItem("name", userName);
    }, []);

    const logout = () => {
        Auth.userLogout();
    }

    const isSearchUserButtonDisable = (): boolean => {
        return userName.length < 2;
    }

    const getFriend = async () => {
        try {
            const newFriends = await findUserByUsername(user, userName);
            const users: User[] = newFriends.data;

            setFriends(users);
            setIsError(false);

            // console.log(bearerAuth(user));

        } catch (error) {
            handleLogError(error);
            setIsError(true);
            setFriends([]);
        }
    }

    function userAvatar() {
        return {
            sx: {
                bgcolor: deepPurple[500],
            },
            children: user != null ? `${user?.data.username.split(' ')[0][0]}` : null
        };
    }

    const menuItemFriends = friends?.map(friend => (
        <MenuItem key={friend.username} value={friend.username}>{friend.username}</MenuItem>
    ));

    const addFriendAndHideSelect = () => {
        registerUser();
        setFriends([]);
    }

    const handleFriend = (event: SelectChangeEvent) => {
        setFriend(event.target.value as string);
    };

    const connect = () => {
        const Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        setUserData({...userData, connected: true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
        userJoin();
    };

    const userJoin = () => {
        const chatMessage = {
            senderName: userData.username,
            status: 'JOIN',
        };
        stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
    };

    const onMessageReceived = (payload: any) => {
        const payloadData = JSON.parse(payload.body);

        switch (payloadData.status) {
            case 'JOIN':
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case 'MESSAGE':
                // @ts-ignore
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    };

    const onPrivateMessage = (payload: any) => {
        const payloadData = JSON.parse(payload.body);

        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    };

    const onError = (error: any) => {
        console.log(error);
    };

    const handleMessage = (event: { target: { value: any; }; }) => {
        const {value} = event.target;
        setUserData({...userData, message: value});
    };

    const sendPrivateValue = () => {
        if (stompClient) {
            const chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: 'MESSAGE',
            };

            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
            setUserData({...userData, message: ''});
        }
    };

    const registerUser = () => {
        connect();
    };

    return (
        <>
            {userData.connected ? (
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
                                            <ListItemIcon>
                                                <Avatar {...userAvatar()}/>
                                            </ListItemIcon>
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
                                        {[...privateChats.keys()].map((name, index) => (
                                            <ListItemButton
                                                key={index}
                                                onClick={() => {
                                                    setTab(name);
                                                }}
                                                className={`member ${tab === name && 'active'}`}>
                                                <ListItemText primary={name}/>
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </div>
                            </Grid>
                            <Grid item xs={8} className={"messages"}>
                                {tab !== null ? (
                                        <div className="chat-content">
                                            <List>
                                                {[...privateChats.get(tab)].map((chat, index) => (
                                                    <ListItem
                                                        key={index}
                                                        className={`message ${chat.senderName !== userData.username && 'self'}`}>
                                                        <div className="message-data">{chat.message}</div>
                                                    </ListItem>
                                                ))}
                                            </List>
                                            <Grid container style={{padding: '20px'}} className={"type-field"}>
                                                <Grid item xs={10}>
                                                    <TextField id="outlined-basic-email" label="Type a message..."
                                                               onChange={handleMessage} value={userData.message} fullWidth/>
                                                </Grid>
                                                <Button className={"send"} variant="contained" onClick={sendPrivateValue}
                                                        endIcon={<SendIcon/>}>Send</Button>
                                            </Grid>
                                        </div>
                                    )
                                    :
                                    (<Typography className={"select-chat"} variant="h4">Select a chat</Typography>)}
                            </Grid>
                        </Grid>
                    </div>)
                : (
                    <div className="register">
                        <Button type="button" variant="contained" onClick={registerUser}>
                            Connect
                        </Button>
                    </div>)
            }
        </>
    );
}