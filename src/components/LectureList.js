import { useEffect, useState } from "react";
import Lecture from "./Lecture";
//추가
import { useUserTableState, useUserTableDispatch} from '../context/UserTableContext'; 
import styled ,{css}  from "styled-components";
import axios from "axios";

//styled-components

const LectureList_container = styled.div`
  position: relative;
  
  display: flex;
  justify-content:center;
`

const DualMode=styled.div`
  ${props =>
    props.isCardMode ?''
    :
    css`
      /* 10+770+10 */
      width: 790px; 
    `
  }
  width: 640px; //추가
`;
const LineTablehead=styled.div`
  font-size: 16px;
  border-top: 1px solid rgba(167, 168, 169, 0.8);
  padding: 12px 0 12px 10px;
  span{
    width: 90px;
    // float: left;
    display: inline-flex;
    padding-right: 12px;
    font-size: 14px;
    // background-color: aqua;
  }
`;
const ToggleBtn=styled.button`
  top: 130px;
  left: 500px;
  background-color: #eeeeee;
  border: 2px solid #172774;
  border-radius: 10px;
  width: 70px;
  height: 30px;
  // position: absolute;
  transition: 0.3s;
`;
const LineTable=styled.div`
  ${props=>
    props.isCardMode?
    css`
      display: grid;
      grid-template-rows:1fr;
      grid-template-columns:1fr 1fr 1fr;
    `
    :
    ``
  }
  
`;

function LectureList({
}) {
  
  const [isCardMode,setIsCardMode]=useState(false); //토글버튼 만들 때 쓰일 것

  //추가
  const dispatch=useUserTableDispatch();
  const state=useUserTableState();
  const selectedLectures=state.totalTimeTable.find(timeTable=>timeTable.id===state.selectedId).lectureList
  const [clickeds,setClickeds]=useState(state.searchedLectures.map(seachedLecture=>selectedLectures.some(lecture=>lecture.id===seachedLecture.id)));

  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  useEffect(()=>{
    setClickeds(state.searchedLectures.map(seachedLecture=>selectedLectures.some(lecture=>lecture.id===seachedLecture.id)));

  },[state.selectedId, state.totalTimeTable])

  

  const onClick = (index, lectureId) => {
    //추가
    
    dispatch({
      type: 'ADD_LECTURE',
      lecture:state.searchedLectures[index],
    });
    const currentTableName = state.totalTimeTable.find( timeTable => timeTable.id == state.selectedId ).tableName;

    console.log(`http://localhost:8080/api/timetable/${state.currentSet.year}/${state.currentSet.semester}/addLecture/${currentTableName}/${lectureId}`);
    if (accessToken && accessToken !== null) {
      axios.post(`http://localhost:8080/api/timetable/${state.currentSet.year}/${state.currentSet.semester}/addLecture/${currentTableName}/${lectureId}`,
       null,{
              headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                  'Accept': '*/*',
                  'Authorization': "Bearer " + accessToken,
              }, withCredentials: true,
          }).then(res=> {
          }
          );

      // response가 오면 

    };
  }

  const onHovered=(index)=>{
    //추가
    dispatch({
      type: 'PREVIEW_LECTURE',
      id:state.searchedLectures[index].id,
    })
  }

  return (
    <LectureList_container>
      {/* <ToggleBtn onClick={()=>{setIsCardMode(!isCardMode)}} /> */}
      <DualMode isCardMode={isCardMode}>
        <LineTablehead>
            <span>
              <strong>교과목명</strong>
            </span>
            <span>
              <strong>교수명</strong>
            </span>
            <span>
              <strong>영역</strong>
            </span>
            <span>
              <strong>시간</strong>
            </span>
            <span>
              <strong>난이도</strong>
            </span>
            <span>
              <strong>구분</strong>
            </span>
            <span>
              <strong>학점</strong>
            </span>
        </LineTablehead>
        <div style={
            {overflowY: 'scroll',
            height:'300px'
        }} 
        >
        <LineTable isCardMode={isCardMode}>
        
            {state.searchedLectures.map((searchedLecture, index) => (
                <Lecture
                lecture={searchedLecture} //추가
                key={searchedLecture.id} 
                isCardMode={isCardMode}
                isListMode={true}//수정
                onClick={() => onClick(index, searchedLecture.id)}
                onHovered={()=>onHovered(index)}//수정
                isClicked={clickeds[index]}
                />
            ))}
        </LineTable>
        </div>

      </DualMode>
    </LectureList_container>
  );
}

export default LectureList;