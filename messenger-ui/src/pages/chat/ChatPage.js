import React from 'react';
import {
    Avatar,
    Button,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import "./ChatPage.css";
import {Link} from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';

export default function ChatPage() {

    return (
        <div className={"chat-page"}>
            <div className="messenger-label">
                <img className={"icon"} src={"./images/messenger-big.png"} alt={"messenger-icon"}></img>
                <Typography className="label">Messenger</Typography>
                <div className={"log-out"}>
                    <Button className={"log-out-button"} variant="outlined" size="large"
                            component={Link} to="/login">
                        Log out
                    </Button>
                </div>
            </div>
            <Grid container component={Paper} className={"chat-card"}>
                <Grid item xs={3} className={"friends"}>
                    <List>
                        <ListItem key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg"/>
                            </ListItemIcon>
                            <ListItemText primary="John Wick"></ListItemText>
                        </ListItem>
                    </List>
                    <Grid item xs={12} style={{padding: '10px'}}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth/>
                    </Grid>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg"/>
                            </ListItemIcon>
                            <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                            <ListItemText secondary="online" align="right"></ListItemText>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={9} className={"messages"}>
                    <List>
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary="09:30"></ListItemText>
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