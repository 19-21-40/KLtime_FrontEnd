import React, { useContext } from 'react';
import { UserState } from '../context/UserInfoContext';

function Lecture({ lecture }) {
  return (
    <div>
      <span>{lecture.name}</span>
      <span>{lecture.section}</span> 
      <span>{lecture.sectionDetail}</span>
      <span>{lecture.level}</span>
      <span>{lecture.credit}</span>
    </div>
  );
}

function LectureList_test() {
  const lectureInfoState = useContext(UserState);
  console.log(lectureInfoState.users);
  return (
    <div>
      {lectureInfoState.users.map(lecture => (
        <Lecture lecture={lecture} key={lecture.id} />
      ))}
    </div>
  );
}

export default LectureList_test;