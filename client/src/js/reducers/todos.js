import alertify from 'alertify.js';

const initialState = [];

alertify.logPosition("bottom right");

export default function todos(state = initialState, action) {
    switch (action.type) {
        case 'TODOS_LOADED':
            return action.data;
        case 'TODO_ADDED':
            alertify.success("Todo added");
            return action.data;
        case 'TODO_ADD_FAIL':
            alertify.error(action.error);
            return state;
        case 'SEARCH_TODO':
            if (action.query) {
                return state.filter(todo => todo.text.includes(action.query));
            }
            return state;
        case 'TODOS_REMOVED':
            if (action.success) {
                alertify.success("Todos removed successfully");
                return initialState;
            } else {
                alertify.error("Error while removing todos");
                return state;
            }
        default:
            return state;
    }
};
