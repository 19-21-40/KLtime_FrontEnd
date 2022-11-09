import TimeTable from "../components/TimeTable";
import LectureList from "../components/LectureList";
import { useEffect, useState, useRef, useReducer, createContext } from "react";
import Search from "../components/Search";
import SelectTimeTable  from "../components/SelectTimeTable"
import { UserTableProvider } from "../context/UserTableContext";
import Time_Table_Menu from "../components/Time_Table_Menu";
import styled from "styled-components";
import { useUserTableDispatch, useUserTableState } from "../context/UserTableContext";


const Total_Container = styled.div `
    width: 667px;
    height: 786px;
    left: 264px;
    top: 232px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 2px solid black;
    border-radius: 20px;
`;

const Search_box = styled.div `
    box-sizing: border-box;

    // position: absolute;
    left: 7.35%;
    right: 6.75%;
    top: 17.3%;
    bottom: 53.94%;
`;

const LectureList_box = styled.div `
    box-sizing: border-box;

    left: 7.35%;
    right: 6.75%;
    top: 17.3%;
    bottom: 53.94%;
`;

const Headcomponent =styled.div`
    display: flex;
`;

const Text_Box =styled.div`

`;

const Back_Button = styled.button`

`;

const Edit_Name_Button = styled.button`

`;

const GR_Button = styled.button`
    background: #D9D9D9;
    border-radius: 20px;
`;

const EditContainer = styled.div`
        position: relative;
        width:100%;               
        max-width:400px;     
        overflow:hidden;          
        border-radius: 10px;
        background-color:#264db5; 
        box-shadow: 5px 10px 10px 1px rgba(0,0,0,.3); 
`;

const Title = styled.div`
    width:100%;
    max-width:400px;              
    overflow:hidden;         
    background-color:#9fcbfa;
    justify-content:center;
    align-items:center;
    color: white;
    display: flex;
    `;

const XBtn = styled.button`
    position: absolute;
    background: none;
    border:none;
    font-size: 20px;
    color: white;
    top: 3%;
    right: 5%;
    cursor: pointer;
`;

const Body = styled.div`
    width: 100%;
    max-width: 400px;
    height: 200px;
    background-color: #ffffff;
    div{
        font-size: 25px;
    }
`;

const testtotalLectures=[
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




function Edit_TimeTable({totalLectures, InnerText, tableId, setOpenSelect, setOpenDetail}) {

    
    const [selectedLectures,setSelectedLectures]=useState([]);
    // const [totalLectures, setTotalLectures]=useState(testtotalLectures);
    // const [searchedLectures, setSearchedLectures]=useState(testtotalLectures);
    const [hoveredLecture,setHoveredLecture]=useState();
    
    const [editName, setEditName] = useState(false);

    const Edit_click = () => {
        if(editName){
            setEditName(false);
        }
        else{
            setEditName(true);
        }
    }

    const userTableDispatch = useUserTableDispatch(); //
    const userTableState = useUserTableState();

    const [currentTableName, setCurrentTableName] = useState( () =>  userTableState.totalTimeTable.find(timeTable => timeTable.id === tableId).tableName );

    const handleChange = (e) => {
        setCurrentTableName(e.target.value)
    }

    const saveTimeTable = (id) => {

        userTableDispatch({
            type: 'UPDATE_TABLE',
            tableName: currentTableName
        });
        setEditName(false);
    };

    const Back_click = () => {
        setOpenSelect(true);
        setOpenDetail(false);
    }
    
    return (
        <Total_Container>
            <Headcomponent>
                    <Back_Button onClick={Back_click}>{'<'}</Back_Button>
                    <Text_Box>
                        <h1>{InnerText[0]} {InnerText[1]}</h1>
                        <h2>{InnerText[2]} <Edit_Name_Button onClick={Edit_click}>수정</Edit_Name_Button></h2>
                    </Text_Box>
                    <GR_Button>졸업요건 확인</GR_Button>
            </Headcomponent>
            {editName && <EditContainer>
                <Title>
                    <h1>시간표 변경</h1>
                    <XBtn onClick={() => setEditName(false)}> x </XBtn>
                </Title>
                <Body>
                    <div>이름</div>
                    <input type="text" onChange={handleChange} value={currentTableName}/>
                    <button onClick={ () => {
                            saveTimeTable()
                        }}>설정 저장</button>
                </Body>
            </EditContainer>}
            {/* <Search_box>
                <Search
                totalLectures={totalLectures}
                />
            </Search_box> */}
            <LectureList_box>
                <LectureList />
            </LectureList_box>
        </Total_Container>
    )
}



export default Edit_TimeTable;