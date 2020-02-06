# TodoList Sample   
- Simple TodoList using redux 


# References
- https://redux.js.org/basics/example/
- https://github.com/MS-Harine/react-native-redux-todo-example/

# Components
- npm install react-redux redux react-dom

# 이해를 위해..
- 상위<->하위 컴포넌트들의 각 상태(state..)가 난잡하게 엮여있기 때문에 규모가 커지면 상태관리가 어려워짐.
- Redux를 사용해서 전체 state는 redux가 관리, react에서는 전달받은 상태값에 따라 view 로직만 사용(V,C 분리 개념)
- 기본적으로는 그냥 props를 통해 상위컴포넌트가 onclick같은 함수를 전달하는것과 비슷한데,
- 결과적으로는 모든 상태변경 이벤트는 actions에 정의된 놈으로 전달하고, reducers가 관리(provider)하기 때문에 명확하게 관리가 가능
