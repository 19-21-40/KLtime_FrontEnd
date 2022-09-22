import Piechart from "../components/Graph";
import TimeTable from "../components/TimeTable";
import Small_info from "../components/Small_info";
import { UserTableProvider } from "../context/UserTableContext";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { call } from "../service/ApiService";

import LectureList_test from "../components/Lecture_print_test";

const Component_position = styled.div `
    display: flex;
    // flex-direction: column;
`;

const Right_component = styled.div `
    display: flex;
    flex-direction: column;
`;
const Left_component = styled.div `
    display: flex;
    flex-direction: column;
`;

const Chart_box = styled.div`
    display:flex;
    flex-direction: column;
`; 

const Small_Chart_Box = styled.div`
    display:flex;
    // flex-direction: column;
`;

// users:[
//         {
//             id:1,
//             name: "법과생활",
//             section: "교선",
//             sectionDetail: "사회와경제",
//             level: 1,
//             credit: 3,
//             },
//             {
//             id:1,
//             name: "자료구조",
//             section: "전필",
//             sectionDetail: "몬나욤",
//             level: 1,
//             credit: 3,
//             }
//         ]




function MainPage(){
    // const [list,setList]=useState([]);
    // useEffect(
    //     call("/api/mainLecturelist","GET",null).then((response)=>
    //     setList(response.data))
    // );


    return (
        <Component_position>
            
            <UserTableProvider>
                <Right_component>
                    <Piechart Full_num={70} Already_num={16} Kind="총학점" />
                    <Chart_box>
                        <Piechart Full_num={60} Already_num={34} Kind="전공" />
                        <Small_Chart_Box>
                            <Piechart Full_num={60} Already_num={15} Kind="전공필수" />
                            <Piechart Full_num={60} Already_num={19} Kind="전공선택" />
                        </Small_Chart_Box>
                    </Chart_box>
                    <Chart_box>
                        <Piechart Full_num={60} Already_num={34} Kind="기초교양" />
                        <Small_Chart_Box>
                            <Piechart Full_num={60} Already_num={9} Kind="기1" />
                            <Piechart Full_num={60} Already_num={25} Kind="기2" />
                        </Small_Chart_Box>
                    </Chart_box>
                    <Chart_box>
                        <Piechart Full_num={60} Already_num={34} Kind="균형+필수" />
                        <Small_Chart_Box>
                            <Piechart Full_num={60} Already_num={25} Kind="균형" />
                            <Piechart Full_num={60} Already_num={9} Kind="필수" />
                        </Small_Chart_Box>
                    </Chart_box>
                </Right_component>
                <Left_component>
                    <Small_info name="신재민" std_num={2021203022} department="소프트웨어학부" />
                    <TimeTable width={1000} height={600} />
                </Left_component>
            </UserTableProvider>
            <div>

            </div>
        </Component_position>
    )
}

export default MainPage;