import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from "./Lecture.module.css"

function Lecture({
    id,
    isCardMode,
    onClick,
    lectureName,
    professor,
    department,
    lectureTimes,
    level,
    section,
    credit,
    notes,
    width="150px",
    height="100px",
    top="",
    backgroundColor="rgb(255, 187, 59)"
}) {
    return (
        <div className={styles.selectedTime}
            style={{
                width,
                height,
                top,
                left: '0%',
                borderRadius: '10px',
                borderLeft: '3px solid rgb(255, 187, 59)',
                marginLeft: '0px',
                color: 'rgb(255, 255, 255)',
                backgroundColor,
                opacity: '1',
                zIndex: '0',
            }}
        >
            <div className={styles.selectedTimeContent} height='100%'>
                <div className={styles.time}>
                    <div>
                        <strong>{lectureName}</strong>
                    </div>
                    <div>
                        {professor}
                    </div>
                    <div>
                        {department}
                    </div>
                    <div>
                        {lectureTimes.map((lectureTime)=>(
                            <span>
                                {`${lectureTime.day} ${lectrueTime.startTime} ${lectrueTime.endTime}`}
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
                        display:isCardMode?'none':'block'
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
    department:PropTypes.string,
    lectureTimes: PropTypes.array.isRequired,
    level: PropTypes.number,
    section: PropTypes.string.isRequired,
    credit: PropTypes.number.isRequired,
    notes: PropTypes.string
};

export default Lecture;