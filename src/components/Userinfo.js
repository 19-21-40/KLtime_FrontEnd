import React, { useContext } from 'react';
import { UserState } from '../context/UserInfoContext';

function User({ user }) {
  return (
    <div>
      {/* <span>{user.stdnum}</span>
      <span>{user.password}</span> 
      <span>{user.department}</span>
      <span>{user.email}</span> */}
      <span>{user.name}</span>
      <span>{user.section}</span> 
      <span>{user.sectionDetail}</span>
      <span>{user.level}</span>
      <span>{user.credit}</span>
    </div>
  );
}

function UserList() {
  const userInfoState = useContext(UserState);
  console.log(userInfoState.users);
  return (
    <div>
      {userInfoState.users.map(user => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default UserList;