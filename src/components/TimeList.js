import { useEffect, useState } from "react";
import Time from "./Time";
import styles from "./TimeList.module.css"

const test = [
    {
        id: "123",
        lectureName: "테스트",
        professor: "tester",
        startTime: "1",
        endTime: "3",
        level: 3,
        property: "전공",
        credit: 3,
        notes: "테스트"
    },
    {
        id: "456",
        lectureName: "테스트",
        professor: "tester",
        startTime: "1",
        endTime: "3",
        level: 3,
        property: "전공",
        credit: 3,
        notes: "테스트"
    },
];

function TimeList({isCardMode}) {
    // const [timeList,setTimeList]=useState([]);
    // setTimeList(test);

    
    const onClick=()=>{

    }
    return (
        <div className={isCardMode?styles.cardList:styles.lineList}>
            {
            test.map((time)=>(
                <Time
                    isCardMode={isCardMode}
                    key={time.id}
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

export default TimeList;