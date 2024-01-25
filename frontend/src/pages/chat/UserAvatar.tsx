import {Avatar, Badge, ListItemIcon, styled} from "@mui/material";
import React, {FC} from "react";

interface User {
    currentUserName?: string;
    isOnline: boolean;
}

const UserAvatar: FC<User> = (props: User) => {
    const StyledBadge = styled(Badge)(({theme}) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: -1,
                left: -1,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    function userAvatar(userName: string | any) {
        return {
            sx: {
                // bgcolor: props.currentUserName === userName?.data.username ? 'info.main' : 'secondary.main',
                bgcolor:  'info.main',
            },
            children: `${userName.split(' ')[0][0]}`
        };
    }

    return (
        <ListItemIcon>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                variant="dot"
            >
                <Avatar {...userAvatar(props.currentUserName)}/>
            </StyledBadge>
        </ListItemIcon>
    );
}

export default UserAvatar;