import { useEffect, useState } from "react";
import Lecture from "./Lecture";
//추가
import { useUserTableState, useUserTableDispatch} from '../context/UserTableContext'; 
import styled ,{css}  from "styled-components";

//styled-components
const DualMode=styled.div`
  ${props =>
    props.isCardMode ?'':
    css`
      /* 10+770+10 */
      width: 790px; 
    `
  }
`;
const LineTablehead=styled.div`
  font-size: 16px;
  border-top: 1px solid rgba(167, 168, 169, 0.8);
  padding: 12px 0 12px 10px;
  span{
    width: 110px;
    /* float: left; */
    display: inline-flex;
    padding-right: 12px;
    font-size: 14px;
    /* background-color: aqua; */
  }
`;

function LectureList({
}) {
  
  const [isCardMode,setIsCardMode]=useState(false); //토글버튼 만들 때 쓰일 것
  

  //추가
  const dispatch=useUserTableDispatch();
  const state=useUserTableState();

  console.log(state);

  const onClick = (index) => {
    //추가
    dispatch({
      type: 'ADD_LECTURE',
      lecture:state.searchedLectures[index],
    })
  };

  const onHovered=(index)=>{
    //추가
    dispatch({
      type: 'PREVIEW_LECTURE',
      id:state.searchedLectures[index].id,
    })
  }

  return (
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
            {state.searchedLectures.map((searchedLecture, index) => (
                <Lecture
                lecture={searchedLecture} //추가
                key={searchedLecture.id} 
                isCardMode={isCardMode}
                isListMode={true}//수정
                onClick={() => onClick(index)}
                onHovered={()=>onHovered(index)}//수정
                />
            ))}
        </div>
      </DualMode>

  );
}

export default LectureList;