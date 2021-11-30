import {GET_DEVICE_DATA, GET_DATA_SUCCESS} from '../constants/ActionType'

const getData = (payload)=>{
    return {
        type: GET_DEVICE_DATA, 
        payload
    }
}

const getDataSuccess = (payload)=>{
    return {
        type: GET_DATA_SUCCESS,
        payload
    }
}
export {getData, getDataSuccess}