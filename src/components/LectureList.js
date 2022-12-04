import { useEffect, useState } from "react";
import Lecture from "./Lecture";
//추가
import { useUserTableState, useUserTableDispatch} from '../context/UserTableContext';
import { useUserInfoState } from "../context/UserInfoContext"; 
import styled ,{css}  from "styled-components";
import axios from "axios";
import { hover } from "@testing-library/user-event/dist/hover";

//styled-components

const LectureListContainer = styled.div`
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

function LectureList({fold, setOpenNotice, setNotice
}) {
  
  const [isCardMode,setIsCardMode]=useState(false); //토글버튼 만들 때 쓰일 것

  //추가
  const dispatch=useUserTableDispatch();
  const state=useUserTableState();
  const userInfo = useUserInfoState();

  const selectedLectures=state.totalTimeTable.find(timeTable=>timeTable.id===state.selectedId).lectureList
  const [clickeds,setClickeds]=useState(state.searchedLectures.map(seachedLecture=>selectedLectures.some(lecture=>lecture.id===seachedLecture.id)));


  //추가(수연)
  const [hovereds,setHovereds]=useState(state.searchedLectures.map(()=>false));

  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  useEffect(()=>{
    setClickeds(state.searchedLectures.map(seachedLecture=>selectedLectures.some(lecture=>lecture.id===seachedLecture.id)));
  },[state.selectedId, state.totalTimeTable])

  

  const onClick = (index, lectureId, lecture) => {
    
    //추가
    console.log(lecture);
    console.log(userInfo);
    if(lecture.notes.includes("외국인")){
      setOpenNotice(true);
      setNotice("외국인만 수강가능 과목입니다!");
    }else if(lecture.notes.includes("타학과생 수강불가") || lecture.notes.includes("타과생 신청불가")){
      setOpenNotice(true);
      setNotice("타학과생 수강불가 과목입니다!");
    }else if(lecture.notes.includes("체육특기자만")){
      setOpenNotice(true);
      setNotice("체육특기자만 수강가능 과목입니다!");
    }else if(lecture.department.includes("과") ||  lecture.department.includes("부")){ 
      
      /* 타학과 과목 처리 userInfo로 바꿀것.
      if(!lecture.department.includes("소프트웨어학부") ){
        setOpenNotice(true);
        setNotice(`${lecture.department} 해당 과목입니다.`);
      }
      */
    }

    
    dispatch({
      type: 'ADD_LECTURE',
      lecture:state.searchedLectures[index],
    });
    const currentTableName = state.totalTimeTable.find( timeTable => timeTable.id == state.selectedId ).tableName;

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
    }else {
      
    }
  }

  const onHovered=(index)=>{
    //추가
    dispatch({
      type: 'PREVIEW_LECTURE',
      id:state.searchedLectures[index].id,
    });
    hovereds[index]=true;
  }

  //수연 추가
  const notHovered=(index)=>{
    //추가
    dispatch({
      type: 'PREVIEW_LECTURE',
      id:state.searchedLectures[index].id,
    });
    hovereds[index]=false;
    // setHovereds[index](false);
    // setHovereds(hovereds.map(hovered=>hovereds.indexOf(hovered)===index?false:hovered));
  }

  return (
    <LectureListContainer>
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
            height: fold? '580px' : '350px' 
        }} 
        >
        <LineTable isCardMode={isCardMode}>
        
            {state.searchedLectures.map((searchedLecture, index) => (
                <Lecture
                lecture={searchedLecture} //추가
                key={searchedLecture.id} 
                isCardMode={isCardMode}
                isListMode={true}//수정
                backgroundColor="white"
                onClick={() => onClick(index, searchedLecture.id, searchedLecture)}
                onHovered={()=>onHovered(index)}//수정
                notHovered={()=>notHovered(index)}//수연 추가
                isClicked={clickeds[index]}
                isHovered={hovereds[index]}
                isDup={searchedLecture.dup} //수연 추가
                />
            ))}
        </LineTable>
        </div>

      </DualMode>
    </LectureListContainer>
  );
}

export default LectureList;