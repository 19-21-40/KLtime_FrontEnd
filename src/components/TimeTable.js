import Lecture from "./Lecture";
import LectureList from "./LectureList";
import styles from "./Table.module.css"


import { useEffect, useState } from "react";


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
{/* <TimeBox
id={t.id}
lectureName={t.lectureName}
professor={t.professor}
startTime={t.startTime}
endTime={t.endTime}
level={t.level}/>

*/}

function TimeTable() {
    const dayNames = ["월", "화", "수", "목", "금", "토"];
    const times=[
        "9시 00분",
        "10시 30분",
        "12시 00분",
        "13시 30분",
        "15시 00분",
        "16시 30분",
        "18시 00분",
        "19시 30분",
        "21시 00분",
        "22시 30분",
    ]
    const [selectedTimes, setSeletedTimes] = useState({
        mon:[{}],
        tue:[{}],
        wed:[{}],
        thu:[{}],
        fri:[{}],
        sat:[{}]
    });
    useEffect(()=>{
        setSeletedTimes(
            {...selectedTimes,
            tue:[
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
            ]}
        )
    },[])
    const onClick=(e)=>{
        console.log(e);
    }

    const keys=Object.keys(selectedTimes);
    

    return (
        <div id={styles.table} height="600px">
            <div className={styles.tableViewer} backgroundcolor='white'>
                <div className={styles.tableContainer}>
                    <div className={styles.dayNameLayout}>
                        <div
                            style={{
                                borderTop: '1px solid rgb(229, 229, 229)',
                                borderBottom: '1px solid rgb(229, 229, 229)',
                                height: '42px',
                                backgroundColor: 'inherit',
                                textAlign: 'left',
                            }}
                        >
                            <div className={styles.dayNameLeftMargin}>
                                {dayNames.map((dayName, index) => (
                                    <div className={styles.dayName}
                                        key={index}
                                        style={{
                                            width: (1 / dayNames.length * 100).toString() + '%',
                                            left: ((index) / dayNames.length * 100).toString() + '%',
                                            lineHeight: '42px',
                                            borderLeft: 'none',
                                            paddingLeft: '0',
                                        }}
                                    >
                                        <span>
                                            {dayName}요일
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                    data-auto-height="true"
                    style={{height: '418px',position: 'relative'}}
                    >
                        <div className={styles.tableGridContainer}>
                            <div className={styles.tableLeftGrid}
                            style={{
                                width: '72px',
                                fontSize: '11px'
                            }}>
                                <div
                                className={styles.tableTimeZone}
                                style={{
                                    width: '100%',
                                    borderRight: '1px solid rgb(229, 229, 229)',
                                    backgroundColor: 'inherit'
                                }}
                                >
                                    {times.map((time)=>(
                                        <div 
                                        className={styles.tableTimeZonePiece}
                                        style={{
                                            height: '72px',
                                            color: '#bbb',
                                            fontWeight: 'normal'
                                        }}
                                        >
                                            <span>{time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.tableRightGrid} style={{marginLeft:'72px'}}>
                                <div>
                                    {
                                        times.map((time,index)=>(
                                            <div
                                            className={styles.timeTableGridLine}
                                            key={index}
                                            style={{
                                                height: "72px",
                                                borderBottom: "1px solid #e5e5e5"}}
                                            >
                                                <div className={styles.timeTableGridLineThird} style={{height: "24px",borderBottom: "none"}}></div>
                                                <div className={styles.timeTableGridLineThird} style={{height: "24px",borderBottom: "none"}}></div>
                                                <div className={styles.timeTableGridLineThird} style={{height: "24px",borderBottom: "none"}}></div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={styles.timeTableSchedules}>
                                    <div>
                                        {
                                            dayNames.map((day,index)=>(
                                                <div className={styles.timeTableDayViewer}
                                                key={index}
                                                style={{
                                                    width: (1/dayNames.length*100).toString()+'%',
                                                    left: (index/dayNames.length*100).toString()+'%',
                                                    borderRight: '1px solid rgb(229, 229, 229)',
                                                    backgroundcolor: 'inherit',
                                                }}
                                                >
                                                    <div className={styles.timeTableDayBlock} style={{marginRight: "8px"}}>
                                                        {selectedTimes[keys[index]].map((dayTime)=>{
                                                            console.log(dayTime)
                                                            Object.keys(dayTime).length!==0?
                                                            <Lecture
                                                            key={dayTime.id}
                                                            // width='100%'
                                                            // height='10%'
                                                            // top='1/seletedTimes[keys[index]].length*100%'
                                                            id={dayTime.id}
                                                            isCardMode={true}
                                                            lectureName={dayTime.lectureName}
                                                            professor={dayTime.professor}
                                                            startTime={dayTime.startTime}
                                                            endTime={dayTime.endTime}
                                                            level={dayTime.level}
                                                            property={dayTime.property}
                                                            credit={dayTime.credit}
                                                            notes={dayTime.notes}
                                                            />
                                                            :
                                                            <></>
                                                        })}
                                                        {/* <div className={styles.selectedTime}
                                                        style={{
                                                            width: 'calc(100% - 0px)',
                                                            height: '10%',
                                                            top: '69.8333%',
                                                            left: '0%',
                                                            borderRadius: '10px',
                                                            borderLeft: '3px solid rgb(255, 187, 59)',
                                                            marginLeft: '0px',
                                                            color: 'rgb(255, 255, 255)',
                                                            backgroundColor: 'rgb(255, 187, 59)',
                                                            opacity: '1',
                                                            zIndex: '0',
                                                        }}
                                                        >
                                                            <div className={styles.selectedTimeContent} height='100%'>
                                                                <div className={styles.time}>
                                                                    <div>
                                                                        <strong>lectureName</strong>
                                                                    </div>
                                                                    <div>
                                                                        professor
                                                                    </div>
                                                                    <div>
                                                                        startTime
                                                                    </div>
                                                                    <div>
                                                                        endTime
                                                                    </div>
                                                                    <div>
                                                                        level
                                                                    </div>
                                                                    <div>
                                                                        property
                                                                    </div>
                                                                    <div>
                                                                        credit
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                {/* <div className={styles.timeTableMarker}></div> */}
                            </div>
                        </div>
                    </div>
                    <LectureList isCardMode={true} onClick={onClick}/>
                </div>
            </div>
            
        </div>

    )
}

export default TimeTable;