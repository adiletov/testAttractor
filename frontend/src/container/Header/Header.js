import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import UserMenu from "../../component/MenuHeader/UserMenu/UserMenu";
import {useDispatch, useSelector} from "react-redux";
import AnonymMenu from "../../component/MenuHeader/AnonymMenu/AnonymMenu";
import {NavLink} from "react-router-dom";
import {logoutUser} from "../../store/action/userActions";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = () => {
    const classes = useStyles();
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} component={NavLink} to={'/'} color="inherit" aria-label="menu">
                        <PhotoCameraIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Gallery
                    </Typography>
                    {user ? <UserMenu logout={()=>dispatch(logoutUser())}/> : <AnonymMenu/>}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;