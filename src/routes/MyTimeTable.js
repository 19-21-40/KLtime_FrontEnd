import TimeTable from "../components/TimeTable";
import LectureList from "../components/LectureList";
import { useEffect, useState, useRef } from "react";
import Search from "../components/Search";
import ModifyTimeTable from "../components/ModifyTimeTable";

function MyTimeTable() {
    const test = [
        {
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
        },
        {
            id: "0000-1-0670-01",
            lectureName: "법과생활",
            professor: "손명지",
            department: "전체공통",
            lectureTimes: [
                { day: "화", startTime: "08:00", endTime: "13:30" },
                { day: "목", startTime: "13:30", endTime: "15:00" },
            ],
            level: 1,
            section: "교선",
            credit: 3,
            notes: ""
        },
        {
            id: "H030-2-1183-01",
            lectureName: "이산구조",
            professor: "최민규",
            department: "소프트웨어학부",
            lectureTimes: [
                { day: "금", startTime: "9:00", endTime: "12:00" }
            ],
            level: 2,
            section: "전선",
            credit: 3,
            notes: ""
        },
        {
            id: "H030-2-3403-03",
            lectureName: "고급프로그래밍",
            professor: "이강훈",
            department: "소프트웨어학부",
            lectureTimes: [
                { day: "화", startTime: "16:30", endTime: "18:00" },
                { day: "목", startTime: "15:00", endTime: "16:30" },
            ],
            level: 2,
            section: "전선",
            credit: 3,
            notes: ""
        },
        {
            id: "H030-3-3663-01",
            lectureName: "데이터베이스",
            professor: "문승현",
            department: "소프트웨어학부",
            lectureTimes: [
                { day: "화", startTime: "15:00", endTime: "16:30" },
                { day: "목", startTime: "16:30", endTime: "18:00" },
            ],
            level: 3,
            section: "전선",
            credit: 3,
            notes: ""
        },
        {
            id: "H030-2-8484-01",
            lectureName: "리눅스활용실습",
            professor: "박병준",
            department: "소프트웨어학부",
            lectureTimes: [
                { day: "금", startTime: "15:00", endTime: "18:00" },
            ],
            level: 2,
            section: "전필",
            credit: 2,
            notes: ""
        },
        {
            id: "H040-2-9616-02",
            lectureName: "빅데이터언어",
            professor: "임동혁",
            department: "정보융합학부",
            lectureTimes: [
                { day: "월", startTime: "16:30", endTime: "18:00" },
                { day: "수", startTime: "15:00", endTime: "16:30" },
            ],
            level: 2,
            section: "일선",
            credit: 3,
            notes: ""
        },
        {
            id: "1160-1-3415-01",
            lectureName: "대학화학및실험1",
            professor: "양재규",
            department: "환경공학과",
            lectureTimes: [
                { day: "월", startTime: "09:00", endTime: "12:30" },
                { day: "수", startTime: "10:30", endTime: "12:00" },
            ],
            level: 1,
            section: "기필",
            credit: 3,
            notes: ""
        },
    ];

    const [selectedLectures,setSelectedLectures]=useState([]);
    const [totalLectures, setTotalLectures]=useState(test);
    const [searchedLectures, setSearchedLectures]=useState(test);
    const [hoveredLecture,setHoveredLecture]=useState();



////////////////////////////////////////////////////////시간표 선택기능//////////////////////////////////////////////////////////////////////////////////
    const [currentTableName, setCurrentTableName] = useState("시간표1");
    const [myTableList, setMyTableList] = useState(
        [
            {
                number: 1,  
                tableName: "시간표1",
                lectureList: [],
            },
            {
                number: 2,
                tableName: '시간표2',
                lectureList: [],
            }]
    );


    const selectTimeTableOption = useRef(null);

    const selectTimeTable = (e) => {
        

        const idx = e.target.selectedIndex;
        const option = e.target.querySelectorAll('option')[idx];
        const name = option.getAttribute('name');



        setCurrentTableName(name);

    };
   
    useEffect(() => {   

        let Table = myTableList.map(table => table.tableName === currentTableName ? {...table, lectureList: selectedLectures} : table);
        setMyTableList(Table);

        localStorage.setItem('시간표', JSON.stringify(Table));

    }, [selectedLectures]);

      
    useEffect(() => {
        
        myTableList.map(table => {
            if(table.tableName === currentTableName)
            {
                setSelectedLectures(table.lectureList);
            }
        })

    }, [currentTableName])


    const nextNumber = useRef(3);

    const addTimeTable = () => {

        const newTable = {
            number: nextNumber.current,
            tableName: `시간표${nextNumber.current}`,
            lectureList: [],
        };

        setMyTableList(myTableList.concat(newTable));
        
        nextNumber.current += 1;

    }

    const [isModifyTimeTable, setIsModifyTimeTable] = useState(false);

    const handleClick = () => {
        setIsModifyTimeTable(true);
    }
    return (
        <div>
            <TimeTable
            width={'1200px'}
            height={'600px'}
            selectedLectures={selectedLectures}
            setSelectedLectures={setSelectedLectures}
            hoveredLecture={hoveredLecture}
            />
            <div>
                <select ref={selectTimeTableOption} onChange={e => selectTimeTable(e)}>
                    {myTableList.map((table)=> { return (
                        <option name={`시간표${table.number}`} key={table.number}> 시간표{table.number} </option>
                    )})}
                </select>
                <button onClick={addTimeTable}> + </button>
                <button onClick={handleClick}> 수정 </button>
                <ModifyTimeTable 
                  currentTableName={currentTableName}
                  setCurrentTableName={currentTableName}
                  myTableList={myTableList}
                  setMyTableList={setMyTableList}
                  isModifyTimeTable={isModifyTimeTable}
                  setIsModifyTimeTable={setIsModifyTimeTable}
                />
            </div>
            <Search
                totalLectures={totalLectures}
                setSearchedLectures={setSearchedLectures}
            />
            <LectureList
                searchedLectures={searchedLectures}
                selectedLectures={selectedLectures} // 리스트에서 선택했을때 selectedLectures를 set하기 위해 불러옴
                setSelectedLectures={setSelectedLectures}
                setHoveredLecture={setHoveredLecture}
            />
        </div>

    )
}



export default MyTimeTable;