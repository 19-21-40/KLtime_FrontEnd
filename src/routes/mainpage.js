import Piechart from "../components/Graph";
import TimeTable from "../components/TimeTable";
import Small_info from "../components/Small_info";
import { UserTableProvider } from "../context/UserTableContext";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { call } from "../service/ApiService";

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



function MainPage(){
    const [list,setList]=useState([]);
    useEffect(
        call("/api/mainLecturelist","GET",null).then((response)=>
        setList(response.data))
    );


    return (
        <Component_position>
            
            <UserTableProvider>
                <Right_component>
                    <Piechart />
                </Right_component>
                <Left_component>
                    <Small_info />
                    {list.length}
                    <TimeTable width={1000} height={600} />
                </Left_component>
            </UserTableProvider>
        </Component_position>
    )
}

export default MainPage;