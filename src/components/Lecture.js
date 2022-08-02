//추가
import { useState } from "react";
import styled ,{css}  from "styled-components";


//styled-components
const DualMode=styled.div`
  ${props =>
    props.isCardMode ?
    css`
        position: absolute;
        overflow: hidden;
        cursor: pointer;
        box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 5%) 0px 2px 4px;
        width;
        height;
        top;
        left: 0%;
        borderRadius: 5px;
        border: 3px solid backgroundColor;
        marginLeft: 0px;
        color: rgb(255, 255, 255);
        background-color:backgroundColor;
        opacity: 1;
        zIndex: 0;  
    `
    :
    css`
    
    `
  }
`;
const ContentBox=styled(DualMode)`
    ${props =>
        props.isCardMode ?
        css`
            height:100%;
            borderRadius:5px;
            backgroundColor:backgroundColor;

            &:hover{background-color:rgba(55,53,47,0.25);}
        `
        :
        css`
            // backgroundColor:white;
            ${props=>
                props.clicked?
                `background-color:rgba(190, 190, 191, 0.8);`
                :
                `&:hover{background-color:#f8f8f8;}`
            };
            // &:hover{background-color:#f8f8f8;}
            // 수정해야함
            // &:active{background-color:rgba(190, 190, 191, 0.8);}
            &:active{background-color:rgba(190, 190, 191, 0.8);}
        `
    }
`;
const Content=styled(ContentBox)`
    ${props =>
        props.isCardMode ?
        css`
            overflow: hidden;
            padding: 1px 0 0 3px;
            font-size: 12px;
        `
        :
        css`
            /* 추가 */
            border-top: 1px solid rgba(167, 168, 169, 0.8);
            padding: 12px 0 12px 10px;
        `
    }

    div{
        width: 110px;
        overflow: hidden;
        padding: 1px 0 0 3px;
        font-size: 12px;
        /* float: left; */
        display: inline-flex;
        padding-right: 12px;

        span{
            padding-right: 5px;
            font-size: 10px;
        }
    }
`;
const LectureDelBtn=styled.button`
    box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 5%) 0px 2px 4px;
    display:none;

    &:hover{
        display:'';
    }
`;

function Lecture({
    lecture,//추가
    width = "150px",
    height,
    top,
    backgroundColor = "rgb(255, 187, 59)",
    isCardMode,
    isListMode,//수정
    onClick,
    onDeleteClick,
    onHovered
}) {
    const [clicked,setClicked]=useState(false);

    console.log(clicked);

    return (
        <DualMode isCardMode={isCardMode}
            onMouseEnter={onHovered}
            onMouseLeave={onHovered}
            onClick={
                clicked?()=>{}:()=>{
                onClick();
                setClicked(true);
                }
                
            }
            >
            <ContentBox isCardMode={isCardMode} clicked={clicked}>
                <Content isCardMode={isCardMode}>
                    <div>
                        <strong>{lecture.lectureName}</strong>
                        {isListMode?
                        <></>
                        :
                        //수정해야함
                        <LectureDelBtn onClick={onDeleteClick}>x</LectureDelBtn>
                        }   
                    </div>
                    <div>
                        {lecture.professor}
                    </div>
                    <div>
                        {lecture.department}
                    </div>
                    <div>
                        {lecture.lectureTimes.map((lectureTime,index) => (
                            <span key={index}>
                                {`${lectureTime.day} ${lectureTime.startTime} ${lectureTime.endTime}`}
                            </span>
                        ))}
                    </div>
                    <div>
                        {lecture.level}
                    </div>
                    <div>
                        {lecture.section}
                    </div>
                    <div>
                        {lecture.credit}
                    </div>
                    <div style={{ display: isCardMode ? 'none' : 'block'}}>
                        {lecture.notes}
                    </div>
                </Content>
            </ContentBox>
        </DualMode>
    )
}

export default Lecture;