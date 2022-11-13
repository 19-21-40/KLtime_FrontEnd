import { useEffect, useRef, useState , useCallback} from "react";
import { UserTableProvider } from "../context/UserTableContext";
import ModifyTimeTableModal from "../components/ModifyTimeTableModal";
import { useUserTableState, useUserTableDispatch} from '../context/UserTableContext';
import styled from "styled-components";
import axios from "axios";
// import KwangWoon_Logo from '../components/image/KwangWoon_Logo.png'

// const Logo_Image = styled.div`
//     width: 200px;
//     height: 200px;
//     border-radius: 50%;
//     overflow: hidden;
// `;
const Total_Container = styled.div`
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

const Select = styled.select`
    width: 100px;
    height: 25px;
    margin-right: 10px;
`

const Select_Semester = styled.div`
    display: flex;
    width: 600px;
    height: 100px;
`;

const Time_table_list = styled.div`
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    width: 600px;
    height: 700px;
`;

const Time_table_box = styled.div`
    width: 160px;
    height: 140px;
    border: 2px solid black;
    border-radius: 20px;
    margin: 10px;
`;

const Add_Button = styled.button`
    width: 60px;
    height: 60px;
    border: 2px solid black;
    border-radius: 10px;
    margin: 10px;
    cursor:pointer;
`;

const Delete_button = styled.button`

`;

const Edit_button = styled.button`

`;


function Time_Table_Menu({nextNumber, setTableId, setOpenSelect, setOpenDetail, innerText,setInnerText, setBlockHover}){

    const userTableDispatch = useUserTableDispatch(); //
    const userTableState = useUserTableState();
    
                                                                // JSON.parse(localStorage.getItem('시간표'))를 하면 새로고침을 해도 유지가 됨, 다만 일부 버그가 존재
                                                                // useRef를 사용해도 될까?
    // const nextNumber = useRef(2);
    const selectTimeTableOption = useRef(null);
    const isFirstAddTable = useRef(true);
    const [countIndex, setCountIndex] = useState(-1);
    const [activate, setActivate] = useState(false);

    const handleOnClick = (e, idx) => {
        setCountIndex(idx);
        if(activate){
            setActivate(false);
        }
        else{
            setActivate(true);
        }
    };

    const DefaultActivate = () => {
        setActivate(false);
    }

    const update_Table = (id) => {
        userTableDispatch({
            type: 'READ_TABLE',
            id: id,
        });  
    };

    const SelectYear = (e) => {
        setInnerText({...innerText, year : e.target.value});
    };

    const SelectSemester = (e) => {
        setInnerText({...innerText, semester : e.target.value});
    };

    useEffect(()=>{ 
        
        console.log(innerText);

        axios.post(`http://localhost:8080/api/timetable/${innerText.year}/${innerText.semester}/totalTimeTableList`, {
            "token":"1234",
            "number":"2019203082"
       }, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': '*/*',
            }, withCredentials: true,
        }).then(res=> {
            userTableDispatch({
                type:'READ_TOTAL_TIMETABLE',
                totalTimeTable:res.data.totalTableList,
            }); 
            console.log(res.data);
        }
        );

        // axios.post(`http://localhost:8080/api/timetable/${innerText.year}/${innerText.semester}/totalLectureList`, {
        //     token:"1234",
        //     number:"2019203082"
        // }, {
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //         'Accept': '*/*',
        //     }, withCredentials: true,
        // }).then(res=> {
        //     userTableDispatch({
        //         type:'READ_TOTAL_LECTURES',
        //         totalLectures:res.data.lectureList,
        //         searchedLectures:res.data.lectureList
        //     });
        //     console.log(res.data);
        // }
        // );
    }, [innerText]);

    const selectTimeTable = (e) => {
        
        const idx = e.target.selectedIndex;
        const option = e.target.querySelectorAll('option')[idx];
        const name = option.getAttribute('name');

        userTableDispatch({
            type: 'READ_TABLE',
            id: parseInt(e.target.value),
        });  
    };

    const addTimeTable = () => {

        // 시간표 이름이나 id값이 중복되는지 확인
        nextNumber.current = userTableState.totalTimeTable.length;
        nextNumber.current += 1;
        userTableState.totalTimeTable.map(timeTable => {
            if(timeTable.id == nextNumber.curret ||
                 timeTable.tableName == `시간표${nextNumber.current}`){
                nextNumber.current += 1;
            } 
        })
        
        // 시간표 이름 선언 및 초기화
        const newTableName = `시간표${nextNumber.current}`

        // dispatch로 state에 새로운 table 추가
        userTableDispatch({
            type: 'CREATE_TABLE', 
            timeTable: {
                id: nextNumber.current,
                tableName: newTableName,
                lectureList: [],
                isprimary: false,
            },
            selectedId: nextNumber.current,
        });

        // 시간표 이름과 student정보를 백으로 던져줌
        axios.post(`http://localhost:8080/api/timetable/2022/1학기/add/${newTableName}`, {
            "token":"1234",
            "number":"2019203082"
       }, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': '*/*',
            }, withCredentials: true,
        }).then(res=> {
        }
        );

        isFirstAddTable.current = false;
    };


    const onRemove = (id, tableName) => {
        userTableDispatch({
          type: 'DELETE_TABLE',
          id,
        });
        axios.post(`http://localhost:8080/api/timetable/2022/1학기/delete/${tableName}`, {
            "token":"1234",
            "number":"2019203082"
       }, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': '*/*',
            }, withCredentials: true,
        }).then(res=> {
        }
        );
      };//삭제




    const [isModifyTimeTable, setIsModifyTimeTable] = useState(false);

    const handleClick = () => {
        setIsModifyTimeTable(true);
    }

    const In_Click = (id, year, semester, name) => {
        setOpenSelect(false);
        setOpenDetail(true);
        setBlockHover(true);
        setTableId(id);
        setInnerText([year, semester, name]);
    }

    return (
        <Total_Container>
            <UserTableProvider>
            <Select_Semester>
                <Select onChange={SelectYear}>
                    // 학생의 학번부터 생성되게 해야함
                    <option>2022</option>
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                </Select>
                <Select onChange={SelectSemester}>
                    <option>1학기</option>
                    <option>계절학기(하계)</option>
                    <option>2학기</option>
                    <option>계절학기(동계)</option>
                </Select>
            </Select_Semester>
            <Time_table_list>
                {userTableState.totalTimeTable.map((table, idx)=> { return (
                    <Time_table_box
                    value={table.tableName} key={table.id}
                    onClick={e => {handleOnClick(e, idx)
                        // update_Table(table.id)
                    }}>
                        <Delete_button onClick={ () => {
                            onRemove(table.id, table.tableName)
                        }}>X</Delete_button>
                        {table.tableName}
                        {activate && countIndex === idx && <Edit_button onClick={ () => {
                            In_Click(table.id, userTableState.totalTimeTable_big[0].year, userTableState.totalTimeTable_big[0].semester,table.tableName)
                            update_Table(table.id)
                        }}>Edit</Edit_button>}
                        </Time_table_box>
                )})}
                <Time_table_box>
                    <h1>추천 시간표</h1>
                </Time_table_box>
                <Add_Button onClick={addTimeTable}>+</Add_Button>
            </Time_table_list>
            </UserTableProvider>
        </Total_Container>
    );

}

export default Time_Table_Menu;