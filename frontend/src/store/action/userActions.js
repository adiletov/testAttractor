import {CHANGE_USER_ERROR, CHANGE_USER_REQUEST, CHANGE_USER_SUCCESS} from "./actionType";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {push} from "connected-react-router";


export const changeUserSuccess = user => ({type: CHANGE_USER_SUCCESS, user});
export const changeUserRequest = () => ({type: CHANGE_USER_REQUEST});
export const changeUserError = error => ({type: CHANGE_USER_ERROR, error});

export const registerUser = userData => {
    return async (dispatch) =>{
        try{
            dispatch(changeUserRequest());
            const res = await axiosApi.post('/users', userData);
            toast.success(res.data.message);
            dispatch(changeUserSuccess(res.data.user));
            dispatch(push('/'))
        }catch (e) {
            if (e.response && e.response.data){
                dispatch(changeUserError(e.response.data))
            }else{
                dispatch(changeUserError({global: 'Server error!!!'}))
            }
        }
    }
};

export const loginUser = userData => {
    return async (dispatch ) =>{
        try{
            dispatch(changeUserRequest());
            const res = await axiosApi.post('/users/sessions', userData);
            toast.success(res.data.message);
            dispatch(changeUserSuccess(res.data.user));
            dispatch(push('/'))
        }catch (e) {
            if (e.response && e.response.data){
                dispatch(changeUserError(e.response.data))
            }else{
                dispatch(changeUserError({global: 'Server error!!!'}))
            }
        }
    }
};

export const logoutUser = () => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': 'Token ' + token}};

        const res = await axiosApi.delete('/users/sessions', config);
        dispatch(changeUserSuccess(null));
        toast.success(res.data.message);
        dispatch(push('/'));
    }
};

export const changePassword  = userPassword => {
  return async (dispatch, getState) => {
      const token = getState().users.user.token;
      const config = {headers: {'Authorization': 'Token ' + token}};
      try {
          const res = await axiosApi.post('/users/changePassword',  userPassword, config);
          toast.success(res.data.message);
          dispatch(changeUserSuccess(res.data.user))
      }catch (e) {
          if (e.response && e.response.data){
              console.log(e.response.data);
              dispatch(changeUserError(e.response.data))
          }else{
              dispatch(changeUserError({global: 'Server error!!!'}))
          }
      }
  }
};

export const changeProfile = username => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': 'Token ' + token}};
        try {
            const res = await axiosApi.post('/users/changeProfile',  username, config);
            toast.success(res.data.message);
            dispatch(changeUserSuccess(res.data.user))
        }catch (e) {
            if (e.response && e.response.data){
                dispatch(changeUserError(e.response.data))
            }else{
                dispatch(changeUserError({global: 'Server error!!!'}))
            }
        }
    }
};

