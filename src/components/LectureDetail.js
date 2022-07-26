import { useEffect, useRef } from "react";
import styles from "./LectureDetail.module.css"

function LectureDetail({
    top,
    left,
    backgroundColor,
    id,
    lectureName,
    professor,
    department,
    lectureTimes,
    level,
    section,
    credit,
    notes,
    editAble = true,
    onEditClick,
    onDeleteClick,
    onClickOutside
}) {
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside]);


    return (<>
            <div className={styles.lectureDetailContainer} ref={ref}>
                <div className={`${styles.sectionHeader} ${styles.section}`}>
                    <div className={styles.detailLectureTitle}>
                        <span>{`${lectureName} (${id})`}</span>
                    </div>
                    <div className={styles.detailContent}>
                        {lectureTimes?.map((lectureTime, index) => <span key={index}> {`${lectureTime.day}:${lectureTime.startTime}~${lectureTime.endTime}`}</span>)}
                    </div>
                </div>
                <div className={`${styles.sectionDetail} ${styles.section}`}>

                    <div className="detailItem">
                        {/* <span className={styles.icon}></span> */}
                        <span className={styles.detailContent}>
                            <span>
                                {professor}
                            </span>
                        </span>
                    </div>
                    <div className="detailItem">
                        {/* <span className={styles.icon}></span> */}
                        <span className={styles.detailContent}>
                            <span>
                                {department}
                            </span>
                        </span>
                    </div>

                </div>
                <div className={`${styles.sectionButton} ${styles.section}`}>
                    <button type="button" className={styles.editBtn} disabled={editAble} onClick={onEditClick} >
                        <span>편집</span>
                    </button>
                    <div className={styles.vertialLine}></div>
                    <button type="button" className={styles.delBtn} onClick={() => onDeleteClick(id)} >
                        <span>삭제</span>
                    </button>
                </div>
            </div>
            <div className={styles.popupTopLine} style={{ backgroundColor }}></div>
            <div className={styles.popupArrow}>
                <div className={styles.arrowBorder} style={{ top: '106px' }}>
                    <div className={styles.arrowFill}></div>
                </div>
            </div>
        </>)
}

export default LectureDetail