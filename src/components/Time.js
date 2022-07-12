import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from "./Time.module.css"

function Time({
    id,
    isCardMode,
    onClick,
    lectureName,
    professor,
    startTime,
    endTime,
    level,
    property,
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
                        {startTime}
                    </div>
                    <div>
                        {endTime}
                    </div>
                    <div>
                        {level}
                    </div>
                    <div>
                        {property}
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

Time.propTypes = {
    id: PropTypes.string,
    lectureName: PropTypes.string.isRequired,
    professor: PropTypes.string,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    level: PropTypes.number,
    property: PropTypes.string.isRequired,
    credit: PropTypes.number.isRequired,
    notes: PropTypes.string
};

export default Time;