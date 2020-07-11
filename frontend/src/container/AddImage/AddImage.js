import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../../component/Form/FormElement/FormElement";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {addImage} from "../../store/action/actionImage";
import {Alert} from "@material-ui/lab";

const AddImage = (props) => {
    const error = useSelector(state => state.images.error);
    const dispatch = useDispatch();

    const [images, setImages] = useState({
        category_id: props.match.params.id,
        title: '',
        description: '',
        reviewImage: '',
        image: ''
    });
    console.log(error);

    const inputChangeHandler = e => {
        setImages({...images, [e.target.name]: e.target.value})
    };

    const fileChangeHandler = e => {
        let blob = new Blob([e.target.files[0]], {type: `application/json/${e.target.files[0].type}`});
        let url = URL.createObjectURL(blob);

        setImages({...images, [e.target.name]: e.target.files[0], reviewImage: url})
    };


    const submitChangeHandler = e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(images).map(key => {
            if (key !== 'reviewImage') {
                formData.append(key, images[key])
            }
        });

        dispatch(addImage(formData))
    };

    const errorHandler = fieldName => {
            return error &&
                error.errors &&
                error.errors[fieldName].properties&&
                error.errors[fieldName].properties.message
    };

    return (
        <>
            <Grid container direction="column">
                <form onSubmit={submitChangeHandler}>
                    <Grid item xs>
                        <FormElement
                            value={images.title}
                            propertyName="title"
                            title="Title"
                            onChange={inputChangeHandler}
                            error={errorHandler('title')}
                        />
                    </Grid>
                    <Grid item xs>
                        <FormElement
                            value={images.description}
                            propertyName="description"
                            title="Description"
                            onChange={inputChangeHandler}
                            error={errorHandler('description')}
                        />
                    </Grid>
                    {
                        error && error.error && <Grid item xs>
                            <Alert severity="error">{error.error}</Alert>
                        </Grid>
                    }
                    <Grid item xs>
                        <FormElement
                            type="file"
                            title="Image"
                            propertyName="image"
                            value={images.reviewImage}
                            onChange={fileChangeHandler}
                        />
                    </Grid>
                    <Grid item xs>
                        <Button type="submit" variant="contained" color="primary" fullWidth>Add image</Button>
                    </Grid>
                </form>
            </Grid>
        </>
    );
};

export default AddImage;