import { useRef, useState, useEffect } from "react";
import styles from "./SelectTimeTable.module.css"
import ModifyTimeTable from "../components/ModifyTimeTable";

function SelectTimeTable({
    selectedLectures,
    setSelectedLectures,
}) 
{
    
    const [myTableList, setMyTableList] = useState(             // JSON.parse(localStorage.getItem('시간표'))를 하면 새로고침을 해도 유지가 됨, 다만 일부 버그가 존재
                                                                // useRef를 사용해도 될까?
        [
            {
                number: 1,  
                tableName: "시간표1",
                lectureList: [],
            },
            {
                number: 2,
                tableName: '시간표2',
                lectureList: [],
            }]
    );
    const [currentTableName, setCurrentTableName] = useState(myTableList[0].tableName);

    const nextNumber = useRef(3);
    const selectTimeTableOption = useRef(null);
   
    const selectTimeTable = (e) => {
        

        const idx = e.target.selectedIndex;
        const option = e.target.querySelectorAll('option')[idx];
        const name = option.getAttribute('name');

        setCurrentTableName(name);

    };

    const addTimeTable = () => {

        const newTable = {
            number: nextNumber.current,
            tableName: `시간표${nextNumber.current}`,
            lectureList: [],
        };

        setMyTableList(myTableList.concat(newTable));
        
        nextNumber.current += 1;

    };

    
    
    useEffect(() => {   

        
        let Table = myTableList.map(table => table.tableName === currentTableName ? {...table, lectureList: selectedLectures} : table);
        setMyTableList(Table);

        localStorage.setItem('시간표', JSON.stringify(Table));

    }, [selectedLectures]);

      
    useEffect(() => {
        
        myTableList.map(table => {
            if(table.tableName === currentTableName)
            {
                setSelectedLectures(table.lectureList);
            }
        });

    }, [currentTableName]);

    const [isModifyTimeTable, setIsModifyTimeTable] = useState(false);

    const handleClick = () => {
        setIsModifyTimeTable(true);
    }

    return (
        <div>
            <div>
                <select ref={selectTimeTableOption} onChange={e => selectTimeTable(e)}>
                    {myTableList.map((table)=> { return (
                        <option name={table.tableName} key={table.number}> {table.tableName} </option>
                    )})}
                </select>
                <button onClick={addTimeTable}> + </button>
                <button onClick={handleClick}> 수정 </button>
                </div>
                {isModifyTimeTable ? <ModifyTimeTable 
                  currentTableName={currentTableName}
                  setCurrentTableName={setCurrentTableName}
                  myTableList={myTableList}
                  setMyTableList={setMyTableList}
                  setIsModifyTimeTable={setIsModifyTimeTable}
                />
                : null }
        </div>
    );
}

export default SelectTimeTable;