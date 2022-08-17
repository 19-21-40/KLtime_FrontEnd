import { useState } from "react";
import styled from "styled-components";
import { useUserTableDispatch, useUserTableState } from "../context/UserTableContext";

function ModifyTimeTableModal ({setIsModifyTimeTable}) {

    const ModalBackground = styled.div`
        background-color: rgba(0,0,0,.3);
        justify-content:center;
        align-items:center;
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
    `;

    const ModalContainer = styled.div`
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
    `

    const Body = styled.div`
        width: 100%;
        max-width: 400px;
        height: 200px;
        background-color: #ffffff;
        div{
            font-size: 25px;
        }
    `;

    const userTableDispatch = useUserTableDispatch(); //
    const userTableState = useUserTableState();

    const [currentTableName, setCurrentTableName] = useState( () =>  userTableState.totalTimeTable.find(timeTable => timeTable.id === userTableState.selectedId).tableName );

    const handleChange = (e) => {
        setCurrentTableName(e.target.value)
    }

    const saveTimeTable = () => {

        userTableDispatch({type: 'UPDATE_TABLE', tableName: currentTableName});
        setIsModifyTimeTable(false);
    };


    return (
        <ModalBackground>
            <ModalContainer>
                <Title>
                    <h1>시간표 변경</h1>
                    <XBtn onClick={() => setIsModifyTimeTable(false)}> x </XBtn>
                </Title>
                <Body>
                    <div>이름</div>
                    <input type="text" onChange={handleChange} value={currentTableName}/>
                    <button onClick={saveTimeTable}>설정 저장</button>
                </Body>
            </ModalContainer>
        </ModalBackground>
    );
}

export default ModifyTimeTableModal;