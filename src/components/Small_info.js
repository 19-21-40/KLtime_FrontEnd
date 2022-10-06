import { useEffect, useState } from "react";
import styled from "styled-components";
import Main_Modal from "./Main_Modal";

const Small_info_Container = styled.div`
    display: flex;
    flex-direction: column;
    weight: 100px;
    height: 100px;
`;

const Button_list = styled.div`
    display: flex;
`;

const Student_info = styled.ul`
    display: flex;
    list-style: none;
`;



const Info_list = styled.span`
    margin: 30px;
`;

const Button = styled.button`
    margin: 30px;
`;


function Small_info( {name, std_num, department} ){

    const [modalOpen, setModalOpen] = useState(false);//모달
    const [Detail, setDetail] = useState(false);//그래프
    const [Edit, setEdit] = useState(false);//계정정보 수정
    const [Klas, setKlas] = useState(false);//Klas 연동하기

    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };

    const showDetail = () => {
        setDetail(true);    
    };

    const showEdit = () => {
        setEdit(true);    
    };

    const showKlas = () => {
        setKlas(true);    
    };


    return(
        <Small_info_Container>
            <div>
                <Student_info>
                    <li><Info_list>학부: {department}</Info_list></li>
                    <li><Info_list>학번: {std_num}</Info_list></li>
                    <li><Info_list>이름: {name}</Info_list></li>
                </Student_info>
            </div>
            <Button_list>
                <Button onClick={ () =>  {
                    showModal()
                    showKlas()
                }} >KLAS 연동하기</Button>
                <Button onClick={ () =>  {
                    showModal()
                    showEdit()
                }} >계정정보 수정하기</Button>
                <div>{modalOpen && <Main_Modal setModalOpen={setModalOpen} setDetail={setDetail} setEdit={setEdit} setKlas={setKlas} Detail={Detail} Edit={Edit} Klas={Klas} />}</div>
            </Button_list>
        </Small_info_Container>
    );
}

export default Small_info;