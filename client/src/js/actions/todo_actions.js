import api from '../api';

export const load = () => dispatch => {
    dispatch({
        type: 'TODOS_LOADING'
    });
    api.get('todos').then(res => {
        dispatch({
            type: 'TODOS_LOADED',
            data: res.data
        })
    }).catch(() => {
        dispatch({
            type: 'TODO_LOADING_ERROR'
        });
    });
};

export const addTodo = text => dispatch => {
    api.post('todos/add', {text}).then(res => {
        if (!res.data.error) {
            dispatch({
                type: 'TODO_ADDED',
                data: res.data
            });
        } else {
            dispatch({
                type: 'TODO_ADD_FAIL',
                error: res.data.error
            });
        }
    });
};

export const changePriority = id => dispatch => {
    api.post('todos/prioritize', {id}).then(res => {
        dispatch({
            type: 'TODOS_LOADED',
            data: res.data
        });
    });
};

export const removeAll = () => dispatch => {
    api.delete('todos').then(res => {
        dispatch({
            type: "TODOS_REMOVED",
            success: res.data.success
        });
    });
};

export const search = (query) => dispatch => {
    dispatch({
        type: "SEARCH_TODO",
        query
    });
};
