import { useState, useRef, useCallback, useEffect } from "react";
import styles from "./Search.module.css"
import Pagination from "./Pagination";

function LectureList({searchedLectures}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [lecturesPerPage, setLecturesPerPage] = useState(5);


    // Get current lectures
    const indexOfLastLecture = currentPage * lecturesPerPage;
    const indexOfFirstLecture = indexOfLastLecture - lecturesPerPage;
    const currentLectures = searchedLectures.slice(indexOfFirstLecture, indexOfLastLecture)

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={styles.contents}>
            <div className={styles.lecturelist}>
            {currentLectures.map (searchedLecture => (
                <li key={searchedLecture.id}>
                    [{searchedLecture.section}] {searchedLecture.lectureName} ({searchedLecture.professor}) {searchedLecture.credit}학점 
                </li>
            ))}
            </div>
            <Pagination lecturesPerPage={lecturesPerPage} searchedLectures={searchedLectures.length} paginate={paginate} currentPage={currentPage}/>
        </div>
    );
}

function Search({totalLectures}) 
{
    const [searchedLectures, setSearchedLectures]=useState(totalLectures);
    const [searchItem, setSearchItem]=useState('강의명');
    const [input, setInput] = useState('');
    const [credit, setCredit] = useState('null');
    const [section, setSection] = useState('null');
    const [department, setDepartment] = useState('null');
    const [level, setLevel] = useState('null');

    const inputref = useRef(null);


    // 강의명 -> 교수명 또는 교수명 -> 강의명으로 바꿀때 input 초기화
    function resetSearchItem(e) {
        setSearchItem(e.target.value);

        setInput('');
        inputref.current.value="";

    }
    
    useEffect(()=> {



        // 검색어 입력에 의한 처리
         let result = totalLectures.filter((lecture)=> {
            if (searchItem === '강의명'){
                return lecture.lectureName.includes(input);
            }
            else if (searchItem === '교수명'){
                return lecture.professor.includes(input);
            }
        }); 

        // 학점 입력에 의한 처리
        if(credit !== 'null')
        {
            setCredit(Number(credit));
            result = result.filter((lecture)=> {
                return lecture.credit == credit;                
            })
        }

        // 구분 입력에 의한 처리
        if(section !== 'null')
        {
            result = result.filter((lecture)=> {
                return lecture.section == section;                
            })
        }

        // 소속 입력에 의한 처리
        if(department !== 'null')
        {
            result = result.filter((lecture)=> {
                return lecture.department == department;                
            })
        }


        // 난이도 입력에 의한 처리
        if(level !== 'null')
        {
            setLevel(Number(level));
            result = result.filter((lecture)=> {
                return lecture.level == level;                
            })
        }

        // searchedLectures state 관리
        setSearchedLectures(result);


        
    }, [input, credit, section, department, level]);    



return (
    <div>
        <div className={styles.searchCollection}>
            <div>
                <select value={searchItem} onChange={resetSearchItem}>
                    <option>강의명</option>
                    <option>교수명</option>
                </select>
                <input className={styles.searchbar} ref={inputref} placeholder={searchItem} type="text" onChange={e=>setInput(e.target.value)}/>
            </div>  
            <div className={styles.credit}>
                학점
                <select onChange={e=>setCredit(e.target.value)}>
                    <option value={'null'}>전체</option>
                    <option value={2}>2학점</option>
                    <option value={3}>3학점</option>
                </select>
            </div>
            <div className={styles.section}>
                구분
                <select onChange={e=>setSection(e.target.value)}>
                    <option value={"null"}>전체</option>
                    <option value={"전필"}>전필</option>
                    <option value={"전선"}>전선</option>
                    <option value={"교필"}>교필</option>
                    <option value={"교선"}>교선</option>
                    <option value={"일선"}>일선</option>
                </select>
            </div>
            <div className={styles.department}>
                소속
                <select onChange={e=>setDepartment(e.target.value)}>
                    <option value={"null"}>전체</option>
                    <option value={"전체공통"}>전체공통</option>
                    <option value={"소프트웨어학부"}>소프트웨어학부</option>
                    <option value={"정보융합학부"}>정보융합학부</option>
                </select>
            </div>
            <div className={styles.level}>
                난이도
                <select onChange={e=>setLevel(e.target.value)}>
                    <option value={"null"}>전체</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
            </div>
        </div>
        <LectureList searchedLectures={searchedLectures} />
    </div>
);

}

export default Search;