import { isDisabled } from "@testing-library/user-event/dist/utils";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./Lecture.module.css"

function Lecture({
    lecture,
    width = "150px",
    height,
    top = "",
    backgroundColor = "rgb(255, 187, 59)",
    isCardMode,
    isListMode,//수정
    onClick,
    onDeleteClick,
    onHovered//추가

}) {
    const [isOnHovered, setIsOnHovered] = useState(false);
    const [Clicked,setClicked]=useState(false);

    useEffect(()=>{
        if(isListMode) onHovered(isOnHovered);
    },[isOnHovered]);



    return (
        <div className={isCardMode?styles.selectedTime:styles.lineList}
            style={isCardMode?{
                width,
                height,
                top,
                left: '0%',
                borderRadius: '5px',
                border: `3px solid ${backgroundColor}`,
                marginLeft: '0px',
                color: 'rgb(255, 255, 255)',
                backgroundColor,
                opacity: '1',
                zIndex: '0',
            }:{}} //#####맨마지막에 뒤집을것
            onMouseEnter={() => {
                setIsOnHovered(true);
                
                // console.log(hoveredLecture);
            }}
            onMouseLeave={() => {
                setIsOnHovered(false);
                
                // console.log(hoveredLecture);
            }}
            onClick={Clicked?()=>{}: //false에서 오류떠서 수정
                ()=>{
                    onClick();
                    setClicked(true);
                    }} 
        >
            <div className={styles.selectedTimeContent}
            // isCardMode이름 바꾸기
                style={isCardMode?{
                    height:'100%',
                    borderRadius:'5px',
                    backgroundColor:isOnHovered?'rgba(55,53,47,0.25)':backgroundColor
                }:{backgroundColor:
                    Clicked? 'rgba(190, 190, 191, 0.8)':(isOnHovered?"#f8f8f8":'white')
                }}
                >
                <div className={isCardMode?styles.time:styles.linecontent}>
                    <div>
                        <strong>{lecture.lectureName}</strong>
                        {isListMode?
                        <></>
                        :
                        <button
                            className={styles.LectureDelBtn}
                            style={{
                                display: isOnHovered ? '' : 'none'
                            }}
                            onClick={()=>onDeleteClick(lecture.id)} //#####
                        >x</button>
                        }
                        
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
                    <div style={{
                        display: isCardMode ? 'none' : 'block'
                    }}>
                        {lecture.notes}
                    </div>
                </div>
            </div>

        </div>
    )
}

Lecture.propTypes = {
    // id: PropTypes.string.isRequired,
    // lectureName: PropTypes.string.isRequired,
    // professor: PropTypes.string,
    // department: PropTypes.string,
    // lectureTimes: PropTypes.array.isRequired,
    // level: PropTypes.number,
    // section: PropTypes.string.isRequired,
    // credit: PropTypes.number.isRequired,
    // notes: PropTypes.string
};

export default Lecture;