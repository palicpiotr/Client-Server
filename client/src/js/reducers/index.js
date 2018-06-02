import {combineReducers} from 'redux';

import todos from './todos';
import {isLoading, isError} from './loading';

export default combineReducers({
    todos,
    isLoading,
    isError
});
