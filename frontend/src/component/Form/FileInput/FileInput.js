import React, {createRef} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";


const useStyles = makeStyles(theme => ({
    input: {
        display: 'none',
    },
    avatar: {
        width: '100%',
        height: '500px'
    },
}));

const FileInput = ({propertyName, onChange,value}) => {
    const classes = useStyles();
    console.log(value);
    const inputRef = createRef();

    const activateInput = () => {
        inputRef.current.click();
    };

    let avatarBlock = <Avatar variant="square" className={classes.avatar} onClick={activateInput}/>;

    if (value){
        avatarBlock = <Avatar variant="square" src={value} className={classes.avatar} onClick={activateInput}/>
    }
    return (
        <>
            <input
                type="file"
                name={propertyName}
                className={classes.input}
                onChange={onChange}
                ref={inputRef}
            />
            <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item xs>
                    {avatarBlock}
                </Grid>
            </Grid>
        </>
    );
};

export default FileInput;