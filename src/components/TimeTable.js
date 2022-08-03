import Lecture from "./Lecture";
import styles from "./TimeTable.module.css"


import { useEffect, useState, useContext, useMemo } from "react";
import LectureDetail from "./LectureDetail";
import EditLecture from "./EditLecture";
import { useUserTableState, useUserTableDispatch } from '../context/UserTableContext';
import styled from "styled-components";

const TimeTableContainer = styled.div`

    margin: 0px auto;
    padding: 30px 0px 70px;
    height: ${(props) => props.height};

    #timeTable{
        font-family: Noto Sans,sans-serif;
    }
    #timeTable .tableContainer{
        height: inherit;
        display: inline-block;
        font-size: 10px;
        min-height: 600px;
    }

    #timeTable .floatingLayer{
        z-index: 1;
    }

    #timeTable .floatingLayer *{
        box-sizing: border-box;
    }
    
`;

const DayNameLayout = styled.div`
    border-top: 1px solid rgb(229, 229, 229);
    border-bottom: 1px solid rgb(229, 229, 229);
    height: 42px;
    backgroud-color: inherit;
    text-align: left;


    .dayNameLeftMargin{
        margin-left: 42px;
        margin-right: 50px;
        position: relative;
        height: 100%;
    }
    
    
    .dayName{
        position: absolute;
        margin-left: -1px;
        height: 100%;
        overflow: hidden;
    }
`;

const TimeTableZoneLayout = styled.div`
    height:${props=>props.height};
    position:${props=>props.position};

    .timeTableGrid{
        height: 100%;
        position: relative;
        overflow: hidden;
        overflow-y: scroll;
    }

    .timeTableGrid .timeTableGridScrollArea{
        position: relative;
        height: 100%;
    }


`
    
const TimeTableDayLayout=styled.div`
    background: none;
    position: absolute;
    height: 100%; 
    margin-left: -1px;
    box-sizing: content-box;
`

const TimeTableDayBlockLayout=styled.div`
    position: relative;
    height: 100%;
    margin-right:8px;
`

const PeriodZoneLayout = styled.div`
    position:absolute;
    width:42px;
    font-size:11px;

    .timeTablePeriod{
        width: 100%;
        background-color: inherit;
    }
    
    .tablePeriodPiece{
        position: relative;
        color: #555;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
`

const LecutreZoneLayout = styled.div`
    margin-left: 42px;
    position: relative;
    width: 100%;
    height: 100%;
    left:0%;
    top:0;

    // .timeTableGridLines .timeTableGridHalf{
    //     position: absolute;
    //     width: 100%;
    // }
`

const TimeZoneLayout = styled.div`
    float:right;
    position:absolute;
    height:100%;
    width: 40px;
    top:0;
    right:0;
    background-color: inherit;
    border-left: 1px solid rgb(229, 229, 229);

    .tableTimePiece{
        position: relative;
        color: #555;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e5e5;
    }
`





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
const colors = [
    'rgb(255, 187, 59)',
    'rgb(3, 189, 158)',
    'rgb(0, 169, 255)',
    'rgb(255, 85, 131)',
    'rgb(158, 95, 255)',
    'rgb(187, 220, 0)',
    'rgb(255, 64, 64)',
    'red', 'green', 'blue', 'orange', 'yellow', 'pink', 'skyblue'

];


function DayNameZone({ selectedTable }) {
    return (
        <DayNameLayout>
            <div className="dayNameLeftMargin">
                {selectedTable.dayNames.map((dayName, index) => (
                    <div className="dayName"
                        key={dayName}
                        style={{
                            width: `${(1 / selectedTable.dayNames.length * 100)}%`,
                            left: `${(index / selectedTable.dayNames.length * 100)}%`,
                            lineHeight: '42px',
                            borderLeft: 'none',
                            paddingLeft: '0',
                        }}
                    >
                        <span>
                            {`${dayName}요일`}
                        </span>
                    </div>
                ))}
            </div>
        </DayNameLayout>
    );
}

function Period({ period, selectedTable }) {
    let height;
    const hour = 48;
    if (period < 7) height = `${hour * 1.5}px`
    else if (period === 0) {
        if (selectedTable.times.length === 16) height = `${hour}px`
        else height = `${hour * 1.5}px`
    }
    else if (period === -1) height = `${hour * ((selectedTable.times.length - 17) + 0.5)}px`
    else if (period === 12) height = `${hour * 11 / 6}px`
    else height = `${hour * 5 / 6}px`

    return (
        <div className="tablePeriodPiece" style={{ height, color: '#bbb', fontWeight: 'normal', textAlign: 'center', }}>
            {(period === -1 || period === 12) ? '' : `${period}교시`}
        </div>
    );
}

function TimeTablePeriodZone({ selectedTable }) {
    return (
        <PeriodZoneLayout>
            <div className="timeTablePeriod"
                    style={{ width: "100%"}}>
                    {selectedTable.periods.map((period) => (
                        <Period key={period} period={period} selectedTable={selectedTable} />
                    ))}
            </div>
        </PeriodZoneLayout>
    );
}

function TimeTableTimeZone({ selectedTable }) {
    return (
        <TimeZoneLayout>
            {
                selectedTable.times.map((time, index) => (
                    <div
                        key={index}
                        className={"tableTimePiece"}
                        style={{
                            // top: `${index/selectedTable.times.length*100}%`,
                            height:"48px",
                            color: '#bbb',
                            fontWeight: 'normal',
                        }}
                    >
                        {time}
                    </div>
                ))
            }
        </TimeZoneLayout>);
}


function TimeTableDayBlock({ selectedTable, lectures,day, onClick }) {
    const timeToMinute = (time) => parseInt(time.split(':')[0] * 60) + parseInt(time.split(':')[1]);
    const userTable=useUserTableState();
    const previewLecture = userTable.searchedLectures.find(lecture => lecture.id == userTable.previewId);
    const dispatch = useUserTableDispatch();
    const onDeleteClick = (id) => {
        if (window.confirm("강의를 삭제하시겠습니까?")) {
            dispatch({ type: "DELETE_LECTURE", id })
        }
    };
    return (<TimeTableDayBlockLayout>
        {
            lectures?.map((lecture) => (
                lecture.lectureTimes.map((time) => (
                    <Lecture
                        key={lecture.id}
                        lecture={lecture}
                        height={((timeToMinute(time.endTime) - timeToMinute(time.startTime)) * 0.8 - 1).toString() + 'px'}
                        top={((timeToMinute(time.startTime) - (timeToMinute(selectedTable.times[0]))) * 0.8).toString() + 'px'}
                        backgroundColor={colors[lecture.lectureIndex]}
                        isCardMode={true}
                        isListMode={false}//수정
                        onClick={(e) => onClick(lecture.id, colors[lecture.lectureIndex])}
                        onDeleteClick={onDeleteClick}
                    />
                ))
            ))
        }
        {
        userTable.previewId !== -1?.lectureTimes?.map((time) => (
            day !== time.day ? false :
                <Lecture
                    key={previewLecture.id}
                    width='100%'
                    height={((timeToMinute(time.endTime) - timeToMinute(time.startTime)) * 0.8 - 1).toString() + 'px'}
                    top={((timeToMinute(time.startTime) - (timeToMinute(selectedTable.times[0]))) * 0.8).toString() + 'px'}
                    isCardMode={true}
                    isListMode={false}//수정
                    lecture={previewLecture}
                    backgroundColor='rgba(190, 190, 191, 0.8)'
                />
        ))
        }
    </TimeTableDayBlockLayout>);
}

function TimeTableDayViewer({ selectedLectures, selectedTable, day, dayIndex, onClick }) {
    const dayLectures = [];
    selectedLectures.forEach((lecture, lectureIndex) => {
        const times = lecture.lectureTimes.filter(time => time.day === day);
        const timeArray = [];
        if (times.length !== 0) {
            times.map(time => timeArray.push(time));
            dayLectures.push({ ...lecture, lectureTimes: timeArray, lectureIndex: lectureIndex })
        }
    })
    return (
        <TimeTableDayLayout
            style={{
                width: (1 / selectedTable.dayNames.length * 100).toString() + '%',
                left: (dayIndex / selectedTable.dayNames.length * 100).toString() + '%',
                borderLeft: '1px solid rgb(229, 229, 229)',
                backgroundcolor: 'inherit'
            }}>
            <TimeTableDayBlock lectures={dayLectures} day={day} selectedTable={selectedTable} onClick={onClick} />
        </TimeTableDayLayout>
    );
}

function TiemTableLectureZone({selectedTable,selectedLectures,onClick}){
    return (
    <LecutreZoneLayout>
        <div className="timeTableGridLines">
            {
                selectedTable.times.map((time, timeIndex) => ([0,1].map((i)=>(
                        <div key={i===0?`${time}_half`:time} className="timeTableGridHalf" style={{height: "24px", borderBottom: i===0?"none":"1px solid #e5e5e5" }}></div>
                    ))))
            }
        </div>
        <div style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                left:"0%",
                top:"0",
        }}>
        {
            selectedTable.dayNames.map((day, dayIndex) => (
                <TimeTableDayViewer key={day} day={day} dayIndex={dayIndex} selectedLectures={selectedLectures} selectedTable={selectedTable} onClick={onClick} />
            ))
        }
        </div>
    </LecutreZoneLayout>
    );
}

function TimeTableZone({ selectedLectures, selectedTable, onClick }) {
    return (
        <TimeTableZoneLayout height="432px" position="relative  ">
            <div className="timeTableGrid">
                <div className="timeTableGridScrollArea">
                    <TimeTablePeriodZone selectedTable={selectedTable} />
                    <TiemTableLectureZone selectedTable={selectedTable} selectedLectures={selectedLectures} onClick={onClick}/>
                    <TimeTableTimeZone selectedTable={selectedTable} />
                </div>
            </div>
        </TimeTableZoneLayout>
    );
}

function TimeTable({
    width,
    height,
}) {

    const userTable = useUserTableState();

    const [selectedTable, SetselectedTable] = useState({
        dayNames: dayNames.slice(0, 5),
        times: times.slice(9, 24),
        periods: periods.slice(2, 15)
    });
    const [clickedLecture, setClickedLecture] = useState();
    const previewLecture = userTable.searchedLectures.find(lecture => lecture.id == userTable.previewId)
    const selectedLectures = userTable.totalTimeTable.find(timeTable => timeTable.id === userTable.selectedId).lectureList;
    
    const onClick = (id, color) => {
        setClickedLecture({
            ...selectedLectures.find(lecture => lecture.id === id),
            backgroundColor: color,
        });
    }
    const dispatch = useUserTableDispatch();
    useEffect(() => {
        dispatch({
            type: 'ADD_LECTURE', lecture: {
                id: "H030-2-0448-02",
                lectureName: "디지털논리",
                professor: "김진우",
                department: "소프트웨어학부",
                lectureTimes: [
                    { day: "월", startTime: "15:00", endTime: "16:30" },
                    { day: "수", startTime: "16:30", endTime: "18:00" },
                ],
                level: 2,
                section: "전선",
                credit: 3,
                notes: ""
            }
        })
    }, [])

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
        previewLecture?.lectureTimes.forEach((time) => {
            const dayIndex = dayNames.indexOf(time.day) + 1;
            const timeIndex = parseInt(time.startTime.split(":")[0]);
            if (timeIndex < minTime) minTime = timeIndex;
            if (dayIndex > maxDay) maxDay = dayIndex;
        })
        if (minTime === 8) minPeriod = 1;
        else if (minTime < 8) minPeriod = 0;
        SetselectedTable({
            dayNames: dayNames.slice(0, maxDay),
            times: times.slice(minTime, 24),
            periods: periods.slice(minPeriod, 15)
        })
    }, [selectedLectures, previewLecture])


    return (
        <TimeTableContainer height={`${height}px`}>
            <div id="timeTable" style={{height:`${height - 50}px`}}>
                <div className="tableContainer" style={{width:`${width}px`}}>
                    <DayNameZone selectedTable={selectedTable} />
                    <TimeTableZone selectedLectures={selectedLectures} selectedTable={selectedTable} onClick={onClick} />
                </div>
                <div className="floatingLayer">
                    <div className={styles.popupContainer}>
                        {
                            clickedLecture ?
                                <LectureDetail
                                    lecture={clickedLecture}
                                    backgroundColor={clickedLecture.backgroundColor}
                                    onClickOutside={() => setClickedLecture(false)}
                                // onDeleteClick={() => { onDeleteClick(clickedLecture.id); setClickedLecture(false); }}
                                /> : <></>
                        }
                        {/* <EditLecture editAble={false} setSelectedLectures={setSelectedLectures}/> */}
                    </div>
                </div>
            </div>
        </TimeTableContainer>
    )
}

export default TimeTable;