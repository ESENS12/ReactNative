import { ADD_TODO, COMPLETE_TODO, RESTORE_TODO, VisibilityFilters, SET_VISIBILITY_FILTER } from './actions';
import { combineReducers } from 'redux';

const { SHOW_ALL } = VisibilityFilters;

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [...state, {
                text: action.text,
                completed: false
            }];

        case COMPLETE_TODO:
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    completed: true
                }),
                ...state.slice(action.index + 1)
            ];


        case RESTORE_TODO:
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    completed: false
                }),
                ...state.slice(action.index + 1)
            ];

        default:
            return state;
    }
}

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;

        default:
            return state;
    }
}

const todoApp = combineReducers({
    visibilityFilter,
    todos
});

export default todoApp;
