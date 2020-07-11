import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import FormElement from "../../component/Form/FormElement/FormElement";
import {changePassword, changeProfile} from "../../store/action/userActions";

const Profile = () => {
        const user = useSelector(state => state.users.user);
        const error = useSelector(state => state.users.error);
        const dispatch = useDispatch();

        const [userData, setUser] = useState({
            username: user.username,
            boolUsername: false,
            boolPassword: false,
            oldPassword: '',
            newPassword: '',
        });

        const inputChangeHandler = (e) => {
            setUser({...userData, [e.target.name]: e.target.value})
        };
        const editHandler = (field) => {
            if (field === 'boolPassword') {
                setUser({...userData, boolPassword: true, boolUsername: false})
            } else if (field === 'all') {
                setUser({...userData, boolPassword: false, boolUsername: false})
            } else {
                setUser({...userData, boolPassword: false, boolUsername: true})
            }
        };

        const buttonValidate = () => {
            if (userData.boolPassword){
                return dispatch(changePassword({
                    oldPassword: userData.oldPassword,
                    newPassword: userData.newPassword
                }))
            }else{
                return dispatch(changeProfile({
                    username: userData.username
                }))
            }
        };

        const errorHandler = (fieldName) =>{
            if (fieldName === 'oldPassword' || fieldName === 'newPassword'){
                return error && error[fieldName]
            }
            return error &&
                error.errors &&
                error.errors.username &&
                error.errors.username.properties.message
        };
        return (
            <>
                <Grid container>
                    <Grid item xs={4}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item xs>
                                {
                                    userData.boolUsername ? <FormElement
                                            value={userData.username}
                                            propertyName="username"
                                            onChange={inputChangeHandler}
                                            title="Username"
                                            error={errorHandler()}

                                        /> :
                                        <Typography>Username : {userData.username}
                                            <IconButton onClick={() => editHandler('boolUsername')}>
                                                <EditIcon/>
                                            </IconButton>
                                        </Typography>
                                }
                            </Grid>
                            <Grid item xs>
                                {
                                    userData.boolPassword ?
                                        <Grid container spacing={1} direction="column">
                                            <Grid item xs>
                                                <FormElement
                                                    value={userData.oldPassword}
                                                    propertyName="oldPassword"
                                                    onChange={inputChangeHandler}
                                                    title="oldPassword"
                                                    error={errorHandler('oldPassword')}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <FormElement
                                                    value={userData.newPassword}
                                                    propertyName="newPassword"
                                                    onChange={inputChangeHandler}
                                                    title="newPassword"
                                                    error={errorHandler('newPassword')}
                                                />
                                            </Grid>
                                        </Grid> :
                                        <Button color="primary" onClick={() => editHandler('boolPassword')}>
                                            Change password
                                        </Button>
                                }
                            </Grid>
                            {
                                (userData.boolUsername || userData.boolPassword) &&
                                <Grid container spacing={1}>
                                    <Grid item xs>
                                        <Button fullWidth variant="contained" color="primary"
                                                onClick={() => buttonValidate()}>Edit</Button>
                                    </Grid>
                                    <Grid item xs>
                                        <Button fullWidth variant="contained" color="primary"
                                                onClick={() => editHandler('all')}>Cancel</Button>
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
;

export default Profile;