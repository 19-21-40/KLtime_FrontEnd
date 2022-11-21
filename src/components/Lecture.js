//추가
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useUserTableState } from "../context/UserTableContext";

//styled-components
const DualMode = styled.div`
  ${props =>
        props.isCardMode ?
            css`
        // position: absolute; //리스트에서 카드모드일때는 안되게 해야함
        overflow: hidden;
        cursor: ${props.blockhover ? "pointer" : "default"};
        box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 5%) 0px 2px 4px;
        width:${props => props.width};
        height:${props => props.height};

        align-items:center;
        top:${props => props.top};
        left: 0%;
        border-radius: 5px;
        margin-left: 0px;
        color: rgb(255, 255, 255);
        background-color:${props => props.backgroundColor};
        opacity: 1;
        z-index: 0;
        ${props => props.isListMode ? `position:relative;` : `position:absolute;`}; //추가 
    `
            :
            css`

    `
    }
`;
const ContentBox = styled(DualMode)`
    ${props =>
        props.blockhover ?

            (props.isCardMode ?
                css`
            height:100%;
            border-radius:5px;
            background-color:${props.backgroundColor};

            &:hover{background-color:rgba(55,53,47,0.25);}
        `

        :
        css`
            // backgroundColor:white;
            ${props=>
                props.clicked?
                `background-color:rgba(190, 190, 191, 0.5);`

                :
                css`
            // backgroundColor:white;
            ${props =>
                        props.clicked ?
                            `background-color:rgba(190, 190, 191, 0.8);`
                            :
                            `background-color:${props.backgroundColor};
                &:hover{background-color:#f8f8f8;}`
                    };
            // &:hover{background-color:#f8f8f8;}
            // 수정해야함
            &:active{background-color:rgba(190, 190, 191, 0.5);}
        `)
            :
            (props.isCardMode ?
                css`
                height:100%;
                border-radius:5px;
                background-color:${props.backgroundColor};
    
                //&:hover{background-color:rgba(55,53,47,0.25);}
            `

            :
            css`
                ${props=>
                    props.clicked?
                    `background-color:rgba(190, 190, 191, 0.5);`
                    :
                    (props.isDup?
                    `opacity:0.5;
                    background-color:${props.backgroundColor}
                    `:
                    (props.hovered?
                        `background-color:#f8f8f8;`
                        :
                        ``)
                        )
                };
                // 수정해야함
                &:active{background-color:rgba(190, 190, 191, 0.7);}
            `)
    }
`;

const Content = styled(ContentBox)`
    ${props =>
        props.isCardMode ?
            css`
            position:relative; //추가
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
        width: 88.5px;
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
const LectureDelBtn = styled.button`

    background-color: transparent;
    border:none;
    position: absolute;
    right: 3px;
    cursor: pointer;

    // display:none;
    &:hover{
        display:block;
    }
`;

function Lecture({
    blockhover,//호버 막으려고 추가
    lecture,//추가
    width = "150px",
    height,
    top,
    backgroundColor = "rgb(255, 187, 59)",
    isCardMode,
    isListMode = false,//수정
    onClick,
    onDeleteClick,
    onHovered,
    isClicked,
    notHovered,
    isHovered, //수연 11/18 추가
    isDup
}) {

    const [clicked,setClicked]=useState(false);
    const state=useUserTableState();
    const [hovered,setHovered]=useState(isHovered);


    useEffect(() => {
        setClicked(isClicked);
    }, [state.selectedId, isClicked])


    
    //추가 11/18 (수연)
    useEffect(()=>{
        setHovered(isHovered);
    },[isHovered])

    return (
        <DualMode isCardMode={isCardMode} width={width} height={height} top={top} backgroundColor={backgroundColor}
            onMouseEnter={onHovered}

            // onMouseLeave={onHovered}
            onMouseLeave={notHovered}
            onClick={
                clicked?()=>{}:()=>{
                onClick();
                setClicked(true);
                }
                
            }
            >
            <ContentBox isCardMode={isCardMode} clicked={clicked} backgroundColor={backgroundColor} blockhover={blockhover} hovered={hovered} isDup={isDup} >
                <Content isCardMode={isCardMode}>
                    {isListMode ?
                        <>
                            <div>
                                <strong>{lecture.lectureName}</strong>
                                {blockhover && <LectureDelBtn onClick={(event) => {
                                    onDeleteClick(lecture.id)
                                    event.stopPropagation()
                                }}>x</LectureDelBtn>}
                            </div>
                            <div>
                                {lecture.professor}
                            </div>
                            <div>
                                {lecture.department}
                            </div>
                            <div>
                                {lecture.lectureTimes.map((lectureTime, index) => (
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
                            <div style={{ display: isCardMode ? 'none' : 'block' }}>
                                {lecture.notes}
                            </div>
                        </>
                        :
                        <>
                            {blockhover && <LectureDelBtn onClick={(event) => {
                                onDeleteClick(lecture.id)
                                event.stopPropagation()
                            }}>x</LectureDelBtn>}
                            <div style={{ marginTop: "6px", fontWeight: 900 }}>
                                {lecture.lectureName}
                            </div>
                            <div>
                                {lecture.professor}
                            </div>
                        </>
                    }
                </Content>
            </ContentBox>
        </DualMode>
    )
}

export default Lecture;