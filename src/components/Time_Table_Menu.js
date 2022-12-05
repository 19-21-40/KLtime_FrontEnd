import { useEffect, useRef, useState, useCallback } from "react";
import ModifyTimeTableModal from "../components/ModifyTimeTableModal";
import { useUserTableState, useUserTableDispatch } from '../context/UserTableContext';
import styled, { css } from "styled-components";
import axios from "axios";
import { API_BASE_URL } from "../app-config";
import userEvent from "@testing-library/user-event";
import BookMark_black from "../image/Bookmark.png"
import BookMark_color from "../image/Bookmark_color.png"
import { style } from "@mui/system";
// import KwangWoon_Logo from '../components/image/KwangWoon_Logo.png'

// const Logo_Image = styled.div`
//     width: 200px;
//     height: 200px;
//     border-radius: 50%;
//     overflow: hidden;
// `;
const Total_Container = styled.div`
    width: 750px;
    height: 950px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    
    position: relative;
    background: #FFFFFF;
    /* 학점그래프카드 그림자효과 */

    box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.1);
    border-radius: 50px;
`;

const Select = styled.select`
    width: 180px;
    height: 40px;
    margin-right: 10px;
    font-size:20px;

    border-radius: 0.25em;

    text-align: center;
`

const Select_container = styled.div`
    display: flex;

    width: 600px;
    height: 100px;

    position: absolute;
    top:50px;
`;

const Time_table_list = styled.div`
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    width: 100%;
    height: 686px;

    justify-content: center;
    // align-items: center;

    position: absolute;
    top:130px;
    left: 1.8%;


`;

const Time_table_box = styled.div`

    position: relative;

    display: flex;
    flex-direction: column;

    width: 200px;
    height: 180px;

    margin: 10px;

    background-color: ${props => (props.activate && props.countIndex === props.idx ? 'pink' : 'white')};
    /* 년도,학기별 시간표박스 */

    border: 0.3px solid #A7A7A7;
    /* 시간표박스 그림자 */

    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.07);
    border-radius: 5px

`;

const Tag = styled.img`
    width: 30px;
    position: absolute;

    margin-left: 15px;
    top: -13px;
`

const Time_table_info = styled.div`
    margin-top: 10px;
    margin-bottom: 20px;    

    text-align: center;
    font-size: 25px;
`

const Delete_button = styled.button`
    width: 30px;
    height: 30px;

    position: relative;
    left: 160px;

    cursor: pointer;
    font-size: 30px;
    background-color: transparent;
    border: none;
`;

const None = styled.div`
    width: 30px;
    height: 30px;
    position: relative;
    left: 160px;
    cursor: pointer;
    font-size: 30px;
    background-color: transparent;
    border: none;
`

const Edit_button = styled.button`
    width: 50px;
    height: 30px;

    position: relative;
    left: 130px;
    top: 30px;

    text-align: center;
    cursor: pointer;
    font-size: 20px;
    border: none;
`;

const Add_Button = styled.button`
    width: 200px;
    height: 180px;
    border: 2px solid black;
    border-radius: 10px;
    margin: 10px;
    cursor:pointer;

    font-size: 50px;
`;

const BookMark_Btn_Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    left: 180px;

    width: 45px;
    height: 50px;    
    border: 1px solid gray;

    cursor: pointer;
`;

const Bookmark_Btn = styled.img`
    position: relative;
    width: 25px;
    height: 40px;

`;

function Time_Table_Menu({ countIndex, setCountIndex, activate, setActivate, nextNumber, setTableId, setOpenSelect, setOpenDetail, innerText, setInnerText, setBlockHover }) {

    const userTableDispatch = useUserTableDispatch();
    const userTableState = useUserTableState();

    // JSON.parse(localStorage.getItem('시간표'))를 하면 새로고침을 해도 유지가 됨, 다만 일부 버그가 존재
    // useRef를 사용해도 될까?
    // const nextNumber = useRef(2);
    const selectTimeTableOption = useRef(null);
    const isFirstAddTable = useRef(true);

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    
    const handleOnClick = (e, idx) => {
        setCountIndex(idx);
        setActivate(true);
    };

    const update_Table = (id) => {
        console.log(userTableState);
        console.log(id);
        
        userTableDispatch({
            type: 'READ_TABLE',
            id: id,
        });
        console.log(userTableState.selectedId);
    };

    const SelectYear = (e) => {
        userTableDispatch({
            type: 'CHANGE_YEAR_SEMESTER',
            currentSet: {
                year: parseInt(e.target.value),
                semester: "1학기"
            },
        });

        console.log(semesterRef);
        semesterRef.current.value = "1학기";
        semesterRef.current.defaultValue = "1학기";
        // setInnerText({...innerText, year : e.target.value});
    };

    const SelectSemester = (e) => {
        userTableDispatch({
            type: 'CHANGE_YEAR_SEMESTER',
            currentSet: {
                year: userTableState.currentSet.year,
                semester: e.target.value
            },
        });
        // setInnerText({...innerText, semester : e.target.value});
    };

    useEffect(() => {


        const primaryId = userTableState.totalTimeTable.find(timeTable => timeTable.primary==true).id
                setCountIndex(() => primaryId-1);

                userTableDispatch({
                    type: 'READ_TABLE',
                    id: primaryId,
                });


    }, [userTableState.totalTimeTable])

    useEffect(() => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if (accessToken && accessToken !== null) {
            axios.get(`${API_BASE_URL}/api/timetable/${userTableState.currentSet.year}/${userTableState.currentSet.semester}/totalTimeTableList`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': '*/*',
                    'Authorization': "Bearer " + accessToken
                }, withCredentials: true,
            }).then(res => {
                userTableDispatch({
                    type: 'READ_TOTAL_TIMETABLE',
                    totalTimeTable: res.data.totalTableList,
                });

                
            }
            );
        } else {
            
            // window.location.href = "/Login"
        }


    }, [userTableState.currentSet]);

    


    const addTimeTable = () => {

        // 시간표 이름이나 id값이 중복되는지 확인
        nextNumber.current = userTableState.totalTimeTable.length;
        nextNumber.current += 1;
        userTableState.totalTimeTable.map(timeTable => {
            if (timeTable.id == nextNumber.curret ||
                timeTable.tableName == `시간표${nextNumber.current}`) {
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
                primary: false,
            },
            selectedId: nextNumber.current,
        });


        // 시간표 이름과 student정보를 백으로 던져줌
        if (accessToken && accessToken !== null) {
        axios.post(`${API_BASE_URL}/api/timetable/${userTableState.currentSet.year}/${userTableState.currentSet.semester}/add/${newTableName}`,null, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': '*/*',
                'Authorization': "Bearer " + accessToken,
            }, withCredentials: true,
        }).then(res => {
        }
        );
    } else {

    }
        isFirstAddTable.current = false;
    };


    const onRemove = (id, tableName) => {
        if (userTableState.totalTimeTable.length != 1) {
            userTableDispatch({
                type: 'DELETE_TABLE',
                id,
            });
            axios.post(`${API_BASE_URL}/api/timetable/${userTableState.currentSet.year}/${userTableState.currentSet.semester}/delete/${tableName}`, null,{
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': '*/*',
                    'Authorization': "Bearer " + accessToken,
                }, withCredentials: true,
            }).then(res => {
            }
            );
        };//삭제
    }





    const [isModifyTimeTable, setIsModifyTimeTable] = useState(false);

    const handleClick = () => {
        setIsModifyTimeTable(true);
    }

    const In_Click = (id) => {
        setOpenSelect(false);
        setOpenDetail(true);
        setBlockHover(true);
        setTableId(id);
        // setInnerText({year: year,semester: semester, tableName: name});
    }

    const BookMarker = () => {
        userTableDispatch({
            type: 'PRIMARY_TABLE',
        });

        const primaryTableName = userTableState.totalTimeTable.find(timeTable => timeTable.id == userTableState.selectedId).tableName;

        axios.post(`${API_BASE_URL}/api/timetable/${userTableState.currentSet.year}/${userTableState.currentSet.semester}/changePrimary/${primaryTableName}`, null,{
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': '*/*',
                'Authorization': "Bearer " + accessToken,
            }, withCredentials: true,
        }).then(res => {
        }
        );
    }

    const semesterRef = useRef(null);

    const primaryId = userTableState.totalTimeTable.find(timeTable => timeTable.primary==true).id;

    return (
        <Total_Container>
                <Select_container>
                    <Select defaultValue={userTableState.currentSet.year}  onChange={SelectYear}>
                    // 학생의 학번부터 생성되게 해야함
                        <option key={2022}>2022</option>
                        <option key={2021}>2021</option>
                        <option key={2020}>2020</option>
                        <option key={2019}>2019</option>
                    </Select>
                    <Select ref={semesterRef} defaultValue={userTableState.currentSet.semester} onChange={SelectSemester}>
                        <option key={1}>1학기</option>
                        <option key={1.5}>계절학기(하계)</option>
                        <option key={2}>2학기</option>
                        <option key={2.5}>계절학기(동계)</option>
                    </Select>
                    <BookMark_Btn_Container onClick={BookMarker}>
                        <Bookmark_Btn src={BookMark_black} />
                    </BookMark_Btn_Container>
                </Select_container>
                <Time_table_list>
                    {userTableState.totalTimeTable.map((table, idx) => {
                        return (
                            <Time_table_box
                                value={table.tableName} key={table.id}
                                activate={activate}
                                countIndex={countIndex} idx={idx}
                                onClick={e => {
                                    handleOnClick(e, idx)
                                    update_Table(table.id)
                                }}>
                                {primaryId == table.id && <Tag src={BookMark_color}/>}
                                {primaryId != table.id ? <Delete_button onClick={(event) => {
                                    onRemove(table.id, table.tableName)
                                    event.stopPropagation()
                                }}>x</Delete_button> : <None></None>
                                }
                                <Time_table_info>
                                    {table.tableName}
                                </Time_table_info>
                                {activate && countIndex === idx && <Edit_button onClick={() => {
                                    In_Click(table.id)
                                    update_Table(table.id)
                                }}>Edit</Edit_button>}
                            </Time_table_box>
                        )
                    })}
                    <Time_table_box>
                        <h1>추천 시간표</h1>
                    </Time_table_box>
                    <Add_Button onClick={addTimeTable}>+</Add_Button>
                </Time_table_list>
        </Total_Container>
    );

}

export default Time_Table_Menu;