import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {apiURL} from "../../apiURL";
import {useDispatch} from "react-redux";
import {getImageCategory, removeImage} from "../../store/action/actionImage";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const CardImage = ({title, image, description, id}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={apiURL + '/uploads/' + image}
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Change image
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(removeImage(id))}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default CardImage;