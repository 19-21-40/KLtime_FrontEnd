import styled from "styled-components";
// import KwangWoon_Logo from '../components/image/KwangWoon_Logo.png'

// const Logo_Image = styled.div`
//     width: 200px;
//     height: 200px;
//     border-radius: 50%;
//     overflow: hidden;
// `;
const Total_Container = styled.div`
    width: 650px;
    height: 800px;
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    border-radius: 20px;
`;

const Select_Semester = styled.div`
    display: flex;
    width: 600px;
    height: 100px;
`;

const Time_table_list = styled.div`
    display: flex;
    width: 600px;
    height: 700px;
`;

const Time_table_box = styled.div`
    width: 180px;
    height: 160px;
    border: 2px solid black;
    border-radius: 20px;
    margin: 10px;
`;

const Add_Button_Box = styled.div`
    width: 180px;
    height: 160px;
    border: 2px solid black;
    border-radius: 20px;
    margin: 10px;
`;

const Add_Button = styled.button`
    width: 60px;
    height: 60px;
    border: 2px solid black;
    border-radius: 10px;
    margin: 10px;
`;

function Time_Table_Menu(){

    return (
        <Total_Container>
            <Select_Semester>
                <select>
                    <option>n년</option>
                </select>
                <select>
                    <option>n학기</option>
                </select>
            </Select_Semester>
            <Time_table_list>
                <Time_table_box>
                    <h1>시간표 1</h1>
                </Time_table_box>
                <Time_table_box>
                    <h1>추천 시간표</h1>
                </Time_table_box>
                <Add_Button_Box>
                <Add_Button>+</Add_Button>
                </Add_Button_Box>
            </Time_table_list>
        </Total_Container>
    );

}

export default Time_Table_Menu;