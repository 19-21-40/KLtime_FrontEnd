import Lecture from "./Lecture";
import styles from "./TimeTable.module.css"


import { useEffect, useState } from "react";


function TimeTable({
    selectedLectures
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
    const periods = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];


    const [seletedTable, SetSeletedTable] = useState({
        dayNames: dayNames.slice(0, 5),
        times: times.slice(9, 24),
        periods: periods.slice(1, 12)
    });

    const onClick = (e) => {
        console.log(e);
    };



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
                                        key={index}
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
                                            className={styles.tablePeriodPiece}
                                            style={{
                                                height: period>0&&period<7?'72px':'36px',
                                                color: '#bbb',
                                                fontWeight: 'normal',
                                                textAlign: 'center',

                                            }}
                                        >
                                            {`${period}교시`}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.tableMiddleGrid} style={{ marginLeft: '42px', marginRight: '50px' }}>
                                <div>
                                    {
                                        seletedTable.times.map((time, index) => (
                                            <div
                                                className={styles.timeTableGridLine}
                                                key={index}
                                                style={{
                                                    height: "48px",
                                                    borderBottom: "1px solid #e5e5e5"
                                                }}
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
                                                    {/* {selectedTimes[keys[index]].map((dayTime)=>{
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
                                                        })} */}
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>

                                {/* <div className={styles.timeTableMarker}></div> */}
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
                                    seletedTable.times.map((time) => (
                                        <div
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