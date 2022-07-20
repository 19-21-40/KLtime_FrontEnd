import { useEffect, useState } from "react";
import Lecture from "./Lecture";
import styles from "./LectureList.module.css";

function LectureList({ totalLectures, isCardMode, setSelectedLectures}) {
  // const [timeList,setTimeList]=useState([]);
  // setTimeList(test);
  const onMouseOver = (index,event,Selected) => {
    if(!Selected[index]){
        event.currentTarget.style.background = "#f8f8f8";
    }
  };
  const onMouseOut = (index,event,Selected) => {
    if(!Selected[index]){
        event.currentTarget.style.background = "white";
    }
  };
  const [Selected,setSelected]=useState(totalLectures.map((totalLecture,index)=>false));
//   console.log(Selected);
  const onClick = (index,event,Selected) => {
    setSelectedLectures((current) => [...current, totalLectures[index]]);
    // setSelected(Selected[index]=true);//오류뜸...
    console.log(Selected);
    event.currentTarget.style.background = "grey";
  };

//   const onChildClick=(e)=>{
//     e.stopPropagation();
//   }

  return (
    <div className={isCardMode ? styles.cardList : styles.lineList}>
      <ul>
        <div>
        <li className={styles.lineTablehead}>
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
        </li>
        </div>
        <div style={
            {overflowY: 'scroll',
            height:'300px'
        }} 
        >
            {totalLectures.map((totalLecture, index) => (
            <li
                key={index}
                onMouseOver={(event)=>onMouseOver(index,event,Selected)}
                onMouseOut={(event)=>onMouseOut(index,event,Selected)}
                onClick={(event) => onClick(index,event,Selected)}
            >
                <Lecture
                key={totalLecture.id} //?
                isCardMode={isCardMode}
                onClick={onClick}//
                id={totalLecture.id}
                lectureName={totalLecture.lectureName}
                professor={totalLecture.professor}
                department={totalLecture.department} //추가
                lectureTimes={totalLecture.lectureTimes} //수정
                level={totalLecture.level}
                section={totalLecture.section} //수정
                credit={totalLecture.credit}
                notes={totalLecture.notes}
                />
            </li>
            ))}
        </div>
        
      </ul>
    </div>
  );
}

export default LectureList;
