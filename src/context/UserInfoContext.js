import React, { useRef, useReducer, useMemo, useCallback , createContext} from 'react';
import SignupFrom from '../components/SignUp';
import UserList from '../components/Userinfo';

const initialState = {
  inputs: {
    stdnum: '',
    password: '',
    pw_c: '',
    department: '',
    email: '',
  }
};


function userinfoReducer(state,action){
  switch(action.type){
    case 'CREATE_USER':
      return {
        users: state.users.concat(action.user)
      };
    default:
      return state;
  }
}

// const UserInfoStateContext=createContext();
// const UserInfoDispatchContext=createContext();

// export function UserInfoProvider({ children }) {
//   const [state, dispatch] = useReducer(userinfoReducer, initialState);
//   return (
//     <UserInfoStateContext.Provider value={state}>
//       <UserInfoDispatchContext.Provider value={dispatch}>
//         {children}
//       </UserInfoDispatchContext.Provider>
//     </UserInfoStateContext.Provider>
//   );
// }

// export function useUserInfoState() {
//   return useContext(UserInfoStateContext);
// }

// export function useUserInfoDispatch() {
//   return useContext(UserInfoDispatchContext);
// }

export const UserDispatch = createContext(null);
export const UserState = createContext(null);

export function UserInfoProvider({ children }) {
  const [state, dispatch] = useReducer(userinfoReducer, initialState);
  
  const { users } = state;
  // const nextId = useRef(4);

  // const onChange = useCallback(e => {
  //   const { name, value } = e.target;
  //   dispatch({
  //     type: 'CHANGE_INPUT',
  //     name,
  //     value
  //   });
  // }, []);
  
  // const onClick = useCallback(() => {
  //   dispatch({
  //     type: 'CREATE_USER',
  //     user: {
  //       id: nextId.current,
  //       stdnum,
  //       password,
  //       department,
  //       email
  //     }
  //   });
  //   nextId.current += 1;
  // }, [stdnum, password, department, email]);

  return (
    <div>
      <UserState.Provider value={state}>
        <UserDispatch.Provider value={dispatch} >
          {children}
          {/* <UserList users={users} /> */}
        </UserDispatch.Provider>
      </UserState.Provider>
    </div>
  );
}

export default UserInfoProvider;