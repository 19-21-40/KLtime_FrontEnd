import Piechart from "../components/Graph";
import TimeTable from "../components/TimeTable";
import Small_info from "../components/Small_info";
import { UserTableProvider } from "../context/UserTableContext";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { call } from "../service/ApiService";

import LectureList_test from "../components/Lecture_print_test";

const Component_position = styled.div`
    // display: flex;
    // flex-direction: column;
    box-sizing: border-box;

    position: absolute;
    width: 1461px;
    height: 1091px;
    left: 230px;
    top: 162px;

    background: #FFFFFF;
    /* 시간표 라인 */

    border: 1px solid #D9D9D9;
    border-radius: 10px;
`;

const Right_component = styled.div`
    display:flex;
    flex-direction: column;
`;
const Left_component = styled.div`
    display:flex;
    flex-direction: column;
`;

const Outer_Chart_box = styled.div`
    display:flex;
    flex-direction: column;
`; 

const Header_Chart_Box = styled.div`
    width: 667px;
    height: 340px;
    margin-bottom: 30.8px;
    // border: 2px solid black;
    // justify-content: center;
    
`;

const Body_Chart_Box = styled.div`
    display:flex;
    flex-direction: column;
`;

const Upper_Body_Chart_Box = styled.div`
    display:flex;
`;

const Lower_Body_Chart_Box = styled.div`
    display:flex;
    // flex-direction: column;
`;

const Small_Body_Chart_Box = styled.div`
    display:flex;
    flex-direction: column;
    width: 320px;
    height: 368px;
`;

const Su_Body_Chart_Box = styled.div`
    display:flex;
`;

const Sl_Body_Chart_Box = styled.div`
    display:flex;
`;

const Design_Box = styled.div`
    border: 2px solid black;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    margin-bottom: 25px;
    margin-left: 5px;
`;

function MainPage(){
    const [data,setData]=useState(
        {
            "gradcondition": {
                "admissionYear": 999,
                "gradCredit": 999,
                "mainCredit": 999,
                "essBalCredit": 999,
                "basicCredit": 999,
                "multiCredit": null
            },
            "credit": {
                "totalCredit": 0,
                "mainCredit": 0,
                "multiCredit": 0,
                "essCredit": 0,
                "balCredit": 0,
                "basicCredit": 0,
                "mathCredit": 0,
                "scienceCredit": 0
            }
        }
    );
    useEffect(
        ()=>{call("/api/gradconditionAndCredit","GET",null)
            .then((response) => {
                console.log(response);
                setData(response);
            }
        )}
    ,[]);
    

    return (
        <Component_position>
            <UserTableProvider>
                <Right_component>
                    <Outer_Chart_box>
                        <Header_Chart_Box>
                            <Design_Box>
                                <Piechart Full_num={data?.gradcondition.gradCredit} Already_num={data?.credit.totalCredit} Kind="총학점" Chart_size={200} Width={650} Height={320} Top_css={50} />
                            </Design_Box>
                        </Header_Chart_Box>
                        <Body_Chart_Box>
                            <Upper_Body_Chart_Box>
                                <Design_Box>
                                    <Piechart Full_num={data?.gradcondition.mainCredit} Already_num={data?.credit.mainCredit} Kind="전공학점" Chart_size={150} Width={320} Height={207.2} Top_css={10} />
                                </Design_Box>
                                <Design_Box>
                                    <Piechart Full_num={20} Already_num={20} Kind="부전공학점" Chart_size={150} Width={320} Height={207.2} Top_css={10} />
                                </Design_Box>
                            </Upper_Body_Chart_Box>
                            <Lower_Body_Chart_Box>
                                <Design_Box>
                                <Small_Body_Chart_Box>
                                    <Su_Body_Chart_Box>
                                            <Piechart Full_num={data?.gradcondition.basicCredit} Already_num={data?.credit.basicCredit} Kind="기초학점" Chart_size={150} Width={325} Height={160} Top_css={10} />
                                    </Su_Body_Chart_Box>
                                    <Sl_Body_Chart_Box>
                                        <Piechart Full_num={60} Already_num={9} Kind="수학" Chart_size={100} Width={162.5} Height={80} Top_css={5} />
                                        <Piechart Full_num={60} Already_num={25} Kind="기초과학" Chart_size={100} Width={162.5} Height={80} Top_css={5} />
                                    </Sl_Body_Chart_Box>
                                </Small_Body_Chart_Box>
                                </Design_Box>
                                <Design_Box>
                                <Small_Body_Chart_Box>
                                    <Su_Body_Chart_Box>
                                        <Piechart Full_num={data?.gradcondition.essBalCredit} Already_num={data?.credit.balCredit+data?.credit.essCredit} Kind="교양학점" Chart_size={150} Width={325} Height={160} Top_css={10} />
                                    </Su_Body_Chart_Box>
                                    <Sl_Body_Chart_Box>
                                        <Piechart Full_num={60} Already_num={25} Kind="균형" Chart_size={100} Width={162.5} Height={80} Top_css={5} />
                                        <Piechart Full_num={60} Already_num={9} Kind="필수" Chart_size={100} Width={162.5} Height={80} Top_css={5} />
                                    </Sl_Body_Chart_Box>
                                </Small_Body_Chart_Box>
                                </Design_Box>
                            </Lower_Body_Chart_Box>
                        </Body_Chart_Box>    
                    </Outer_Chart_box>
                </Right_component>
                <Left_component>
                    <Small_info name="신재민" std_num={2021203022} department="소프트웨어학부" />
                    <TimeTable width={300} height={300} />
                </Left_component>
            </UserTableProvider>
            <div>

            </div>
        </Component_position>
    )
}

export default MainPage;