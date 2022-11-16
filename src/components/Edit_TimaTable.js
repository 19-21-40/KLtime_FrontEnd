import TimeTable from "../components/TimeTable";
import LectureList from "../components/LectureList";
import { useEffect, useState, useRef, useReducer, createContext } from "react";
import Search from "../components/Search";
import SelectTimeTable  from "../components/SelectTimeTable"
import { UserTableProvider } from "../context/UserTableContext";
import Time_Table_Menu from "../components/Time_Table_Menu";
import styled from "styled-components";
import { useUserTableState, useUserTableDispatch} from '../context/UserTableContext';
import axios from "axios";


const Total_Container = styled.div `
    width: 750px;
    height: 891px;

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

const Back_Button = styled.button`
    width: 30px;
    height: 50px;

    position: absolute;
    top: 25px;
    right: 90%;

    font-size: 30px;
    border: 2px solid #828282;

    background-color: transparent;

`;

const Edit_Name_Button = styled.button`
    width: 50px;
    height: 30px;

    position: absolute;
    top:20px;
    margin-left:10px;
`;

const GR_Button = styled.button`
    
    width: 147px;
    height: 60px;

    position: absolute;
    top: 60px;
    right: 40px;

    background: #D9D9D9;
    border: 1px;
    border-radius: 20px;

    font-size: 18px;
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



function Edit_TimeTable({totalLectures, tableId, setOpenSelect, setOpenDetail, setBlockHover}) {
    
    const userTableDispatch = useUserTableDispatch(); //
    const userTableState = useUserTableState();

    const [selectedLectures,setSelectedLectures]=useState([]);
    // const [totalLectures, setTotalLectures]=useState(testtotalLectures);
    // const [searchedLectures, setSearchedLectures]=useState(testtotalLectures);
    const [hoveredLecture,setHoveredLecture]=useState();
    
    const [edit, setEdit] = useState(false);
    const [newName, setNewName] = useState( " " );

    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    const Edit_click = () => {
        setEdit(!edit);
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
        axios.get(`http://localhost:8080/api/timetable/${userTableState.currentSet.year}/${userTableState.currentSet.semester}/changeName/${tableName}/${newName}`,{
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
    }
    
    return (
        <Total_Container>
            <Headcomponent>
                    <Back_Button onClick={Back_click}>{'<'}</Back_Button>
                    <TableInfo_1>{`${userTableState.currentSet.year}년 ${userTableState.currentSet.semester}`}</TableInfo_1>
                    {edit ? 
                    <form onSubmit={ e => changeTableName(e) }>
                        <InputTableName value={newName} maxLength={15} onChange={ (e) => setNewName(e.target.value)}/>
                    </form> : <TableInfo_2>{newName} <Edit_Name_Button onClick={Edit_click}>수정</Edit_Name_Button></TableInfo_2>}
                    <GR_Button>졸업요건 확인</GR_Button>
            </Headcomponent>
            <Search_box>
                <Search
                totalLectures={totalLectures}
                />
            </Search_box>
            <LectureList_box>
                <LectureList />
            </LectureList_box>
        </Total_Container>
    )
}



export default Edit_TimeTable;