import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions';
import { SafeAreaView } from 'react-native';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

// 컨테이너 뷰는 동작 로직 담당, dom 관리나 스타일은 거의 없음,
// components는 프레젠테이셔널 뷰(dumb components)-> view에만 집중


class Main extends Component {
    render() {
        const { dispatch, visibilityFilter, visibleTodos } = this.props;
        return (
            <SafeAreaView style={{marginTop: 22}}>
                {/** 각 components 등록 **/}
                <AddTodo
                    onAddClick={text => dispatch(addTodo(text))} />

                <TodoList
                    todos={visibleTodos}
                    onTodoClick={index => {dispatch(completeTodo(index))}} />

                <Footer
                    filter={visibilityFilter}
                    onFilterChange={nextFilter => dispatch(setVisibilityFilter(nextFilter))} />

            </SafeAreaView>
        );
    }
}

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
    }
}

function select(state) {
    return {
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    };
}

export default connect(select)(Main);
