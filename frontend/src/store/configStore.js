import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware} from "connected-react-router";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducer/userReducer";
import {loadFromLocalStorage, saveToLocalStorage} from "./configLocalStorage";
import categoryReducer from "./reducer/categoryReducer";
import imagesReducer from "./reducer/imagesReducer";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    users: userReducer,
    categories : categoryReducer,
    images: imagesReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
    thunk,
    routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedSate = loadFromLocalStorage();

const store = createStore(rootReducer, persistedSate,  enhancers);
store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user
        }
    });
});



export default store;