import Lecture from "./Lecture";
import styles from "./TimeTable.module.css"


import { useEffect, useState } from "react";



function TimeTable({
    selectedLectures,
    setSelectedLectures,
    hoveredLecture
}) {
    const dayNames = ["월", "화", "수", "목", "금", "토", "일"];
    const times = [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00"
    ];
    const periods = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const colors=[
        'rgb(255, 187, 59)',
        'rgb(3, 189, 158)',
        'rgb(0, 169, 255)',
        'rgb(255, 85, 131)',
        'rgb(158, 95, 255)',
        'rgb(187, 220, 0)',
        'rgb(255, 64, 64)',
        'red','green','blue','orange','yellow','pink','skyblue'
    ];

    const [seletedTable, SetSeletedTable] = useState({
        dayNames: dayNames.slice(0, 5),
        times: times.slice(9, 24),
        periods: periods.slice(2, 15)
    });
    
    useEffect(() => {
        let maxDay = 5;
        let minTime = 9;
        let minPeriod = 2;
        selectedLectures?.forEach((lecture) => {
            lecture.lectureTimes.forEach((time) => {
                const dayIndex = dayNames.indexOf(time.day) + 1;
                const timeIndex = parseInt(time.startTime.split(":")[0]);
                if (timeIndex < minTime) minTime = timeIndex;
                if (dayIndex > maxDay) maxDay = dayIndex;
            })
        })
        hoveredLecture?.lectureTimes.forEach((time)=>{
            const dayIndex = dayNames.indexOf(time.day) + 1;
            const timeIndex = parseInt(time.startTime.split(":")[0]);
            if (timeIndex < minTime) minTime = timeIndex;
            if (dayIndex > maxDay) maxDay = dayIndex;
        })
        if (minTime === 8) minPeriod = 1;
        else if (minTime < 8) minPeriod = 0;
        SetSeletedTable({
            dayNames: dayNames.slice(0, maxDay),
            times: times.slice(minTime, 24),
            periods: periods.slice(minPeriod, 15)
        })
    }, [selectedLectures,hoveredLecture])

    const onClick=(e)=>{
        // console.log(e.currentTarget)
    }
    const onCancleClick = (id) => {
        if(window.confirm("강의를 삭제하시겠습니까?")){
            setSelectedLectures(selectedLectures.filter((lecture)=>lecture.id!==id));
        }
    };

    const timeToMinute = (time) => parseInt(time.split(':')[0] * 60) + parseInt(time.split(':')[1]);


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
                                {seletedTable.dayNames.map((dayName, index) => (
                                    <div className={styles.dayName}
                                        key={dayName}
                                        style={{
                                            width: (1 / seletedTable.dayNames.length * 100).toString() + '%',
                                            left: ((index) / seletedTable.dayNames.length * 100).toString() + '%',
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
                        style={{ height: '432px', position: 'relative' }}
                    >
                        <div className={styles.tableGridContainer}>
                            <div className={styles.tableLeftGrid}
                                style={{
                                    width: '42px',
                                    fontSize: '11px'
                                }}>
                                <div
                                    style={{
                                        width: '100%',
                                        backgroundColor: 'inherit'
                                    }}
                                >
                                    {seletedTable.periods.map((period) => (
                                        <div
                                            key={period}
                                            className={styles.tablePeriodPiece}
                                            style={{
                                                height: period === 0 ? (seletedTable.times.length === 16 ? '48px' : '72px')
                                                    : period === -1 ? ((seletedTable.times.length - 17) * 48 + 24).toString() + 'px'
                                                        : period === 12 ? '88px'
                                                            : period < 7 ? '72px'
                                                                : '40px',
                                                color: '#bbb',
                                                fontWeight: 'normal',
                                                textAlign: 'center',

                                            }}
                                        >
                                            {(period === -1 || period === 12) ? '' : `${period}교시`}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.tableMiddleGrid} style={{ marginLeft: '42px', marginRight: '50px' }}>
                                <div>
                                    {
                                        seletedTable.times.map((time) => (
                                            <div
                                                className={styles.timeTableGridLine}
                                                key={time}
                                                style={{
                                                    height: "48px",
                                                    borderBottom: "1px solid #e5e5e5"
                                                }}
                                                onClick={onClick}
                                            >
                                                <div className={styles.timeTableGridLineThird} style={{ height: "24px", borderBottom: "none" }}></div>
                                                <div className={styles.timeTableGridLineThird} style={{ height: "24px", borderBottom: "none" }}></div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={styles.timeTableSchedules}>
                                    {
                                        seletedTable.dayNames.map((day, index) => (
                                            <div className={styles.timeTableDayViewer}
                                                key={index}
                                                style={{
                                                    width: (1 / seletedTable.dayNames.length * 100).toString() + '%',
                                                    left: (index / seletedTable.dayNames.length * 100).toString() + '%',
                                                    borderLeft: '1px solid rgb(229, 229, 229)',
                                                    backgroundcolor: 'inherit',
                                                }}
                                            >
                                                <div className={styles.timeTableDayBlock} style={{ marginRight: "8px" }}>
                                                    {
                                                        selectedLectures?.length?
                                                        selectedLectures.map((lecture,index)=>(
                                                            lecture.lectureTimes.map((time)=>(
                                                                day!==time.day?false:
                                                                <Lecture
                                                                key={lecture.id}
                                                                width='100%'
                                                                height={((timeToMinute(time.endTime)-timeToMinute(time.startTime))*0.8-1).toString()+'px'}
                                                                top={((timeToMinute(time.startTime)-(timeToMinute(seletedTable.times[0])))*0.8).toString()+'px'}
                                                                backgroundColor={colors[index]}
                                                                isCardMode={true}
                                                                isListMode={false}//수정
                                                                id={lecture.id}
                                                                lectureName={lecture.lectureName}
                                                                professor={lecture.professor}
                                                                department={lecture.department}
                                                                lectureTimes={lecture.lectureTimes}
                                                                level={lecture.level}
                                                                section={lecture.section}
                                                                credit={lecture.credit}
                                                                notes={lecture.notes}
                                                                onClick={onClick}
                                                                onCancleClick={onCancleClick}
                                                                />
                                                            ))
                                                        )):<></>
                                                    }
                                                    {
                                                        hoveredLecture?.lectureTimes?.map((time)=>(
                                                            day!==time.day?false:
                                                            <Lecture
                                                            key={hoveredLecture.id}
                                                            width='100%'
                                                            height={((timeToMinute(time.endTime)-timeToMinute(time.startTime))*0.8-1).toString()+'px'}
                                                            top={((timeToMinute(time.startTime)-(timeToMinute(seletedTable.times[0])))*0.8).toString()+'px'}
                                                            isCardMode={true}
                                                            isListMode={false}//수정
                                                            id={hoveredLecture.id}
                                                            lectureName={hoveredLecture.lectureName}
                                                            professor={hoveredLecture.professor}
                                                            department={hoveredLecture.department}
                                                            lectureTimes={hoveredLecture.lectureTimes}
                                                            level={hoveredLecture.level}
                                                            section={hoveredLecture.section}
                                                            credit={hoveredLecture.credit}
                                                            notes={hoveredLecture.notes}
                                                            backgroundColor='rgba(190, 190, 191, 0.8)'
                                                            />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                            <div className={styles.tableRightGrid}
                                style={{
                                    width: '40px',
                                    right: '10px',
                                    top: '0',
                                    backgroundcolor: 'inherit',
                                    borderLeft: '1px solid rgb(229, 229, 229)',
                                }}
                            >
                                {
                                    seletedTable.times.map((time, index) => (
                                        <div
                                            key={index}
                                            className={styles.tableTimePiece}
                                            style={{
                                                height: '48px',
                                                color: '#bbb',
                                                fontWeight: 'normal',
                                            }}
                                        >
                                            {time}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default TimeTable;