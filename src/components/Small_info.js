import styled from "styled-components";

const Small_info_Container = styled.div `
    display: flex;
    flex-direction: column;
    weight: 100px;
    height: 100px;
`;

const Student_info = styled.ul`
    display: flex;
    list-style: none;
`;

const Info_list = styled.span`
    margin: 30px;
`;

const Button_list = styled.button`
    margin: 30px;
`;


function Small_info(){

    return(
        <Small_info_Container>
            <div>
                <Student_info>
                    <li><Info_list>학부</Info_list></li>
                    <li><Info_list>학번</Info_list></li>
                    <li><Info_list>이름</Info_list></li>
                </Student_info>
            </div>
            <div>
                <Button_list>시간표 수정하기</Button_list>
                <Button_list>KLAS 연동하기</Button_list>
            </div>
        </Small_info_Container>
    );
}

export default Small_info;