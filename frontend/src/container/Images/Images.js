import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getImages} from "../../store/action/actionImage";
import Grid from "@material-ui/core/Grid";
import CardImage from "../../component/CardImage/CardImage";

const Images = () => {
    const images = useSelector(state => state.images.images);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getImages());
    }, [dispatch]);
    console.log(images);
    return (
           <Grid container>
               {images && images.map(image => <Grid item xs key={image._id}>
                   <CardImage
                       title={image.title}
                       description={image.description}
                       image={image.image}
                   />
               </Grid>
               )}
           </Grid>
    );
};

export default Images;