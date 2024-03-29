import { useRef, useReducer, useEffect, useState } from "react";
import { useUserTableState, useUserTableDispatch} from '../context/UserTableContext';
import styled from "styled-components";
import upImage from "../image/up_vector.png"
import downIamge from "../image/down_vector.png"


const Total_Container = styled.div`
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
    
    width: 100%;
    ${(props) => props.fold ? "300px" : "150px" };
    
    position: relative;

    border: 0.3px solid #D9D9D9;
    
    /* 시간표박스 그림자 */
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.07);
    border-radius: 15px;
`;

const SelectIcon = styled.div`
    width: 573px;
    height: 40px;
`;

const IconContainer = styled.div`
    display: flex;

    height: 25px;

    position: absolute;
    top: 8px;
`

const Icon = styled.div`
    margin: 0px 5px;
    color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px #999;
    text-align: center;
    padding: 0px 10px;
    background-color: ${props => props.backgroundColor};
    span {
        vertical-align: middle;
        width: 500px;
    }
    button {
        float: right;
        background-color: transparent;
        color: white;
        border: none;
        font-size: 70%;
        cursor:pointer;
        padding-right: 0px;
    }
`

const FoldButton = styled.img`
    width: 30px;    
    height: 30px;
    
    position: absolute;
    top: 5px;
    left: 625px;

`

const Row = styled.div`
    display: flex;
    width: 100%;

    position: relative;
    left: 30px;
    margin-bottom: 20px;
`;

const Select = styled.div`

    width: 252px;
    height: 31px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    select{
        width: 149px;
        height: 29px;
        border-radius: 30px;
        text-align: center;
        margin-left: 10px;
        margin-right: 10px;
    }
    option{
        text-align: center;
        width: 149px;
        height: 29px;
    }
`

const SearchCollection = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 573px;
    height: 226px;

    position: relative;
    flex-wrap: wrap;
    
`
const SearchContainer = styled.div`
    display: flex;
`

const Searchbar = styled.input`
    width: 252px;
    height: 31px;
`

const SearchText = styled.span`
    text-align: center;
    width: 100px;
`

const SearchIcon = ({
    iconList, inputDispatch
}) => {

    function removeIcon(e) {
        const type = e.target.value;

        switch(type) {
            case 'credit':
                inputDispatch({type: 'CREDIT', credit:'null'});
                break;
            case 'section':
                inputDispatch({type: 'SECTION', section:'null'});
                break;
            case 'department':
                inputDispatch({type: 'department', department:'null'});
                break;
            case 'level':
                inputDispatch({type: 'LEVEL', level:'null'});
                break;
            default:
                break;
        }

    }

    return(
    <div>
        <IconContainer> 
            {
            iconList.map((icon, i) => (
            <Icon key={i} backgroundColor={icon.backgroundColor}>
                <span> {icon.value} </span>
                <button onClick={removeIcon} value={icon.type} > X </button>
            </Icon>
            ))}
        </IconContainer> 
    </div>
    );
}

const initialInputs = {
    searchItem: '강의명',
    input: '',
    credit: 'null',
    section: 'null',
    college: 'null',
    department: 'null',
    level: 'null',
    whatDay: 'null',
};

const searchInputReducer = (state, action) => {
    switch (action.type) {
        case 'SEARCH_ITEM':
            return {
                ...state,
                searchItem: action.searchItem,
                input: '',
            };
        case 'INPUT':
            return{
                ...state,
                input: action.input,
            }
        case 'CREDIT':
            return{
                ...state,
                credit: action.credit,
            }
        case 'SECTION':
            return{
                ...state,
                section: action.section,
            }
        case 'department':
            return{
                ...state,
                department: action.department,
            }
        case 'LEVEL':
            return{
                ...state,
                level: action.level,
            }
        case 'WHATDAY':
            return{
                ...state,
                whatDay: action.whatDay,
            }
        default:
            return state;
    };

}

function Search({fold, setFold}) 
{ 
    const userTableDispatch = useUserTableDispatch(); //
    const userTableState = useUserTableState();


    const inputref = useRef(null); //
    const iconListref = useRef([]);

    const [collegeName, SetCollegeName] = useState("전체");
    const [departmentList, setDepartmentList] = useState([]);

    const [searchInputs, inputDispatch] = useReducer(searchInputReducer, initialInputs);

    useEffect(() => {
        if(collegeName === "전체"){
            setDepartmentList([]);
        }else if(collegeName === "소프트웨어융합대학"){
            setDepartmentList(["소프트웨어학부", "컴퓨터정보공학부", "정보융합학부"]);
        }else if(collegeName === "전자정보공과대학"){
            setDepartmentList(["전자공학과", "전자통신공학과", "전기공학과", "전자융합공학과", "전자재료공학과", "로봇학부"]);
        }else if(collegeName === "공과대학"){
            setDepartmentList(["건축공학과", "환경공학과", "화학공학과", "건축학과"]);
        }else if(collegeName === "자연과학대학"){
            setDepartmentList(["수학과", "화학과", "전자바이오물리학과", "스포츠융합과학과", "정보콘텐츠학과"]);
        }else if(collegeName === "인문사회과학대학"){
            setDepartmentList(["국어국문학과","영어산업학과","미디어커뮤니케이션학부", "산업심리학과", "동북아문화산업학부"]);
        }else if(collegeName === "정책법학대학"){
            setDepartmentList(["행정학과", "법학부", "국제학부", "자산관리학과"]);
        }else if(collegeName === "경영대학"){
            setDepartmentList(["경영학부", "국제통상학부"]);
        }
    }, [collegeName]);

    const clickFold = () => {
        if(fold){
            setFold(false);
        }
        else{ 
            setFold(true);
        }
    }

    const handle_InputsChange = (event) => {
        
        switch(event.target.name){
            case 'searchItem':
                inputDispatch({type: 'SEARCH_ITEM', searchItem: event.target.value, input: ''});
                inputref.current.value = '';
                break;
            case 'input':
                inputDispatch({type: 'INPUT', input: event.target.value});
                break;
            case 'credit':
                let newCredit=event.target.value;
                if(event.target.value != 'null'){
                    newCredit = parseInt(event.target.value);
                }else{
                    newCredit = 'null';
                }
                inputDispatch({type: 'CREDIT', credit: newCredit});
                break;
            case 'section':
                inputDispatch({type: 'SECTION', section: event.target.value});
                break;
            case 'college':
                break;
            case 'department':
                inputDispatch({type: 'department', department: event.target.value});
                break;
            case 'level':
                let newLevel=event.target.value;
                if(event.target.value != 'null'){
                    newLevel = parseInt(event.target.value);
                }else{
                    newLevel = 'null';
                }
                inputDispatch({type: 'LEVEL', level: newLevel});
                break;
            case 'whatDay' :
                inputDispatch({type: 'WHATDAY', whatDay: event.target.value});
                break;
        }
    }

    useEffect ( () => {
        // 검색창을 접었다가 펴도 검색어가 유지되도록 처리
        if(fold==false){
            inputref.current.value = searchInputs.input;
        }
    }, [fold])
    
    useEffect ( () => {
        let newIconList = iconListref.current;
        let result = userTableState.totalLectures;

        // 검색어 입력에 의한 처리
        if(fold==false) {
            if(searchInputs.input !== ''){
                result = userTableState.totalLectures.filter((lecture)=> {
                    if (searchInputs.searchItem === '강의명'){
                        return lecture.lectureName.includes(searchInputs.input);
                    }
                    else if (searchInputs.searchItem === '교수명'){
                        return lecture.professor.includes(searchInputs.input);
                    }
                });
            }
            else{
                    inputref.current.placeholder=searchInputs.searchItem;
            };
        }

        // 학점 입력에 의한 처리
        if(searchInputs.credit !== 'null')
        {
            result = result.filter((lecture)=> {
                return lecture.credit == searchInputs.credit;                
            })

            newIconList = newIconList.filter(obj => { return obj.type !== "credit"; } );
            newIconList = newIconList.concat({ type: "credit", value: `${searchInputs.credit}학점`, backgroundColor: '#d9534f'});
                
        }else {
            newIconList = newIconList.filter(obj => {return obj.type !== "credit";});

         };

        // 구분 입력에 의한 처리
        if(searchInputs.section !== 'null')
        {
            result = result.filter((lecture)=> {
                return lecture.section === searchInputs.section;                
            })

            newIconList = newIconList.filter(obj => { return obj.type !== "section"; } );
            newIconList = newIconList.concat({ type: "section", value: searchInputs.section, backgroundColor: '#5ab85c'});
           
        }else{
            newIconList = newIconList.filter(obj => {return obj.type !== "section";});
         };


        // 소속 입력에 의한 처리
        if(searchInputs.department !== 'null')
        {
            result = result.filter((lecture)=> {
                return lecture.department.includes(searchInputs.department);                
            })
  
            newIconList = newIconList.filter(obj => { return obj.type !== "department"; } );
            newIconList = newIconList.concat({ type: "department", value: searchInputs.department, backgroundColor: '#5bc0de'});

        }else {
            newIconList = newIconList.filter(obj => {return obj.type !== "department";});
         };

        // 난이도 입력에 의한 처리
        if(searchInputs.level !== 'null')
        {
            result = result.filter((lecture)=> {
                return lecture.level === searchInputs.level;                
            })

            newIconList = newIconList.filter(obj => { return obj.type !== "level"; } );
            newIconList = newIconList.concat({ type: "level", value: `난이도: ${searchInputs.level}`, backgroundColor: '#f0ad4e'});

        }else{
            newIconList = newIconList.filter(obj => {return obj.type !== "level";});
        }; 

        // 요일 입력에 의한 처리
        if(searchInputs.whatDay !== 'null'){
            result = result.filter( lecture => {return lecture.lectureTimes?.some( times => times.day == searchInputs.whatDay) ;} );

        }else{

        }
        

        userTableDispatch({type: 'SEARCH_LECTURE', searchedLectures: result});
        iconListref.current = newIconList;

    }, [searchInputs]);
    

    return (
        <Total_Container fold={fold}>
            <SelectIcon>
                <SearchIcon iconList={iconListref.current} inputDispatch={inputDispatch}/>
            </SelectIcon>
            <FoldButton onClick={clickFold} src={fold? upImage : downIamge} />
            {!fold && <SearchCollection>
                <Row>
                    <Select>
                        <SearchText>소속대학</SearchText>
                        <select value={collegeName} name="college" onChange={e => SetCollegeName(e.target.value)}>
                            <option value={"전체"}>전체</option>
                            <option value={"소프트웨어융합대학"}>소프트웨어융합대학</option>
                            <option value={"전자정보공과대학"}>전자정보공과대학</option>
                            <option value={"공과대학"}>공과대학</option>
                            <option value={"자연과학대학"}>자연과학대학</option>
                            <option value={"인문사회과학대학"}>인문사회과학대학</option>
                            <option value={"정책법학대학"}>정책법학대학</option>
                            <option value={"경영대학"}>경영대학</option>

                        </select>
                    </Select>
                    <Select>
                        <SearchText>전공/영역</SearchText>
                        <select value={searchInputs.department} name="department" onChange={handle_InputsChange}>
                            <option value={"null"}>전체</option>
                            <option value={"교직"}>교직</option>
                            <option value={"군사학"}>군사학</option>
                            <option value={"창업"}>창업</option>
                            <option value={"공통"}>공통</option>
                            <option value={"융합교과목"}>융합교과목</option>
                            {
                                departmentList.map(__department => <option value={__department}>{__department}</option> )
                            }      
                        </select>
                    </Select>
                </Row>
                <Row>
                <Select>
                        <SearchText>난이도</SearchText>
                        <select value={searchInputs.level} name="level" onChange={handle_InputsChange}>
                            <option value={"null"}>전체</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </select>
                    </Select>
                    <Select>
                        <SearchText>학점</SearchText>
                        <select value={searchInputs.credit} name="credit" onChange={handle_InputsChange}>
                            <option value={'null'}>전체</option>
                            <option value={2}>2학점</option>
                            <option value={3}>3학점</option>
                        </select>
                    </Select>
                </Row> 
                <Row>
                    <Select>
                        <SearchText>구분</SearchText>
                        <select value={searchInputs.section} name="section" onChange={handle_InputsChange}>
                            <option value={"null"}>전체</option>
                            <option value={"전필"}>전필</option>
                            <option value={"전선"}>전선</option>
                            <option value={"교필"}>교필</option>
                            <option value={"교선"}>교선</option>
                            <option value={"일선"}>일선</option>
                        </select>
                    </Select>
                    <Select>
                        <SearchText>요일</SearchText>
                        <select value={searchInputs.whatDay} name="whatDay" onChange={handle_InputsChange}>
                            <option value={"null"}>전체</option>
                            <option value={"월"}>월</option>
                            <option value={"화"}>화</option>
                            <option value={"수"}>수</option>
                            <option value={"목"}>목</option>
                            <option value={"금"}>금</option>
                            <option value={"토"}>토</option>
                        </select>
                    </Select>
                </Row>
                <Row>
                    <SearchContainer>
                        <Select>
                            <SearchText>강의/교수명</SearchText>
                            <select name="searchItem" value={searchInputs.searchItem} onChange={handle_InputsChange}>
                                <option>강의명</option>
                                <option>교수명</option>
                            </select>
                        </Select>
                        <Searchbar ref={inputref} name="input" placeholder={searchInputs.searchItem} type="text" onChange={handle_InputsChange}/>
                    </SearchContainer>
                </Row>
            </SearchCollection>}
        </Total_Container>
    );
        
}
export default Search;