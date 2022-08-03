import { useState, useRef, useCallback, useEffect } from "react";
import styles from "./Search.module.css"


// const SelectTimeTable = ({selectedLectures, setSelectedLectures})=>{


//     const [currentTableName, setCurrentTableName] = useState("시간표1");
//     const [myTableList, setMyTableList] = useState([]);

    

//     const selectTimeTableOption = useRef(null);

//     const selectTimeTable = (e) => {
        
//     //     console.log(e.target.value);
//         const idx = e.target.selectedIndex;
//         const option = e.target.querySelectorAll('option')[idx];
//         const name = option.getAttribute('name');

//         // console.log(name);

//         setCurrentTableName(name);
// // selectTimeTableOption.current.value
//     };
     
//     useEffect(() => {
//         if(JSON.parse(localStorage.getItem('시간표')) === undefined)
//         {
//             setMyTableList([
//             {
//                 tableName: "시간표1",
//                 lectureList: [],
//             },
//             {
//                 tableName: "시간표2",
//                 lectureList: [],
//             }]);
//         }
//         else
//         {
//             setMyTableList(JSON.parse(localStorage.getItem('시간표')));
//         }
//     }, []);

//     useEffect(() => {   


        
//         setMyTableList(JSON.parse(localStorage.getItem('시간표')));
        
//         // console.log(JSON.parse(localStorage.getItem('시간표')));
        
//         let Table = myTableList.map(table => table.tableName === currentTableName ? {...table, lectureList: selectedLectures} : table);
//         setMyTableList(Table);

        
//         localStorage.setItem('시간표', JSON.stringify(Table));

            
//         // console.log(myTableList);   
        

//     }, [selectedLectures]);

      
//     useEffect(() => {
        
//         myTableList.map(table => {
//             if(table.tableName === currentTableName)
//             {
//                 setSelectedLectures(table.lectureList);
//             }
//         })

//     }, [currentTableName])


//     return (
//     <div className={styles.selectTimeTableOption}>
//         <select ref={selectTimeTableOption} onChange={e => selectTimeTable(e)}>
//             <option name={'시간표1'} > 시간표1 </option>
//             <option name={'시간표2'} > 시간표2 </option>
//         </select>
//     </div>
//     );
// };


const SearchIcon = ({
    iconList, 
    setIconList,
    setCredit,
    setSection,
    setDepartment,
    setLevel
}) => {

    function removeIcon(e) {
        const type = e.target.value;
        setIconList(iconList.filter( icon => { return icon.type !== type } ) );

        switch(type) {
            case 'credit':
                setCredit('null');
                break;
            case 'section':
                setSection('null');
                break;
            case 'department':
                setDepartment('null');
                break;
            case 'level':
                setLevel('null');
                break;
            default:
                break;
        }

    }

    return(
    <div>
        <div className={styles.iconContainer}> 
            {
            iconList.map((icon, i) => (
            <div
                className={styles.icon}
                key={i}
                style={{ backgroundColor: icon.backgroundColor}}
            >
                <span className={styles.content}> {icon.value} </span>
                <button className={styles.button} onClick={(e)=>removeIcon(e)} value={icon.type} > X </button>
            </div>
            ))}
        </div>
        
    </div>
    );
}

function Search({totalLectures, selectedLectures, setSelectedLectures, setSearchedLectures}) 
{
    const [searchItem, setSearchItem]=useState('강의명');
    const [input, setInput] = useState('');
    const [credit, setCredit] = useState('null');
    const [section, setSection] = useState('null');
    const [department, setDepartment] = useState('null');
    const [level, setLevel] = useState('null');

    const [iconList, setIconList] = useState([]);

    const inputref = useRef(null);


    // 강의명 -> 교수명 또는 교수명 -> 강의명으로 바꿀때 input 초기화
    function resetSearchItem(e) {
        setSearchItem(e.target.value);

        setInput('');
        inputref.current.value="";

    }
    


    useEffect(()=> {

        let newIconList = iconList;


        let result = totalLectures;


        // 검색어 입력에 의한 처리
        if(input !== ''){
            result = totalLectures.filter((lecture)=> {
                if (searchItem === '강의명'){
                    return lecture.lectureName.includes(input);
                }
                else if (searchItem === '교수명'){
                    return lecture.professor.includes(input);
                }
            }); 
        }
         

        // 학점 입력에 의한 처리
        if(credit !== 'null')
        {
            result = result.filter((lecture)=> {
                return lecture.credit == credit;                
            })

            if(iconList.some(obj => obj.type === "credit")){ 
                
                newIconList = newIconList.filter(obj => { return obj.type !== "credit"; } );
                newIconList = newIconList.concat({ type: "credit", value: `${credit}학점`, backgroundColor: '#d9534f'});
                
            }
            else{
                newIconList = newIconList.concat({ type: "credit", value: `${credit}학점`, backgroundColor: '#d9534f' });

            }

        }else {
            newIconList = newIconList.filter(obj => {return obj.type !== "credit";});

        }

        // 구분 입력에 의한 처리
        if(section !== 'null')
        {
            result = result.filter((lecture)=> {
                return lecture.section === section;                
            })


            if(iconList.some(obj => obj.type === "section")){ 
                
                newIconList = newIconList.filter(obj => { return obj.type !== "section"; } );
                newIconList = newIconList.concat({ type: "section", value: section, backgroundColor: '#5ab85c'});
            }
            else{
                newIconList = newIconList.concat({ type: "section", value: section, backgroundColor: '#5ab85c' });
            }
           
        }else{
            newIconList = newIconList.filter(obj => {return obj.type !== "section";});
        }


        // 소속 입력에 의한 처리
        if(department !== 'null')
        {
            result = result.filter((lecture)=> {
                return lecture.department === department;                
            })

            if(iconList.some(obj => obj.type === "department")){ 
                
                newIconList = newIconList.filter(obj => { return obj.type !== "department"; } );
                newIconList = newIconList.concat({ type: "department", value: department, backgroundColor: '#5bc0de'});
                
            }
            else{
                newIconList = newIconList.concat({ type: "department", value: department, backgroundColor: '#5bc0de' });

            }

        }else {
            newIconList = newIconList.filter(obj => {return obj.type !== "department";});
        }


        // 난이도 입력에 의한 처리
        if(level !== 'null')
        {
            result = result.filter((lecture)=> {
                return lecture.level === level;                
            })
            

            if(iconList.some(obj => obj.type === "level")){ 
                
                newIconList = newIconList.filter(obj => { return obj.type !== "level"; } );
                newIconList = newIconList.concat({ type: "level", value: `난이도: ${level}`, backgroundColor: '#f0ad4e'});
            }
            else{
                newIconList = newIconList.concat({ type: "level", value: `난이도: ${level}`, backgroundColor: '#f0ad4e' });
            }
           
        }else{
            newIconList = newIconList.filter(obj => {return obj.type !== "level";});
        }


        

        // searchedLectures state 관리
        setSearchedLectures(result);

        setIconList(newIconList);
        
    }, [input, credit, section, department, level]);    



return (
    <div>
        {/* <SelectTimeTable selectedLectures={selectedLectures} setSelectedLectures={setSelectedLectures}/> */}
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
        <SearchIcon iconList={iconList} setIconList={setIconList} setCredit={setCredit} setSection={setSection} setDepartment={setDepartment} setLevel={setLevel} />
    </div>
);

}

export default Search;