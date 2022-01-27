/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    userInfo: {},
  },
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.userInfo = '';
      console.log(state.userInfo);
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit'

// const todosSlice = createSlice({
//   name: 'todos',
//   initialState: [],
//   reducers: {
//     addTodo(state, action) {
//       const { id, text } = action.payload
//       state.push({ id, text, completed: false })
//     },
//     toggleTodo(state, action) {
//       const todo = state.find(todo => todo.id === action.payload)
//       if (todo) {
//         todo.completed = !todo.completed
//       }
//     }
//   }
// })

// export const { addTodo, toggleTodo } = todosSlice.actions

// export default todosSlice.reducer
