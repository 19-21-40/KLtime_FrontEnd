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
    top: 70px;
    left: 90px;
    font-size:50px;
    font-weight: 900;
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
    top: 90px;
    right: 430px;
`;

const GR_Button = styled.button`
    
    width: 147px;
    height: 60px;

    position: absolute;
    top: 60px;
    right: 100px;

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



function Edit_TimeTable({totalLectures, innerText, tableId, setOpenSelect, setOpenDetail, setBlockHover}) {

    
    const [selectedLectures,setSelectedLectures]=useState([]);
    // const [totalLectures, setTotalLectures]=useState(testtotalLectures);
    // const [searchedLectures, setSearchedLectures]=useState(testtotalLectures);
    const [hoveredLecture,setHoveredLecture]=useState();
    
    const [edit, setEdit] = useState(false);
    const [newName, setNewName] = useState(innerText[2]);

    const Edit_click = () => {
        if(edit){
            setEdit(false);
        }
        else{
            setEdit(true);
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
        setEdit(false);
    };

    const Back_click = () => {
        setOpenSelect(true);
        setOpenDetail(false);
        setBlockHover(false);
    }
    
    return (
        <Total_Container>
            <Headcomponent>
                    <Back_Button onClick={Back_click}>{'<'}</Back_Button>
                    <TableInfo_1>{`${innerText[0]}년`} {innerText[1]}</TableInfo_1>
                    {edit ? null : <TableInfo_2>{innerText[2]} </TableInfo_2>}
                    <Edit_Name_Button onClick={Edit_click}>수정</Edit_Name_Button>
                    <GR_Button>졸업요건 확인</GR_Button>
            </Headcomponent>
            <form onSubmit={ console.log("aa") }>
                <input defaultValue={innerText[2]} />
            </form>
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