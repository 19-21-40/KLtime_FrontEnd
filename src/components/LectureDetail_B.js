import { useEffect, useRef } from "react";
import styled from "styled-components";

const Total_Container = styled.div`
    width: 750px;
    height: 891px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    
    position: relative;
    background: #FFFFFF;
    /* 학점그래프카드 그림자효과 */

    box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.1);
    border-radius: 50px;
`;

const Header_Container = styled.div`
    display: flex;
    justify-content: space-around;

    width:100%;
    height: 160px;

    position: relative;
`;

const Body_Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    width: 90%;
    height: 300px;
    
    position: relative;

    border: 0.3px solid #D9D9D9;
    
    /* 시간표박스 그림자 */
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.07);
    border-radius: 15px;
`;

const Recomend_Zone = styled.div`

`;

const Detail_Text = styled.div`
    display: flex;
`;

function LectureDetail_B({
    top,
    left,
    backgroundColor,
    lecture,
    setOpenLectureDetail,
    setOpenDetail,
}) {
    
    const Close = () => {
        setOpenLectureDetail(false);
        setOpenDetail(true);
    }

    return (
        <Total_Container>
            <Header_Container>
                    <Detail_Text>
                        <div>{lecture.lectureName}</div> <div>{lecture.id}</div>
                    </Detail_Text>
                    <button onClick={Close} >X</button>
            </Header_Container>
            <Body_Container>
                <Detail_Text>
                    <div>교수명 : </div> <div>{lecture.professor}</div>
                </Detail_Text>
                <Detail_Text>
                    <div>전공/영역 : </div> <div>{lecture.department}</div>
                </Detail_Text>
                <Detail_Text>
                    <div>강의시간 : </div>
                    {lecture.lectureTimes?.map((lectureTime, index) => <span key={index}> {`${lectureTime.day}:${lectureTime.startTime}~${lectureTime.endTime}`}</span>)}
                </Detail_Text>
                <Detail_Text>
                    <div>구분 : </div> <div>{lecture.section}</div>
                </Detail_Text>
                <Detail_Text>
                    <div>난이도 : </div> <div>{lecture.level}</div>
                </Detail_Text>
                <Detail_Text>
                    <div>학점 : </div> <div>{lecture.credit}</div>
                </Detail_Text>
                <Detail_Text>
                    <div>세부사항 : </div> <div>{lecture.notes}</div>
                </Detail_Text>
            </Body_Container>
            <Recomend_Zone>
                <div>추추추추천천천천들들들들어어어어갈갈갈갈거거거거</div>
            </Recomend_Zone>
        </Total_Container>
    )
}

export default LectureDetail_B