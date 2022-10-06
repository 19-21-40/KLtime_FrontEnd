import styled from "styled-components";
// import KwangWoon_Logo from '../components/image/KwangWoon_Logo.png'

// const Logo_Image = styled.div`
//     width: 200px;
//     height: 200px;
//     border-radius: 50%;
//     overflow: hidden;
// `;

function Klas_Peristalsis(){

    return (
        <div>
            <h1>Klas 연동</h1>
            <div>
                <label htmlFor="stdnum">학번<br/></label>
                <input id="stdnum" type="text" placeholder="학번을 입력하시오." />
            </div>
            <div>
                <label htmlFor="password">비밀번호<br/></label>
                <input id="password" type="password" placeholder="비밀번호를 입력하시오." />
            </div>
            <button>연동하기</button>
        </div>
    );

}

export default Klas_Peristalsis;