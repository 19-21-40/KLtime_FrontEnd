import { useEffect, useRef } from 'react';
import styled from "styled-components";
import Detail_Click from './Detail_Click';
import MyPage from '../routes/MyPage';
import Klas_Peristalsis from './Klas_Peristalsis';

/* 모달창을 화면 중앙. 최상단에 노출 */
const Container = styled.div`
    /* 모달창 크기 */
    //width: 600px;
    //height: 200px;

    /* 최상단 위치 */
    z-index: 999;
    
    /* 중앙 배치 */
    /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
    /* translate는 본인의 크기 기준으로 작동한다. */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    /* 모달창 디자인 */
    background-color: white;
    //border: 1px solid black;
    //border-radius: 8px;
`;  
  /* 모달창 내부 X버튼 */
const Close = styled.button`
    
    position: absolute;
    right: 10px;
    top: 10px;

`;

function Main_Modal( { setModalOpen, setDetail,setEdit, setKlas, Detail, Klas, Edit } ){

    const closeModal = () => {
        setModalOpen(false);
        setDetail(false);
        setKlas(false);
        setEdit(false);
    };

    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setModalOpen(false);
                setDetail(false);
                setKlas(false);
                setEdit(false);
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    },); 

    return (
        <Container ref={ref}>
            <Close onClick={closeModal}>
                X
            </Close>
            { Klas && <Klas_Peristalsis /> }
            { Edit && <MyPage /> }
            { Detail && <Detail_Click /> }
        </Container>
    );

}

export default Main_Modal;