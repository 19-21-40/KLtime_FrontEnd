import Piechart from "../components/Graph";
import TimeTable from "../components/TimeTable";
import Small_info from "../components/Small_info";
import { UserTableProvider } from "../context/UserTableContext";
import styled from "styled-components";

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

    return (
        <Component_position>
            <UserTableProvider>
                <Right_component>
                    <Piechart />
                </Right_component>
                <Left_component>
                    <Small_info />
                    <TimeTable width={1000} height={600} />
                </Left_component>
            </UserTableProvider>
        </Component_position>
    )
}

export default MainPage;