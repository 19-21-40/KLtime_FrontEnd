import TimeTable from "../components/TimeTable";
import LectureList from "../components/LectureList";
import { useEffect, useState, useRef, useReducer, createContext } from "react";
import Search from "../components/Search";
import SelectTimeTable  from "../components/SelectTimeTable"
import { UserTableProvider } from "../context/UserTableContext";
import Time_Table_Menu from "../components/Time_Table_Menu";
import styled from "styled-components";
import axios from "axios";
import Edit_TimeTable from "../components/Edit_TimaTable";
import { Link } from "react-router-dom";
import { useUserTableState, useUserTableDispatch} from '../context/UserTableContext'; 


const Total_Container = styled.div `
    display: flex;
    width: 1461px;
    height: 918px;
    left: 230px;
    top: 162px;
    /* 시간표 라인 */

    border: 1px solid #D9D9D9;
    border-radius: 10px;
`;

const Left_Container = styled.div `
    display: flex;
    flex-direction: column;
`;

const Right_Container = styled.div `
    display: flex;
`;

const Detail_Button = styled.button `
    
`;

const Back_Button = styled.button `
    
`;




function MyTimeTable() {
    const dispatch=useUserTableDispatch();
    const state=useUserTableState();
    
    const [selectedLectures,setSelectedLectures]=useState([]);
    // const [totalLectures, setTotalLectures]=useState(testtotalLectures);
    // const [searchedLectures, setSearchedLectures]=useState(testtotalLectures);
    const [hoveredLecture,setHoveredLecture]=useState();

    const [innerText, setInnerText] = useState({year : 2022, semester : "1학기", tableName : "시간표1"});

    const [openSelect, setOpenSelect] = useState(true);
    const [openDetail, setOpenDetail] = useState(false);
    const [tableId, setTableId] = useState(0);
    const [blockhover, setBlockHover] = useState(false);

    const nextNumber = useRef(1);

    useEffect(()=>{
        
        

        axios.post("http://localhost:8080/api/timetable/2022/1학기/totalLectureList", {
            token:"1234",
            number:"2019203082"
        }, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': '*/*',
            }, withCredentials: true,
        }).then(res=> {
            dispatch({
                type:'READ_TOTAL_LECTURES',
                totalLectures:res.data.lectureList,
                searchedLectures:res.data.lectureList
            });
        }
        );
    },[])

    
    return (
        <Total_Container>
                <Left_Container>
                    <nav>
                        <Link to="/">
                            <button> 메인으로! </button>
                        </Link>
                    </nav>
                    {openSelect && <div>
                        <Time_Table_Menu nextNumber={nextNumber} setTableId={setTableId} setOpenSelect={setOpenSelect} setOpenDetail={setOpenDetail} innerText ={innerText} setInnerText={setInnerText} setBlockHover={setBlockHover} />
                        </div>}
                    {openDetail && <div>
                        <Edit_TimeTable totalLectures={state.totalLectures} innerText={innerText} tableId={tableId} setOpenSelect={setOpenSelect} setOpenDetail={setOpenDetail} setBlockHover={setBlockHover} />
                        </div>}
                </Left_Container>
                <Right_Container>
                    <TimeTable
                    blockhover={blockhover}
                    width={670}
                    height={713.46}
                    />
                </Right_Container>
                {/* <Left_Container>
                    <TimeTable
                    width={600}
                    height={250}
                    />
                </Left_Container> */}
        </Total_Container>

    )
}



export default MyTimeTable;