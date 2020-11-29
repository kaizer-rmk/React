import  * as ActionTypes from './ActionTypes';

export const Leaders=(state={isLoading:true,errMess:null,leaders:[]},action)=>{
    switch(action.type){
        case ActionTypes.ADD_LEAD:
            return{...state,isLoading:false,errMess:null,leaders:action.payload};
        case ActionTypes.LEAD_LOADING:
            return{...state,isLoading:true,errMess:null,leaders:[]};
        case ActionTypes.LEAD_FAILED:
            return{...state,isLoading:false,errMess:action.payload};
        default:
            return state;
    }
}