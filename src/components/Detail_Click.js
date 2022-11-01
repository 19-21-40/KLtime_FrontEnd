import styled from "styled-components";

const Big_box = styled.div`
    display: flex;
    flex-direction: column;

    width: 600px;
    height: 500px;

    border: 2px solid black;
    border-radius: 20px;
`;

const Header = styled.div`
    display: flex;
`;

const Body = styled.div`
    display: flex;
    // flex-direction: column;
`;

function Lecture_Print( {lecture} ){
    return(
        <Body>
            <div>{lecture.lectureName}</div>
            <div>{lecture.professor}</div>
            <div>{lecture.section}</div>
            <div>{lecture.level}</div>
            <div>{lecture.credit}</div>
        </Body>
    );
}

function Detail_Click(){

    const lecture_list = [
            {

                id: 1,
                lectureName: "디지털논리",
                professor: "김진우",
                level: 2,
                section: "전선",
                credit: 3,
                notes: ""
            },
            {
                id: 2,
                lectureName: "법과생활",
                professor: "손명지",
                level: 1,
                section: "교선",
                credit: 3,
                notes: ""
            },
            {
                id: 3,
                lectureName: "이산구조",
                professor: "최민규",
                level: 2,
                section: "전선",
                credit: 3,
                notes: ""
            },
            {
                id: 4,
                lectureName: "고급프로그래밍",
                professor: "이강훈",
                level: 2,
                section: "전선",
                credit: 3,
                notes: ""
            },
            {
                id: 5,
                lectureName: "데이터베이스",
                professor: "문승현",
                level: 3,
                section: "전선",
                credit: 3,
                notes: ""
            },
            {
                id: 6,
                lectureName: "리눅스활용실습",
                professor: "박병준",
                level: 2,
                section: "전필",
                credit: 2,
                notes: ""
            },
            {
                id: 7,
                lectureName: "빅데이터언어",
                professor: "임동혁",
                level: 2,
                section: "일선",
                credit: 3,
                notes: ""
            },
            {
                id: 8,
                lectureName: "대학화학및실험1",
                professor: "양재규",
                level: 1,
                section: "기필",
                credit: 3,
                notes: ""
            },
        ]

    return (
        <Big_box>
            <Header>
                <span>
                    <strong>교과목명</strong>
                </span>
                <span>
                    <strong>교수명</strong>
                </span>
                <span>
                    <strong>구분</strong>
                </span>
                <span>
                    <strong>난이도</strong>
                </span>
                <span>
                    <strong>학점</strong>
                </span>
            </Header>
            <div>
                {lecture_list.map(lecture => (
                <Lecture_Print lecture={lecture} key={lecture.id} />
                ))}
            </div>
        </Big_box>
    );

}

export default Detail_Click;