import React, { useRef, useReducer, useMemo, useContext, createContext } from 'react';

const initialState = {
    name:'',
    number:'',
    semester:'',
    grade:0,
    department: '',
    email: '',
    multiMajor:'',
    multDept:''
  };


function userinfoReducer(state, action) {
  switch (action.type) {
    case 'LOAD_USER':
      return {
        ...state,
        name:action.name,
        number:action.number,
        email:action.email,
        grade:action.grade,
        department:action.departmentName
      }
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}



const UserInfoDispatchContext = createContext();
const UserInfoStateContext = createContext();

export function UserInfoProvider({ children }) {
  const [state, dispatch] = useReducer(userinfoReducer, initialState);

  return (
    <div>
      <UserInfoStateContext.Provider value={state}>
        <UserInfoDispatchContext.Provider value={dispatch} >
          {children}
        </UserInfoDispatchContext.Provider>
      </UserInfoStateContext.Provider>
    </div>
  );
}

export function useUserInfoState() {
  return useContext(UserInfoStateContext);
}

export function useUserInfoDispatch() {
  return useContext(UserInfoDispatchContext);
}