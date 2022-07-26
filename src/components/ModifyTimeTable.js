import PropTypes from "prop-types";
import classNames from "classnames";
import { useState } from "react";
import styles from "./ModifyTimeTable.module.css"

function ModifyTimeTable ({currentTableName, setCurrentTableName, myTableList, setMyTableList, isModifyTimeTable, setIsModifyTimeTable}) {

    console.log(isModifyTimeTable);

    const saveOption = () => {
        setIsModifyTimeTable(false);
    };

    return (
        <div className={classNames(styles.modalBackground, { [styles.active] : isModifyTimeTable } )}>
            <div className={styles.modalContainer}>
                <div className={styles.title}>
                    <h1>시간표 변경</h1>
                </div>
                <button> X </button>
                <div className={styles.body}>
                    <div>이름</div>
                    <input onChange={()=> saveOption}value={currentTableName}/>
                    <button onClick={() => saveOption()}>설정 저장</button>
                </div>
            </div>
        </div>
    );
}

export default ModifyTimeTable;