import React, {useEffect, useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Header from "../Header/Header";
import DrawerLayout from "../../component/DrawerLayout/DrawerLayout";
import Profile from "../Profile/Profile";
import AddCategory from "../../component/AddCategory/AddCategory";
import {NavLink, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "../../store/action/actionCategory";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import CategoryPage from "../CategoryPage/CategoryPage";
import AddImage from "../AddImage/AddImage";
import {getImages} from "../../store/action/actionImage";
import Images from "../Images/Images";



const GalleryPage = () => {
    const [drawer, setDrawer] = useState(false);
    const categories = useSelector(state => state.categories.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getImages());
    }, [dispatch]);

    const drawerControl = () => {
        setDrawer(!drawer)
    };
    const drawerContent = (
        categories && categories.map(category =>
            <List key={category._id}>
                <ListItem component={NavLink} to={`/categories/${category._id}`}>
                    <ListItemText primary={category.title}/>
                </ListItem>
            </List>
        )
    );
    return (
        <>
            <Header
                drawerControl={drawerControl}
            />
            <DrawerLayout drawerContent={drawerContent} bool={drawer} drawerControl={drawerControl}>
                <Route exact path={'/'} component={Images}/>
                <Route exact path={'/profile'} component={Profile}/>
                <Route exact path={'/category/add'} component={AddCategory}/>
                <Route exact path={'/categories/:id'} component={CategoryPage}/>
                <Route exact path={'/images/:id'} component={AddImage}/>
            </DrawerLayout>
        </>
    );
};

export default GalleryPage;