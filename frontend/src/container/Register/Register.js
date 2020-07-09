import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import Alert from "@material-ui/lab/Alert";
import FormElement from "../../component/Form/FormElement/FormElement";
import {changeUserError, loginUser, registerUser} from "../../store/action/userActions";
import Button from "@material-ui/core/Button";


class Register extends Component {
    state = {
        username: '',
        password: '',
    };

    inputChangeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.path !== this.props.match.path) this.props.changeUserError(null);
    }


    errorHandler = (fieldName) => {
        if (this.props.match.path === '/register'){
            return (
                this.props.error &&
                this.props.error.errors &&
                this.props.error.errors[fieldName] &&
                this.props.error.errors[fieldName].properties &&
                this.props.error.errors[fieldName].properties.message
            );
        }
    };



    buttonPath = () => {
        if (this.props.match.path === '/register'){
            return <Button fullWidth type="submit" variant="contained" color="primary">Register </Button>
        }else{
            return <Button fullWidth type="submit" variant="contained" color="primary">Login </Button>
        }
    };
    submitChangeHandler = (e) => {
        e.preventDefault();
        if (this.props.match.path === '/register'){
            this.props.registerUser({...this.state});
        }else{
            this.props.loginUser({...this.state});
        }
    };



    render() {
        return (
            <Grid container alignItems="center" justify="center" style={{height: '100vh'}}>
                <Grid item xs={4}>
                        <form onSubmit={this.submitChangeHandler}>
                            {this.props.error && this.props.error.global && (
                                <Alert color="warning">
                                    {this.props.error.global}
                                </Alert>
                            )}
                            {
                                this.props.match.path === '/login' &&  this.props.error && this.props.error.message && (
                                    <Alert color="warning">
                                        {this.props.error.message}
                                    </Alert>
                                )
                            }

                            <Grid container spacing={2} direction="column">
                                <Grid item xs>
                                    <FormElement
                                        type="text"
                                        propertyName="username"
                                        value={this.state.username}
                                        title="Username"
                                        onChange={this.inputChangeHandler}
                                        error={this.errorHandler('username')}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <FormElement
                                        type="password"
                                        propertyName="password"
                                        value={this.state.password}
                                        title="Password"
                                        onChange={this.inputChangeHandler}
                                        error={this.errorHandler('password')}
                                    />
                                </Grid>
                                <Grid item xs>
                                    {this.buttonPath()}
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.error
});

const mapDispatchToProps = dispatch => ({
    loginUser: user => dispatch(loginUser(user)),
    registerUser: user => dispatch(registerUser(user)),
    changeUserError : (error) => dispatch(changeUserError(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);