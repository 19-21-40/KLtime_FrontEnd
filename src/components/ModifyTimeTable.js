import { useState } from "react";
import styles from "./ModifyTimeTable.module.css"

function ModifyTimeTable ({currentTableName, setCurrentTableName, myTableList, setMyTableList, setIsModifyTimeTable}) {

    const [tableName, setTableName] = useState(currentTableName);

    const modifyTableName = (e) => {
        setTableName(e.target.value);
    };

    const saveTimeTable = () => {
        
        let Table = myTableList.map(table => table.tableName === currentTableName ? {...table, tableName: tableName}: table);

        setMyTableList(Table);
        setCurrentTableName(tableName);
        setIsModifyTimeTable(false);
    };


    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <div className={styles.title}>
                    <h1>시간표 변경</h1>
                    <button onClick={() => setIsModifyTimeTable(false)}> x </button>
                </div>
                <div className={styles.body}>
                    <div className={styles.tableName}>이름</div>
                    <input type="text" onChange={ e => modifyTableName(e) } value={tableName}/>
                    <button onClick={saveTimeTable}>설정 저장</button>
                </div>
            </div>
        </div>
    );
}

export default ModifyTimeTable;