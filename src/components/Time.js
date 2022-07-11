import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from "./Time.module.css"

function Time({
    isCardMode,
    id,
    lectureName,
    professor,
    startTime,
    endTime,
    level,
    property,
    credit,
    notes
    }){
    return (
        <button className={isCardMode?styles.cardList:styles.lineList}>
            <div>
                <span>학정번호 : </span>
                <span>{id}</span>
            </div>
            <div>
                <span>강의명 : </span>
                <span>{lectureName}</span>
            </div>
            <div>
                <span>교수명 : </span>
                <span>{professor}</span>
            </div>
            <div>
                <span>강의 시작시간 : </span>
                <span>{startTime}</span>
            </div>
            <div>
                <span>강의 종료시간 : </span>
                <span>{endTime}</span>
            </div>
            <div>
                <span>난이도 : </span>
                <span>{level}</span>
            </div>
            <div>
                <span>구분 : </span>
                <span>{property}</span>
            </div>
            <div>
                <span>이수학점 : </span>
                <span>{credit}</span>
            </div>
            <div>
                <span>유의사항 : </span>
                <span>{notes}</span>
            </div>
        </button>
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
    credit:PropTypes.number.isRequired,
    notes:PropTypes.string
  };

export default Time;