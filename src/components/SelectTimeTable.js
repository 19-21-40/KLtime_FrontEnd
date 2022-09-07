import { useEffect, useRef, useState } from "react";
import ModifyTimeTableModal from "../components/ModifyTimeTableModal";
import { useUserTableState, useUserTableDispatch} from '../context/UserTableContext';
import styled from "styled-components";

const ViewTimeTableList = styled.div`

    height: 40px;
    button{

        height: 25px;
    }
`
const Select = styled.select`
    width: 100px;
    height: 25px;
    margin-right: 10px;
`

const PlusBtn = styled.button`
    margin-right: 10px;
`

const ModifyBtn = styled.button`
    margin-right: 10px;
`

const DeleteBtn = styled.button`
`


function SelectTimeTable({
}) 
{
    

    const userTableDispatch = useUserTableDispatch(); //
    const userTableState = useUserTableState();
    
                                                                // JSON.parse(localStorage.getItem('시간표'))를 하면 새로고침을 해도 유지가 됨, 다만 일부 버그가 존재
                                                                // useRef를 사용해도 될까?


    const nextNumber = useRef(2);
    const selectTimeTableOption = useRef(null);
    const isFirstAddTable = useRef(true);
    
    
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

        nextNumber.current += 1;

        userTableDispatch({
            type: 'CREATE_TABLE', 
            timeTable: {
                id: nextNumber.current,
                tableName: `시간표${nextNumber.current}`,
                lectureList: [],
            },
            selectedId: nextNumber.current,
        });

        isFirstAddTable.current = false;
    };

    const deleteTimeTable = () => {
        userTableDispatch({
            type: 'DELETE_TABLE',
            id: parseInt(selectTimeTableOption.current.value),
        });

        console.log(userTableState.totalTimeTable);
    };


    useEffect(() => {
        if(!isFirstAddTable.current){
            selectTimeTableOption.current.defaultValue=userTableState.totalTimeTable[userTableState.totalTimeTable.length-1].id;
            selectTimeTableOption.current.value=userTableState.totalTimeTable[userTableState.totalTimeTable.length-1].id;
        }
    }, [userTableState.totalTimeTable]);  /// table select바 렌더링 처리



    const [isModifyTimeTable, setIsModifyTimeTable] = useState(false);

    const handleClick = () => {
        setIsModifyTimeTable(true);
    }

    return (
        <>
            <ViewTimeTableList>
                <Select ref={selectTimeTableOption} defaultValue={userTableState.totalTimeTable[0].id} 
                key={userTableState.totalTimeTable[0].id} onChange={selectTimeTable}>
                    {userTableState.totalTimeTable.map((table)=> { return (
                        <option value={table.id} key={table.id}> {table.tableName} </option>
                    )})}
                </Select>
                <PlusBtn onClick={addTimeTable}> + </PlusBtn>
                <ModifyBtn onClick={handleClick}> 수정 </ModifyBtn>
                <DeleteBtn onClick={deleteTimeTable}> 삭제 </DeleteBtn>
            </ViewTimeTableList>
                {isModifyTimeTable ? <ModifyTimeTableModal 
                  setIsModifyTimeTable={setIsModifyTimeTable}
                />
                : null }
        </>
    );
}

export default SelectTimeTable;