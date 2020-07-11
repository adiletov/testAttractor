import React, {useState} from 'react';
import FormElement from "../Form/FormElement/FormElement";
import Button from "@material-ui/core/Button";
import {Grid} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {addCategory} from "../../store/action/actionCategory";

const AddCategory = () => {
    const [category, setCategory] = useState({
        title: ''
    });
    const dispatch = useDispatch();


    const inputChangeHandler = e => {
        setCategory({...category, [e.target.name]: e.target.value})
    };
    const submitChangeHandler = e => {
        e.preventDefault();
        dispatch(addCategory({title: category.title}))
    };

    return (
        <Grid container>
            <Grid item xs={3}>
                <Grid container direction="column">
                    <form onSubmit={submitChangeHandler}>
                        <Grid item xs>
                            <FormElement
                                value={category.title}
                                title="Title"
                                propertyName="title"
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                        <Grid item xs>
                            <Button fullWidth color="primary" variant="contained" type="submit">Add category</Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>

    );
};

export default AddCategory;