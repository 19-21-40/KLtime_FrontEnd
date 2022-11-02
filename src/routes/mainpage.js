import Piechart from "../components/Graph";
import TimeTable from "../components/TimeTable";
import Small_info from "../components/Small_info";
import { UserTableProvider } from "../context/UserTableContext";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { call } from "../service/ApiService";

import LectureList_test from "../components/Lecture_print_test";

const Head_component = styled.div`
position: absolute;
width: 1920px;
height: 121px;
left: 0px;
top: 0px;

background: #A7A7A7;`

const Logo_Image = styled.div`
box-sizing: border-box;

position: absolute;
width: 249px;
height: 72px;
left: 300px;
top: 24px;

/* 학점-숫자 */

border: 1px solid #5A5A5A;`

const Component_position = styled.div`
    display: flex;
    // flex-direction: column;
    box-sizing: border-box;

    position: absolute;
    width: 1461px;
    height: 1091px;
    left: 100px;
    right: 100px;
    top: 162px;
    text-align: center;

    background: #FFFFFF;
    /* 시간표 라인 */

    border: 1px solid #D9D9D9;
    border-radius: 10px;

    justify-content:space-around;
    align-items: center;
`;

const Right_component = styled.div`
    display:flex;
    flex-direction: column;
    width: 680px;
    margin-right:20px;
`;
const Left_component = styled.div`
    display:flex;
    flex-direction: column;
    width: 680px;
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
    width:667px;
    margin-bottom: 33px;
    justify-content: space-between;
    > div {
        width:320px; 
        
    }
`;


const Lower_Body_Chart_Box = styled.div`
    display:flex;
    width:667px;
    margin-bottom: 33px;
    justify-content: space-between;
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
    background: #FFFFFF;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.1);
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
        <UserTableProvider>
            <Head_component>
                <Logo_Image/>
                <Small_info name="신재민" std_num={2021203022} />
            </Head_component>
            <Component_position>
                <Left_component>
                        <Header_Chart_Box>
                            <Design_Box>
                                <Piechart Full_num={data?.gradcondition.gradCredit} Already_num={data?.credit.totalCredit} Kind="총학점" Chart_size={280} Width={650} Height={320} Top_css={20} />
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
                </Left_component>
                <Right_component>
                    <TimeTable width={670} height={300} />
                </Right_component>
            </Component_position>
        </UserTableProvider>
        
    )
}

export default MainPage;