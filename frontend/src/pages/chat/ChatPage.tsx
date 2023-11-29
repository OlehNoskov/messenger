import React, {useEffect, useState} from 'react';
import {
    Alert,
    Avatar,
    Button,
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from "@mui/material";
import "./ChatPage.css";
import {Link} from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import {useAuth} from "../../service/AuthContext";
import {bearerAuth, findUserByUsername} from "../../service/Service";
import {handleLogError} from "../../service/HendlerErrors";
import {deepPurple} from "@mui/material/colors";
import {User} from "../../dto/User";

export default function ChatPage() {
    const Auth = useAuth()
    const user = Auth.getUser()

    const [userName, setUserName] = useState('');
    const [friends, setFriends] = useState<User[]>([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        window.localStorage.setItem("name", userName);
    }, []);

    const isSearchUserButtonDisable = (): boolean => {
        return userName.length < 2;
    }

    const logout = () => {
        Auth.userLogout();
    }

    const getFriend = async () => {
        try {
            const newFriends = await findUserByUsername(user, userName);
            const users: User[] = newFriends.data;

            setFriends(users);
            setIsError(false);

            console.log(bearerAuth(user));

        } catch (error) {
            handleLogError(error);
            setIsError(true);
            setFriends([]);
        }
    }

    function stringAvatar() {
        return {
            sx: {
                bgcolor: deepPurple[500],
            },
            children: user != null ? `${user?.data.username.split(' ')[0][0]}` : null
        };
    }

    const menuItemFriends = friends?.map(friend => (
        <MenuItem key={friend.username} >{friend.username}</MenuItem>
    ));

    const addFriendAndHideSelect = () => {
        setFriends([]);
    }

    return (
        <div className={"chat-page"}>
            <div className="messenger-label">
                <img className={"icon"} src={"./images/messenger-big.png"} alt={"messenger-icon"}>

                </img>
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
                                    <Avatar {...stringAvatar()}/>
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
                                <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth
                                           helperText={isSearchUserButtonDisable() && userName.length > 0
                                               ? "Length of Username must be more than 2 characters!"
                                               : null}
                                           onChange={(value) => {
                                               setUserName(value.target.value);
                                           }}/>
                            </Grid>
                            <Grid item xs={3} style={{padding: '10px'}}>
                                <Button variant="outlined"
                                        size="large"
                                        disabled={isSearchUserButtonDisable()}
                                        onClick={() => getFriend()}>Search</Button>
                            </Grid>
                        </div>
                        {friends.length > 0 &&
                            <div className={"search-friend"}>
                                <Grid item xs={9} style={{padding: '10px'}}>
                                    <FormControl fullWidth>
                                        <InputLabel id="select-friends">Friends</InputLabel>
                                        <Select
                                            labelId="select-friends"
                                            id="select-friends"
                                            // onChange={handleChange}
                                            label="Friends">
                                            {menuItemFriends}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3} style={{padding: '10px'}}>
                                    <Button className={"add-friend-button"} variant="outlined" size="large"
                                            onClick={addFriendAndHideSelect}>
                                        Add friend
                                    </Button>
                                </Grid>
                            </div>
                        }
                    </div>
                    <div className={"chats"}>
                        {/*<List>*/}
                        {/*    <ListItem key="RemySharp">*/}
                        {/*        <ListItemIcon>*/}
                        {/*            <Avatar/>*/}
                        {/*        </ListItemIcon>*/}
                        {/*        <ListItemText secondary="online"></ListItemText>*/}
                        {/*    </ListItem>*/}
                        {/*</List>*/}
                    </div>
                </Grid>
                <Grid item xs={8} className={" messages"}>
                    <List>
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    {/*<ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>*/}
                                    <ListItemText primary="Hey man, What's up ?"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    {/*<ListItemText align="right" secondary="09:30"></ListItemText>*/}
                                    <ListItemText secondary="09:30"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                    <Grid container style={{padding: '20px'}} className={"type-field"}>
                        <Grid item xs={10}>
                            <TextField id="outlined-basic-email" label="Type a message..." fullWidth/>
                        </Grid>
                        <Button className={"send"} variant="contained" endIcon={<SendIcon/>}>Send</Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}