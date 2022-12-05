import TimeTable from "../components/TimeTable";
import LectureList from "../components/LectureList";
import { useEffect, useState, useRef, useReducer, createContext } from "react";
import Search from "../components/Search";
import SelectTimeTable  from "../components/SelectTimeTable"
import { UserTableProvider } from "../context/UserTableContext";
import Time_Table_Menu from "../components/Time_Table_Menu";
import styled from "styled-components";
import { useUserTableState, useUserTableDispatch} from '../context/UserTableContext';
import { useRequiredLectureDispatch } from "../context/RequiredLectureContext";
import axios from "axios";
import { API_BASE_URL } from "../app-config";
import editImage from "../image/Group.png"
import backImage from "../image/Back.png"
import grad_Img from "../image/grad-soft-19.png"

import { useUserInfoState } from "../context/UserInfoContext";

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

    position: absolute;

    top: 25%;
    left: 70%;

    display: flex;
    align-items:center;

    #notice {
        bottom: 30%;
        width: 500px;
        height: 300px;
    }

    #grad {
        top: 20%;
        right: 150px;
        width: 800px;
        height: 800px;
    }

`

const Notice_Box = styled.div`
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    position: relative;
    z-index: 2;

    border-radius: 20px;
    background-color: rgb(255, 255,255 );

    
`;

const Close2 = styled.button`
    
    position: relative;

    left: 75%;
    bottom: 350px;
    border: none;
    color : gray;
    background-color : transparent;
    font-size: 30px;
    
    cursor : pointer;

    z-index : 3;
    
`;

const Close = styled.button`
    
    position: relative;

    left: 90%;
    bottom: 120px;
    border: none;
    color : gray;
    background-color : transparent;
    font-size: 30px;
    
    cursor : pointer;

    z-index : 3;
    
`;

const Warning = styled.div`

    position: relative;
    bottom : 50px;
    font-size: 60px;
    color: #8b0b02;
`;

const Content = styled.div`
    font-size: 20px;
    text-align: center;
`;

const Table = styled.table`
    width: 440px;
    border-collapse: collapse;

    margin-bottom: 50px;
`;

const Caption = styled.caption`
    font-size: 25px;
    margin-bottom: 15px;
`;

const Thead = styled.thead`
    height: 40px;
`;
const Tbody = styled.tbody`
`;
const Th = styled.th`
    text-align: center;
    border: 1px solid lightgray;
`;

const Td = styled.td`
height: 30px;
    text-align: center;
    border: 1px solid lightgray;
`;

const Total_Container = styled.div `
    width: 750px;
    height: 950px;

    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;
    background: #FFFFFF;
    /* 학점그래프카드 그림자효과 */

    box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.1);
    border-radius: 50px;
`;

const Search_box = styled.div `
    width:680px;

    display: flex;
    position: relative;
    justify-content:center;

    box-sizing: border-box;
    
    margin-bottom: 30px;
`;

const LectureList_box = styled.div `
    
    width: 680px;
    
    position: relative;
    
    box-sizing: border-box;

`;

const Headcomponent =styled.div`
    display: flex;
    justify-content: center;

    width:100%;
    height: 160px;

    position: relative;
`;


const TableInfo_1 = styled.div`
    position: absolute;
    top: 35px;
    left: 90px;
    
    font-size:25px;
`;

const TableInfo_2 = styled.div`
    position: absolute;
    top: 78px;
    left: 94px;
    font-size:50px;
    font-weight: 900;
`;

const InputTableName = styled.input`
    position: absolute;
    top: 78px;
    left: 94px;

    width: 350px;

    font-size:50px;
    font-weight: 700;

`;

const Back_Button = styled.img`

    position: absolute;
    top: 35px;
    right: 90%;

    font-size: 30px;
    border: none;

    background-color: transparent;

    cursor:pointer;

`;

const Edit_Name_Button = styled.img`

    cursor: pointer;
    position: absolute;
    top:25px;
    margin-left:10px;
`;

const GR_Button = styled.button`
    
    width: 147px;
    height: 60px;

    position: absolute;
    top: 60px;
    right: 40px;

    background-color: #8b0b02;
    border: 1px;
    border-radius: 20px;

    font-size: 18px;
    color: white;

    cursor: pointer;
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




function Edit_TimeTable({totalLectures, tableId, setOpenSelect, setOpenDetail, setBlockHover}) {
    
    const userTableDispatch = useUserTableDispatch(); //
    const userTableState = useUserTableState();
    const requiredLectureDispatch = useRequiredLectureDispatch();
    
    // const [totalLectures, setTotalLectures]=useState(testtotalLectures);
    // const [searchedLectures, setSearchedLectures]=useState(testtotalLectures);
    
    const [edit, setEdit] = useState(false);
    const [newName, setNewName] = useState( " " );
    const [fold, setFold] = useState(false);

    const [openGrad, setOpenGrad] = useState(false);

    const [openNotice, setOpenNotice] = useState(false);
    const [notice, setNotice] = useState("");

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
                "essbalCredit": 0,
                "essCredit": 0,
                "balCredit": 0,
                "basicCredit": 0,
                "mathCredit": 0,
                "scienceCredit": 0
            }
        }
    );

    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    useEffect(
        () => {


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

    const Edit_click = () => {
        setEdit(!edit);
    }

    const closeNotice = () => {
        setOpenNotice(false);
        requiredLectureDispatch({
            type:'RESET',
          });
    }


    const tableName = userTableState.totalTimeTable.find( timeTable => timeTable.id == userTableState.selectedId ).tableName;
    useEffect (() => {
        setNewName(tableName);
    }, []);



    const changeTableName = (e) => {
        e.preventDefault();
        
        userTableDispatch({
            type: 'UPDATE_TABLE',
            tableName: newName
        });
        setEdit(false);
        if (accessToken && accessToken !== null) {
        axios.post(`${API_BASE_URL}/api/timetable/${userTableState.currentSet.year}/${userTableState.currentSet.semester}/changeName/${tableName}/${newName}`,null,{
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': '*/*',
                'Authorization': "Bearer " + accessToken,
            }, withCredentials: true,
        }).then(res=> {
        }
        );
     }
    }

    const Back_click = () => {
        setOpenSelect(true);
        setOpenDetail(false);
        setBlockHover(false);

        requiredLectureDispatch({
            type:'RESET',
          });
        setOpenNotice(false);
        setNotice("");
    }
    
    return (
        <Total_Container>
            <Headcomponent>
                    <Back_Button  src={backImage} onClick={Back_click}/>
                    <TableInfo_1>{`${userTableState.currentSet.year}년 ${userTableState.currentSet.semester}`}</TableInfo_1>
                    {edit ? 
                    <form onSubmit={ e => changeTableName(e) }>
                        <InputTableName value={newName} maxLength={15} onChange={ (e) => setNewName(e.target.value)}/>
                    </form> : <TableInfo_2>{newName} <Edit_Name_Button src={editImage} onClick={Edit_click} width={25} />
                    </TableInfo_2>}
                    <GR_Button onClick={() => setOpenGrad(true)}>졸업요건 확인</GR_Button>
                    {openGrad ? 
                    <Box_container>
                        <Close2 onClick={() => setOpenGrad(false)}>x</Close2>
                        <Background></Background> 
                        <Notice_Box id="grad">
                            <Table>
                                <Caption>졸업요건(졸업학점/내학점)</Caption>
                                <Thead>
                                    <tr>
                                        <Th>총학점</Th>
                                        <Th>주전공</Th>
                                        <Th>복수전공</Th>
                                        <Th>균형+필수</Th>
                                        <Th>기초교양</Th>
                                    </tr>
                                </Thead>
                                <Tbody>
                                    <tr>
                                        <Td>{data.gradcondition.gradCredit}</Td>
                                        <Td>{data.gradcondition.mainCredit}</Td>
                                        <Td>{data.gradcondition.multiCredit}</Td>
                                        <Td>{data.gradcondition.essBalCredit}</Td>
                                        <Td>{data.gradcondition.basicCredit}</Td>
                                    </tr>
                                    <tr>
                                        <Td>{data.credit.totalCredit}</Td>
                                        <Td>{data.credit.mainCredit}</Td>
                                        <Td>{data.credit.multiCredit}</Td>
                                        <Td>{data.credit.essBalCredit}</Td>
                                        <Td>{data.credit.basicCredit}</Td>
                                    </tr>
                                </Tbody>
                            </Table>
                            <img src={grad_Img}/>
                            </Notice_Box>
                    </Box_container>  : <></>}
            </Headcomponent>
            <Search_box>
                <Search
                fold={fold} setFold={setFold}
                />
            </Search_box>
            <LectureList_box>
                <LectureList setOpenNotice={setOpenNotice} setNotice={setNotice} fold={fold}/>
            </LectureList_box>
            {openNotice ? 
            <Box_container>
                <Close onClick={() => closeNotice()}>x</Close>
                <Background></Background> <Notice_Box id="notice"> <Warning>Warning!</Warning><Content>{notice} <br /> 강의 추가시 주의하세요! </Content></Notice_Box>
            </Box_container>  : <></>}
            
        </Total_Container>
    )
}



export default Edit_TimeTable;