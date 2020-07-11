import {
    ADD_IMAGE_ERROR,
    ADD_IMAGE_REQUEST,
    ADD_IMAGE_SUCCESS,
    GET_IMAGES_ID_SUCCESS,
    GET_IMAGES_SUCCESS
} from "./actionType";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {push} from "connected-react-router";

export const addImageSuccess = () => ({type: ADD_IMAGE_SUCCESS});
export const addImageRequest = () => ({type: ADD_IMAGE_REQUEST});
export const addImageError = error => ({type: ADD_IMAGE_ERROR, error});

export const getImagesSuccess = images => ({type: GET_IMAGES_SUCCESS, images});
export const getImagesIdSuccess = images => ({type: GET_IMAGES_ID_SUCCESS, images});

export const addImage = image => {
    return async (dispatch, getState) =>{
        const token = getState().users.user.token;
        const config = {headers: {'Authorization' : 'Token ' + token}};
        try{
            dispatch(addImageRequest());
            const res = await axiosApi.post('/images', image, config);
            toast.success(res.data.message);
            dispatch(addImageSuccess());
            dispatch(push('/'))
        }catch (e) {
            dispatch(addImageRequest());
            if(e.response && e.response.data){
                dispatch(addImageError(e.response.data))
            }else{
                dispatch(addImageError({global: 'Server error'}))
            }
        }
    }
};

export const getImages = () => {
  return async (dispatch) =>{
      try{
          dispatch(addImageRequest());
          const res = await axiosApi.get('/images');
          dispatch(getImagesSuccess(res.data))
      }catch (e) {
          dispatch(addImageRequest());
          if(e.response && e.response.data){
              dispatch(addImageError(e.response.data))
          }else{
              dispatch(addImageError({global: 'Server error'}))
          }
      }
  }
};

export const getImageCategory = id => {
    return async (dispatch) => {
        try{
            dispatch(addImageRequest());
            const res = await axiosApi.get('/images/' + id);
            dispatch(getImagesIdSuccess(res.data))
        }catch (e) {
            dispatch(addImageRequest());
            if(e.response && e.response.data){
                dispatch(addImageError(e.response.data))
            }else{
                dispatch(addImageError({global: 'Server error'}))
            }
        }
    }
};

export const removeImage = id => {
    return async (dispatch) => {
        try{
            dispatch(addImageRequest());
            const res = await axiosApi.delete('/images/' + id);
            toast.success(res.data.message);
            dispatch(addImageSuccess());
        }catch (e) {
            dispatch(addImageRequest());
            if(e.response && e.response.data){
                dispatch(addImageError(e.response.data))
            }else{
                dispatch(addImageError({global: 'Server error'}))
            }
        }
    }
};