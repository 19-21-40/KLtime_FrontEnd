import TimeTable from "../components/TimeTable";
import LectureList from "../components/LectureList";
import { useEffect, useState, useRef, useReducer, createContext } from "react";
import Time_Table_Menu from "../components/Time_Table_Menu";
import styled from "styled-components";
import axios from "axios";
import Edit_TimeTable from "../components/Edit_TimaTable";
import Small_info from "../components/Small_info";
import { Link } from "react-router-dom";
import { useUserTableState, useUserTableDispatch } from '../context/UserTableContext';
import LectureDetail_B from "../components/LectureDetail_B";
import { API_BASE_URL } from "../app-config";
import KLTimeLogo_white from "../image/KLTimeLogo_white.png"
import Klas from "../components/Klas";
import LoginBg from "../image/loginbg.jpg"
import { useUserInfoState } from "../context/UserInfoContext";
import UserInfo from "../components/UserInfo";

const Head_line = styled.div`
    
    display:flex;
    justify-content:center;

    position: absolute;
    width: 100vw;
    height: 121px;
    left: 0px;
    top: 0px;

    background: #8b0b02;
`;

const Head_component = styled.div`
    display:flex;    

    position: absolute;
    width: 1600px;
    height: 100%;
    
`;

const Logo_Image = styled.img`
    box-sizing: border-box;

    position: absolute;
    left: 50px;
    top: 13px;

    /* 학점-숫자 */

    cursor: pointer;
    border: none;
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
    height: 950px;

    position: relative;
    top: 113px;
    left: 15px;

    background: #FFFFFF;

    box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.1);
    border-radius: 50px;
`;

const Background = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;

    position:fixed;
    top:0;
    left:0;
    z-index:1;

    width: 100vw;
    height: 100vh;

    background-color: lightgray;
    opacity: 0.7;
    
`;  

const Box_container = styled.div`
    
    display: flex;
    justify-content:center;
    // align-items:center;

`

const Klas_Box = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;

    position: absolute;
    z-index: 10;

    width: 800px;
    height: 700px;

    border-radius: 20px;

    background: #000 url(${LoginBg}) no-repeat 0 0 !important;
    background-image: url(${LoginBg});
    background-position-x: 0px;
    background-position-y: 0px;
    background-size: 100% !important;
    background-repeat-x: no-repeat;
    background-repeat-y: no-repeat;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    background-color: rgb(0, 0, 0);
`;

const UserInfo_Box = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;

    position: absolute;
    z-index: 10;

    width: 1200px;
    height: 900px;

    border-radius: 20px;
    background-color: rgb(255, 255,255 );

    
`;

const P_Button = styled.button`
    display: flex;
    align-items:center;
    justify-content: center;
    width: 20px;
    height: 20px;

    position:absolute;
    top:30px;
    right: 30px;

    border: none;
    
    font-size: 30px;
    color:gray;
    background-color: transparent;
    
    cursor: pointer;

    z-index:3;
`;



function MyTimeTable() {
    const dispatch = useUserTableDispatch();
    const state = useUserTableState();
    const user=useUserInfoState();
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

    const [klas, setKlas] = useState(false);//Klas 연동하기
    const [edit, setEdit] = useState(false);//계정정보 수정

    const onClose = () => {
        setEdit(false);
        setKlas(false);
    }

    const nextNumber = useRef(1);
    


    useEffect(() => {
        const primaryId = state.totalTimeTable.find(timeTable => timeTable.primary == true).id
        setCountIndex(primaryId - 1);
        dispatch({
            type: 'READ_TABLE',
            id: primaryId,
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
                    <nav>
                        <Link to="/">
                            <Logo_Image src={KLTimeLogo_white} />
                        </Link>
                    </nav>
                    <Small_info name={user.name} number={user.number} setEdit={setEdit} setKlas={setKlas}  />
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
                    <Box_container>
                        {edit ? <><Background></Background> <UserInfo_Box><UserInfo setEdit={setEdit}/> </UserInfo_Box></> : <></>}
                        {klas ? <><Background></Background><Klas_Box><Klas /> <P_Button onClick={onClose} >X</P_Button></Klas_Box></> : <></>}
                    </Box_container>
                    <Right_Container>
                        <TimeTable
                            blockhover={blockhover}
                            setOpenLectureDetail={setOpenLectureDetail}
                            setClickedLecture={setClickedLecture}
                            setOpenDetail={setOpenDetail}
                            width={670}
                            height={910}
                        />
                    </Right_Container>
                </Total_Container>
                
            </Body_line>
            
        </>
    )
}



export default MyTimeTable;