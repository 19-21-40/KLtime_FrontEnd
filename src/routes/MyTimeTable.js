import TimeTable from "../components/TimeTable";
import LectureList from "../components/LectureList";
import { useEffect, useState, useRef, useReducer, createContext } from "react";
import Search from "../components/Search";
import SelectTimeTable from "../components/SelectTimeTable"
import { UserTableProvider } from "../context/UserTableContext";
import Time_Table_Menu from "../components/Time_Table_Menu";
import styled from "styled-components";
import axios from "axios";
import Edit_TimeTable from "../components/Edit_TimaTable";
import Small_info from "../components/Small_info";
import { Link } from "react-router-dom";
import { useUserTableState, useUserTableDispatch } from '../context/UserTableContext';
import LectureDetail_B from "../components/LectureDetail_B";
import { API_BASE_URL } from "../app-config";

const Head_line = styled.div`
    
    display:flex;
    justify-content:center;

    position: absolute;
    width: 100vw;
    height: 121px;
    left: 0px;
    top: 0px;

    background: #A7A7A7;
`;

const Head_component = styled.div`
    display:flex;    

    position: absolute;
    width: 1600px;
    
`;

const Logo_Image = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 249px;
    height: 72px;
    left: 50px;
    top: 24px;

    /* 학점-숫자 */

    border: 1px solid #5A5A5A;
`;

const Body_line = styled.div`
    display: flex;

    top:162px;
    position: relative;
    width: 100vw;
    height: 100vh;
    
    justify-content:center;
`;

const Total_Container = styled.div`
    display: flex;
    flec

    position: relative;
    width: 1600px;
    height: 1100px;

    justify-content:center;
    
    /* 시간표 라인 */
    border: 1px solid #D9D9D9;
    border-radius: 10px;
`;

const Left_Container = styled.div`
    
    position: relative;

    top: 5%;
    right: 15px;

`;


const Button_to_main = styled.button`
    
    height: 30px;    
    margin-bottom: 30px;

    position: relative;
    left:40px;


    color: gray;
    background-color : transparent;
    border: none;
    font-size: 25px;
    cursor:pointer;
`

const Right_Container = styled.div`
    display: flex;
    width : 760px;
    height: 891px;

    position: relative;
    top: 113px;
    left: 15px;

    background: #FFFFFF;

    box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.1);
    border-radius: 50px;
`;

const Detail_Button = styled.button`
    
`;

const Back_Button = styled.button`
    
`;




function MyTimeTable() {
    const dispatch = useUserTableDispatch();
    const state = useUserTableState();

    const [selectedLectures, setSelectedLectures] = useState([]);
    // const [totalLectures, setTotalLectures]=useState(testtotalLectures);
    // const [searchedLectures, setSearchedLectures]=useState(testtotalLectures);
    const [hoveredLecture, setHoveredLecture] = useState();

    // const [innerText, setInnerText] = useState({year : 2022, semester : "1학기", tableName : "시간표1"});

    const [openSelect, setOpenSelect] = useState(true);
    const [openDetail, setOpenDetail] = useState(false);
    const [openLectureDetail, setOpenLectureDetail] = useState(false);
    const [tableId, setTableId] = useState(0);
    const [blockhover, setBlockHover] = useState(false);
    const [clickedLecture, setClickedLecture] = useState();
    const [countIndex, setCountIndex] = useState(0);
    const [activate, setActivate] = useState(true);

    const nextNumber = useRef(1);



    useEffect(() => {
        const primaryId = state.totalTimeTable.find(timeTable => timeTable.primary==true).id
        setCountIndex(primaryId-1);
        dispatch({
            type: 'READ_TABLE',
            id: primaryId   ,
        });
    }, []);


    useEffect(() => {

        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if (accessToken && accessToken !== null) {

            axios.get(`${API_BASE_URL}/api/timetable/${state.currentSet.year}/${state.currentSet.semester}/totalLectureList`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': '*/*',
                    'Authorization': "Bearer " + accessToken
                }, withCredentials: true,
            }).then(res => {
                dispatch({
                    type: 'READ_TOTAL_LECTURES',
                    totalLectures: res.data.lectureList,
                    searchedLectures: res.data.lectureList
                });
            }
            );
        } else {
            window.location.href = "/Login"
        }
    }, [])


    return (
        <>
            <Head_line>
                <Head_component>
                    <Logo_Image />
                    <Small_info name="신재민" std_num={2021203022} />
                </Head_component>
            </Head_line>
            <Body_line>
                <Total_Container>
                    <Left_Container>
                        <nav>
                            <Link to="/">
                                <Button_to_main> 메인화면으로 가기 </Button_to_main>
                            </Link>
                        </nav>
                        {openSelect && <div>
                            <Time_Table_Menu countIndex={countIndex} setCountIndex={setCountIndex} activate={activate} setActivate={setActivate} nextNumber={nextNumber} setTableId={setTableId} setOpenSelect={setOpenSelect} setOpenDetail={setOpenDetail} setBlockHover={setBlockHover} />
                        </div>}
                        {openDetail && <div>
                            <Edit_TimeTable totalLectures={state.totalLectures} tableId={tableId} setOpenSelect={setOpenSelect} setOpenDetail={setOpenDetail} setBlockHover={setBlockHover} />
                        </div>}
                        {openLectureDetail && <div>
                            <LectureDetail_B setOpenLectureDetail={setOpenLectureDetail} setOpenDetail={setOpenDetail} lecture={clickedLecture} backgroundColor={clickedLecture.backgroundColor} />
                        </div>}
                    </Left_Container>
                    <Right_Container>
                        <TimeTable
                            blockhover={blockhover}
                            setOpenLectureDetail={setOpenLectureDetail}
                            setClickedLecture={setClickedLecture}
                            setOpenDetail={setOpenDetail}
                            width={670}
                            height={713.46}
                        />
                    </Right_Container>
                </Total_Container>
            </Body_line>
        </>
    )
}



export default MyTimeTable;