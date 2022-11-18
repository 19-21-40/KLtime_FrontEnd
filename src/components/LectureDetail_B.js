import { style } from "@mui/system";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import Xbutton from "../image/XButton.png"

const Total_Container = styled.div`
    width: 750px;
    height: 950px;

    display: flex;
    flex-direction: column;
    
    position: relative;
    background: #FFFFFF;
    /* 학점그래프카드 그림자효과 */

    box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.1);
    border-radius: 50px;
`;

const Header_Container = styled.div`
    display: flex;

    height: 100px;
    
    position: relative;
    top: 5px;
    left: 50px;
`;

const XButton = styled.div`

    height: 20px;

    position: absolute;
    
    top: 60px;
    right: 90px;
    
    background-color: transparent;
    border: none;

    cursor: pointer;
    z-index:1;
`;

const Body_Container = styled.div`
    position: relative;
`;

const Lecture_Zone = styled.div`
    display: flex;
    flex-direction: column;

    width: 90%;
    height: 350px;
    
    position: relative;
    top: 50px;
    left: 40px;

    border: 0.3px solid #D9D9D9;
    
    /* 시간표박스 그림자 */
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.07);
    border-radius: 15px;
`

const Lecture_Info = styled.div`
    display: flex;
    flex-direction: column;    
    
    position: relative;
    top: 25px;
    left: 30px;

    height: 350px;
`;

const Recomend_Zone = styled.div`
    
    height: 100px;

    position: relative;
    top: 100px;
    left: 50px;
`;

const Detail_Text = styled.div`
    position: relative;
    display: flex;
    height: 40px;

    > h1 {
        padding: 0px;

        line-height: 100px;
        height: 100px;
        font-size: 50px;
        
    }

    > h2 {
        position: relative;
        top: 27px;

        margin-left: 10px;
        padding: 0px;

        line-height: 100px;
        height: 100px;
        color: gray;


    }

    > div {
        height: 40px;
        line-height: 40px;
    }

    #section {
        font-weight: 800;
        font-size: 20px;
        color: gray;

        margin-right: 10px;
    }

    #detail {
        font-weight: 800;
        font-size: 20px;

        margin-right: 10px;
    }
    
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
                        <h1>{lecture.lectureName}</h1> <h2>{lecture.id}</h2>
                    </Detail_Text>
                    <XButton onClick={Close}><img src={Xbutton} width={20}/></XButton>
            </Header_Container>
            <Body_Container>
                <Lecture_Zone>
                    <Lecture_Info>
                        <Detail_Text>
                            <div id="section">교수명</div> <div id="detail">{lecture.professor}</div>
                        </Detail_Text>
                        <Detail_Text>
                            <div id="section">전공/영역</div> <div id="detail">{lecture.department}</div>
                        </Detail_Text>
                        <Detail_Text>
                            <div id="section">강의시간</div>
                            {lecture.lectureTimes?.map((lectureTime, index) => <div id="detail" key={index}> {`${lectureTime.day}:${lectureTime.startTime}~${lectureTime.endTime}`}</div>)}
                        </Detail_Text>
                        <Detail_Text>
                            <div id="section">구분</div> <div id="detail">{lecture.section}</div>
                        </Detail_Text>
                        <Detail_Text>
                            <div id="section">난이도</div> <div id="detail">{lecture.level}</div>
                        </Detail_Text>
                        <Detail_Text>
                            <div id="section">학점</div> <div id="detail">{lecture.credit}</div>
                        </Detail_Text>
                        <Detail_Text>
                            <div id="section">세부사항 : </div> <div id="detail">{lecture.notes}</div>
                        </Detail_Text>
                    </Lecture_Info>
                </Lecture_Zone>
                <Recomend_Zone>
                    <div>추추추추천천천천들들들들어어어어갈갈갈갈거거거거</div>
                </Recomend_Zone>
            </Body_Container>
        </Total_Container>
    )
}

export default LectureDetail_B