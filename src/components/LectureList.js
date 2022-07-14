import { useEffect, useState } from "react";
import Lecture from "./Lecture";
import styles from "./LectureList.module.css"

function LectureList({
    isCardMode,
    onClick
    }) {
    // const [timeList,setTimeList]=useState([]);
    // setTimeList(test);

    
    return (
        <div className={isCardMode?styles.cardList:styles.lineList}>
            {
            test.map((time)=>(
                <Lecture
                    key={time.id}
                    isCardMode={isCardMode}
                    onClick={onClick}
                    id={time.id}
                    lectureName={time.lectureName}
                    professor={time.professor}
                    startTime={time.startTime}
                    endTime={time.endTime}
                    level={time.level}
                    property={time.property}
                    credit={time.credit}
                    notes={time.notes}
                />
            ))}
        </div>
    );
}

export default LectureList;