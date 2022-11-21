import Piechart from "../components/Graph";
import TimeTable from "../components/TimeTable";
import Small_info from "../components/Small_info";
import { UserTableProvider } from "../context/UserTableContext";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { call } from "../service/ApiService";
import { isOptionGroup } from "@mui/base";
import Klas from "../components/Klas";
import { Link } from "react-router-dom";
import { useUserTableState, useUserTableDispatch } from '../context/UserTableContext';
import { API_BASE_URL } from "../app-config";
import KLTimeLogo from "../image/KLTimeLogo.png"
import LoginBg from "../image/loginbg.jpg"
import { useUserInfoDispatch, useUserInfoState } from "../context/UserInfoContext";
import UserInfo from "../components/UserInfo";


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

    background-color: transparent;
    
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

    z-index: 1;
`;


const Component_position = styled.div`
    display: flex;
    // flex-direction: column;

    position: relative;
    width: 1600px;
    height: 1100px;

    background: #FFFFFF;

    border: 1px solid #D9D9D9;
    border-radius: 10px;

    
`;

const Left_component = styled.div`
    display:flex;
    flex-direction: column;

    width: 680px;
    height: 100%;

    position: absolute;
    top:5%;
    left:2%;
    
`;


const Header_Chart_Box = styled.div`
    display:flex;
    
    width: 100%;
    height: 340px;

    position:absolute;
    margin-bottom: 30.8px;

    // border: 2px solid black;
    // justify-content: center;
    
`;

const Body_Chart_Box = styled.div`
    display:flex;
    flex-direction: column;
    width:100%;

    position:absolute;
    top: 381px;
    
    
`;

const Upper_Body_Chart_Box = styled.div`
    display:flex;
    width:100%;
`;


const Lower_Body_Chart_Box = styled.div`
    display:flex;
    width:667px;

    position:relative;
    top: 33px;
`;

const Small_Body_Chart_Box = styled.div`
    display:flex;
    flex-direction: column;
    width: 320px;
    height: 368px;
`;

const Su_Body_Chart_Box = styled.div`
    display:flex;
`;

const Sl_Body_Chart_Box = styled.div`
    display:flex;
    justify-content: space-around;
`;

const Design_Box = styled.div`
    width:100%;
    background: #FFFFFF;
    border-radius: 50px;
    box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.1);
`;

const Right_component = styled.div`
    display:flex;

    width: 750px;

    position: relative;
    top: 80px;
    left: 50%;

    margin-right:20px;

`;



const TimeTableHeader = styled.div`
    position:absolute;
    top: -5px;

    display:flex;

`;

const TableName = styled.div`
    font-size:50px;
    // font-weight: 900;
`;

const TimeTableBody = styled.div`
    
    display:flex;
    justify-content: center;

    position: relative;

    top: 7%;
    width : 100%;
    height: 910px;

    background: #FFFFFF;

    box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.1);
    border-radius: 50px;
`

const TimeTableContainer = styled.div`
    width : 670px;
    
    display: flex;
    
`

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

const GoTable_Btn = styled.button`
    
    position: relative;
    left: 200px;

    width: 250px;
    height: 60px;

    font-size:17px;
    font-weight:700;
    color:white;
    background: #B81D24;
    border-radius: 20px;
    border:none;

    cursor: pointer;
`;

function MainPage() {
    const userDispatch = useUserInfoDispatch();
    const tableDispatch = useUserTableDispatch();
    const state = useUserTableState();
    const user = useUserInfoState();



    useEffect(() => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");

        if (accessToken && accessToken !== null) {
            axios.get(`${API_BASE_URL}/api/loadUser`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': '*/*',
                    'Authorization': "Bearer " + accessToken
                }, withCredentials: true,
            }).then(res => {
                userDispatch({
                    type: 'LOAD_USER',
                    number: res.data.number,
                    email:res.data.email,
                    department:res.data.departmentName,
                    grade:res.data.grade,
                    name: res.data.name
                })
            })


            axios.get(`${API_BASE_URL}/api/timetable/2022/2학기/totalTimeTableList`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': '*/*',
                    'Authorization': "Bearer " + accessToken
                }, withCredentials: true,
            }).then(res => {
                tableDispatch({
                    type: 'READ_TOTAL_TIMETABLE',
                    totalTimeTable: res.data.totalTableList,
                });
            });
        } else {
            window.location.href = "/Login"
        }
    }, []);

    useEffect(() => {
        const primaryId = state.totalTimeTable.find(timeTable => timeTable.primary == true).id;
        tableDispatch({
            type: 'READ_TABLE',
            id: primaryId,
        });

    }, [state.totalTimeTable]);

    const [klas, setKlas] = useState(false);//Klas 연동하기
    const [edit, setEdit] = useState(false);//계정정보 수정

    const onClose = () => {
        setEdit(false);
        setKlas(false);
    }

    // const update_Table = (id) => {
    //     userTableDispatch({
    //         type: 'READ_TABLE',
    //         id: id,
    //     });
    // };

    const [data, setData] = useState(
        {
            "gradcondition": {
                "admissionYear": 999,
                "gradCredit": 999,
                "mainCredit": 999,
                "essBalCredit": 999,
                "basicCredit": 999,
                "multiCredit": null
            },
            "credit": {
                "totalCredit": 0,
                "mainCredit": 0,
                "multiCredit": 0,
                "essCredit": 0,
                "balCredit": 0,
                "basicCredit": 0,
                "mathCredit": 0,
                "scienceCredit": 0
            }
        }
    );

    useEffect(
        () => {
            const accessToken = localStorage.getItem("ACCESS_TOKEN");
            if (accessToken && accessToken !== null) {

                axios.get(`${API_BASE_URL}/api/gradConditionAndCredit`, {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'Accept': '*/*',
                        'Authorization': "Bearer " + accessToken
                    }, withCredentials: true,
                }).then(res => {
                    setData(res.data);
                }
                );
            } else {
                window.location.href = "/Login"
            }
        }
        , []);


    return (
        <>
            <Head_line>
                <Head_component>
                    <Logo_Image src={KLTimeLogo} onClick={() => window.location.href = "/"} />
                    <Small_info name={user.name} number={user.number} setEdit={setEdit} setKlas={setKlas} />
                </Head_component>
            </Head_line>
            <Body_line>
                <Component_position>
                    <Left_component>
                        <Header_Chart_Box>
                            <Design_Box>
                                <Piechart Full_num={data?.gradcondition.gradCredit} Already_num={data?.credit.totalCredit} Kind="총학점" section="total" Chart_size={280} Width={650} Height={320} Top_css={25} Left_css={0} font_1={30} font_2={20} />
                            </Design_Box>
                        </Header_Chart_Box>
                        <Body_Chart_Box>
                            <Upper_Body_Chart_Box>
                                <Design_Box>
                                    <Piechart Full_num={data?.gradcondition.mainCredit} Already_num={data?.credit.mainCredit} Kind="전공학점" section="main" Chart_size={150} Width={320} Height={207.2} Top_css={35} Left_css={5} font_1={30} font_2={20} />
                                </Design_Box>
                                <Design_Box>
                                    <Piechart Full_num={data?.gradcondition.multiCredit} Already_num={data?.credit.multiCredit} Kind="부전공학점" section="sub" Chart_size={150} Width={320} Height={207.2} Top_css={35} Left_css={5} font_1={30} font_2={20} />
                                </Design_Box>
                            </Upper_Body_Chart_Box>
                            <Lower_Body_Chart_Box>
                                <Design_Box>
                                    <Small_Body_Chart_Box>
                                        <Su_Body_Chart_Box>
                                            <Piechart Full_num={data?.gradcondition.basicCredit} Already_num={data?.credit.basicCredit} Kind="기초학점" section="basic" Chart_size={150} Width={325} Height={160} Top_css={35} Left_css={5} font_1={30} font_2={20} />
                                        </Su_Body_Chart_Box>
                                        <Sl_Body_Chart_Box>
                                            <Piechart Full_num={0} Already_num={data?.credit.mathCredit} Kind="수학" section="math" Chart_size={100} Width={162.5} Height={80} Top_css={35} Left_css={15} font_1={25} font_2={15} />
                                            <Piechart Full_num={0} Already_num={data?.credit.scienceCredit} Kind="기초과학" section="basicScience" Chart_size={100} Width={162.5} Height={80} Top_css={35} Left_css={15} font_1={25} font_2={15} />
                                        </Sl_Body_Chart_Box>
                                    </Small_Body_Chart_Box>
                                </Design_Box>
                                <Design_Box>
                                    <Small_Body_Chart_Box>
                                        <Su_Body_Chart_Box>
                                            <Piechart Full_num={data?.gradcondition.essBalCredit} Already_num={data?.credit.balCredit + data?.credit.essCredit} Kind="교양학점" section="essBal" Chart_size={150} Width={325} Height={160} Top_css={35} Left_css={5} font_1={30} font_2={20} />
                                        </Su_Body_Chart_Box>
                                        <Sl_Body_Chart_Box>
                                            <Piechart Full_num={0} Already_num={data?.credit.balCredit} Kind="균형" section="bal" Chart_size={100} Width={162.5} Height={80} Top_css={35} Left_css={15} font_1={25} font_2={15} />
                                            <Piechart Full_num={0} Already_num={data?.credit.essCredit} Kind="필수" section="ess" Chart_size={100} Width={162.5} Height={80} Top_css={35} Left_css={15} font_1={25} font_2={15} />
                                        </Sl_Body_Chart_Box>
                                    </Small_Body_Chart_Box>
                                </Design_Box>
                            </Lower_Body_Chart_Box>
                        </Body_Chart_Box>
                    </Left_component>
                    <Right_component>
                        <TimeTableHeader>
                            <TableName> 나의 시간표 </ TableName>
                            <Link to="/MyTimeTable">
                                <GoTable_Btn>시간표 바로가기</GoTable_Btn>
                            </Link>
                        </TimeTableHeader>
                        <TimeTableBody>
                            <TimeTableContainer>
                                <TimeTable width={670} height={893} />
                            </TimeTableContainer>
                        </TimeTableBody>
                    </Right_component>
                    <Box_container>
                        {edit ? <><Background></Background> <UserInfo_Box><UserInfo setEdit={setEdit}/> </UserInfo_Box></> : <></>}
                        {klas ? <><Background></Background><Klas_Box><Klas /> <P_Button onClick={onClose} >X</P_Button></Klas_Box></> : <></>}
                    </Box_container>
                </Component_position>
            </Body_line>
        </>
    )
}

export default MainPage;