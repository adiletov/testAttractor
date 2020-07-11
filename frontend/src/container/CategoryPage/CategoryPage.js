import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import {getImageCategory} from "../../store/action/actionImage";
import CardImage from "../../component/CardImage/CardImage";

const CategoryPage = (props) => {
    const categories = useSelector(state => state.categories.categories);
    const category = categories.filter(category => category._id === props.match.params.id)[0];
    const images = useSelector(state => state.images.imagesId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getImageCategory(props.match.params.id))
    }, [dispatch, props.match.params.id]);

    return (
        <Grid container direction="column">
            <Grid item xs>
                <Typography>{category && category.title}</Typography>
            </Grid>
            <Grid item xs>
                <Grid container justify="space-between">
                    <Grid item xs>

                    </Grid>
                    <Grid item xs>
                        <Button variant="contained" component={NavLink} to={`/images/${category && category._id}`}>Add
                            image</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs>
                <Grid container>
                    {
                        images && images.map(image => <Grid item xs key={image._id}>
                                <CardImage
                                    image={image.image}
                                    description={image.description}
                                    title={image.title}
                                    id={image._id}
                                />
                            </Grid>
                        )
                    }
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CategoryPage;