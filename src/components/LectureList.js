import { useEffect, useState } from "react";
import Lecture from "./Lecture";
import styles from "./LectureList.module.css";

function LectureList({
    searchedLectures,
    setSelectedLectures,
    setHoveredLecture,
}) {
  
  const [isCardMode,setIsCardMode]=useState(false);


  const onClick = (index,event) => {
    setSelectedLectures((current) => [...current, searchedLectures[index]]);
  };

  const onHovered=(index,isOnHovered)=>{
    if(isOnHovered) setHoveredLecture(searchedLectures[index]);
    else setHoveredLecture();
  }

  return (
    <div className={isCardMode ? styles.cardList : styles.lineList}>
        <div className={styles.lineTablehead}>
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
        </div>
        <div style={
            {overflowY: 'scroll',
            height:'300px'
        }} 
        >
            {searchedLectures.map((totalLecture, index) => (
            
                <Lecture
                key={totalLecture.id} //
                isCardMode={isCardMode}
                isListMode={true}//수정
                onClick={(event) => onClick(index,event)}
                lecture={totalLecture}
                onHovered={(isOnHovered)=>onHovered(index,isOnHovered)}//수정
                />
            ))}
        </div>
        
      {/* </ul> */}
    </div>
  );
}

export default LectureList;
