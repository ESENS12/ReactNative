/**
 *  일반적으로 공용 사용 하기 위한 일종의 Common이나.. 뭐 enum class 같은 개념으로 사용
 * **/


export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const RESTORE_TODO = 'RESTORE_TODO';

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export function addTodo(text) {
    return {
        type: ADD_TODO,
        text
    }
}

export function completeTodo(index) {
    return {
        type: COMPLETE_TODO,
        index
    }
};

export function restoreTodo(index) {
    return {
        type: RESTORE_TODO,
        index
    }
};

export function setVisibilityFilter(filter) {
    return {
        type: SET_VISIBILITY_FILTER,
        filter
    }
};
