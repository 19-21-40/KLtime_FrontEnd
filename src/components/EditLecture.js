import { useRef, useState } from "react";
import styles from "./EditLecture.module.css"

function EditLecture({
    id,
    lectureName,
    professor,
    department,
    lectureTimes,
    level,
    section,
    credit,
    notes,
    backgroundColor,
    editAble,
    setSelectedLectures,
}) {
    const [inputs,setInputs]=useState({
        id:editAble?id:'',
        lectureName:editAble?lectureName:'',
        professor:editAble?professor:'',
        department:editAble?department:'',
        
    });
    const [inputTimes,setInputTimes]=useState({
        day:'',
        startTime:'',
        endTime:'',
    })

    const [color,setColor]=useState(backgroundColor);

    const nameInput = useRef();

    
    const onInputChange=(e)=>{
        const {value,name}=e.target
        setInputs({
            ...inputs,
        [name]:value})
    }
    const onTimeChange=(e)=>{
        const {value,name}=e.target;
        setInputTimes({
            ...inputTimes,
            [name]:value
        })
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        setSelectedLectures((current)=>[
            ...current,
            {
                ...inputs,
                lectureTimes:[inputTimes]
            }
        ]
        )
    }

    return (
        <form onSubmit={onSubmit}>
            <div className={styles.formContainer}>
                <div className={`${styles.section} ${styles.dropdownSection}`}>
                    <button type="button" className={`${styles.sectionItem} ${styles.popupBtn}`}>
                        <span className={`${styles.icon} ${styles.dot}`} style={{backgroundColor: 'rgb(158, 95, 255)'}}></span>
                        <span className={styles.content}>색 변경</span>
                        {/* <span className={`${styles.icon} ${styles.arrow}`}></span> */}
                    </button>
                </div>
                <div className={styles.section}>
                    <div className={`${styles.sectionItem} ${styles.title}`}>
                        <input name="lectureName" className={styles.content} placeholder="과목명" required value={inputs.lectureName} onChange={onInputChange} ref={nameInput}/>
                    </div>
                    {/* <button type="button" className={`${styles.sectionItem} ${styles.popupBtn} ${styles.private}`}>
                        <input name="isPrivate" type="checkbox" className={styles.hiddenInput} value="false" />
                    </button> */}
                     {/* 드래그앤드롭 잠금 버튼 */}
                </div>
                <div className={styles.section}>
                    <div className={styles.sectionItem}>
                        <input name="professor" className={styles.content} placeholder="교수명" value={inputs.professor} onChange={onInputChange} ref={nameInput} />
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.sectionItem}>
                        <input name="day" className={styles.content} placeholder="요일" value={inputs.day} onChange={onTimeChange} ref={nameInput} />
                    </div>
                    <div className={styles.sectionItem}>
                        <input name="startTime" className={styles.content} placeholder="시작시간" value={inputs.startTime} onChange={onTimeChange} ref={nameInput} />
                    </div>
                    <div className={styles.sectionItem}>
                        <input name="endTime" className={styles.content} placeholder="종료시간" value={inputs.endTime} onChange={onTimeChange} ref={nameInput} />
                    </div>
                </div>
                
                {/* <div className={`${styles.section} ${styles.dropdownSection} ${styles.stateSection}`}>
                    <button type="button" className={`${styles.sectionItem} ${styles.popupBtn}`}>
                        <span className={styles.content}>
                            <div>
                                
                            </div>
                        </span>
                        <span className={`${styles.icon} ${styles.property}`}></span>
                    </button>
                </div> */}
                <button type="button" className={`${styles.popupBtn} ${styles.popupClose}`}>
                    <i className={`${styles.icon} ${styles.close}`}>x</i>
                </button>
                <div className={styles.section}>
                    <button type="submit" className={`${styles.popupBtn} ${styles.confirm}`}>
                        <span>
                            <div>
                                {editAble?"편집":"추가"}
                            </div>
                        </span>
                    </button>
                </div>
            </div>

            <div className={styles.arrow}>
                <div className={styles.arrowBorder} style={{left: "237px"}}>
                    <div className={styles.arrowFill}></div>
                </div>
            </div>
        </form>
    );
}

export default EditLecture