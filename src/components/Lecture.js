import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./Lecture.module.css"

function Lecture({
    id,
    lectureName,
    professor,
    department,
    lectureTimes,
    level,
    section,
    credit,
    notes,
    width = "150px",
    height,
    top = "",
    backgroundColor = "rgb(255, 187, 59)",
    isCardMode,
    onClick,
    onCancleClick,
}) {
    const [isOnHovered, setIsOnHovered] = useState(false);



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
            onMouseEnter={() => setIsOnHovered(true)}
            onMouseLeave={() => setIsOnHovered(false)}
        >
            <div className={styles.selectedTimeContent}
                style={{
                    height:'100%',
                    borderRadius:'5px',
                    backgroundColor:isOnHovered?'rgba(55,53,47,0.25)':backgroundColor
                }}
                >
                <div className={isCardMode?styles.time:styles.linecontent}>
                    <div>
                        <strong>{lectureName}</strong>
                        <button
                            className={styles.LectureDelBtn}
                            style={{
                                display: isOnHovered ? '' : 'none'
                            }}
                            onClick={()=>onCancleClick(id)} //#####
                        >x</button>
                    </div>
                    <div>
                        {professor}
                    </div>
                    <div>
                        {department}
                    </div>
                    <div>
                        {lectureTimes.map((lectureTime, index) => (
                            <span key={index}>
                                {`${lectureTime.day} ${lectureTime.startTime} ${lectureTime.endTime}`}
                            </span>
                        ))}
                    </div>
                    <div>
                        {level}
                    </div>
                    <div>
                        {section}
                    </div>
                    <div>
                        {credit}
                    </div>
                    <div style={{
                        display: isCardMode ? 'none' : 'block'
                    }}>
                        {notes}
                    </div>
                </div>
            </div>

        </div>
    )
}

Lecture.propTypes = {
    id: PropTypes.string.isRequired,
    lectureName: PropTypes.string.isRequired,
    professor: PropTypes.string,
    department: PropTypes.string,
    lectureTimes: PropTypes.array.isRequired,
    level: PropTypes.number,
    section: PropTypes.string.isRequired,
    credit: PropTypes.number.isRequired,
    notes: PropTypes.string
};

export default Lecture;