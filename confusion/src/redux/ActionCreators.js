import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment=(dishId,rating,author,comment)=>({
    type: ActionTypes.ADD_COMMENT,
    payload:{
        dishId:dishId,
        rating:rating,
        author:author,
        comment:comment
    }
});
/*-----------------------Dishes----------------------*/
export const fetchDishes=()=>(dispatch)=>{
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)));
}

export const dishesLoading=()=>({
    type:ActionTypes.DISHES_LOADING
});

export const dishesFailed=(errmess)=>({
    type:ActionTypes.DISHES_FAILED,
    payload:errmess
});

export const addDishes=(dishes)=>({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});
/*-------------------------Comments-------------------- */
export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});
/*-------------------------Promotions----------------------- */
export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});
/*-----------------------------Leaders--------------------------- */
export const fetchLead = () => (dispatch) => {
    
    dispatch(leadLoading());

    return fetch(baseUrl + 'leaders')
    .then(response => response.json())
    .then(lead => dispatch(addlead(lead)));
}

export const leadLoading = () => ({
    type: ActionTypes.LEAD_LOADING
});

export const leadFailed = (errmess) => ({
    type: ActionTypes.LEAD_FAILED,
    payload: errmess
});

export const addlead = (lead) => ({
    type: ActionTypes.ADD_LEAD,
    payload: lead
});

/*-----------FeedBack------------ */
export const postFeedback = (feedback) => (dispatch) => {
    const newFeedback = Object.assign({ date: new Date().toISOString() }, feedback);
    
    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return(response);
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;

                throw error;
            }
        },
            error => {
                var errorMessage = new Error(error.errorMessage);
                throw errorMessage;
            }
        )
        .then(response => response.json())
        .then(response => alert(JSON.stringify(response)))
        .catch(error => {
            console.log('Post feedback: ' + error.message);
            alert('Feedback could not be posted:\n' + error.message)
        })
};