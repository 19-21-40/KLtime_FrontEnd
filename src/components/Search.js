import { useRef, useReducer, useEffect } from "react";
import { useUserTableState, useUserTableDispatch} from '../context/UserTableContext';
import styled from "styled-components";


const Total_Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 573px;
    height: 226px;
    border: 0.3px solid #D9D9D9;
    /* 시간표박스 그림자 */

    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.07);
    border-radius: 15px;
`;

const SelectIcon = styled.div`
    width: 573px;
    height: 70px;
`;

const IconContainer = styled.div`
    display: flex;
    margin-bottom: 5px;
    height: 25px;
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
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    grid-template-rows: 1fr 1fr;
    *{
        margin-bottom: 5px;
    }
    width: 573px;
    height: 226px;
`

const Searchbar = styled.input`
    width: 252px;
    height: 31px;
`

const SearchText = styled.span`

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
    department: 'null',
    level: 'null',
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
        default:
            return state;
    };

}

function Search({totalLectures}) 
{ 
    const userTableDispatch = useUserTableDispatch(); //
    const userTableState = useUserTableState();


    const inputref = useRef(null); //
    const iconListref = useRef([]);


    const [searchInputs, inputDispatch] = useReducer(searchInputReducer, initialInputs);




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
                inputDispatch({type: 'CREDIT', credit: event.target.value});
                break;
            case 'section':
                inputDispatch({type: 'SECTION', section: event.target.value});
                break;
            case 'department':
                inputDispatch({type: 'department', department: event.target.value});
                break;
            case 'level':
                inputDispatch({type: 'LEVEL', level: event.target.value});
                break;
        }
    }

    
    useEffect ( () => {
        let newIconList = iconListref.current;
        let result = totalLectures;

        // 검색어 입력에 의한 처리
        if(searchInputs.input !== ''){
            result = totalLectures.filter((lecture)=> {
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
                return lecture.department === searchInputs.department;                
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
        

        userTableDispatch({type: 'SEARCH_LECTURE', searchedLectures: result});
        iconListref.current = newIconList;

    }, [searchInputs]);
    

    return (
        <Total_Container>
            <SelectIcon>
                <SearchIcon iconList={iconListref.current} inputDispatch={inputDispatch}/>
            </SelectIcon>
            <SearchCollection>
                <Select>
                    <SearchText>학점</SearchText>
                    <select value={searchInputs.credit} name="credit" onChange={handle_InputsChange}>
                        <option value={'null'}>전체</option>
                        <option value={2}>2학점</option>
                        <option value={3}>3학점</option>
                    </select>
                </Select>
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
                    <SearchText>소속</SearchText>
                    <select value={searchInputs.department} name="department" onChange={handle_InputsChange}>
                        <option value={"null"}>전체</option>
                        <option value={"전체공통"}>전체공통</option>
                        <option value={"소프트웨어학부"}>소프트웨어학부</option>
                        <option value={"정보융합학부"}>정보융합학부</option>
                    </select>
                </Select>
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
                    <SearchText>강의/교수명</SearchText>
                    <select name="searchItem" value={searchInputs.searchItem} onChange={handle_InputsChange}>
                        <option>강의명</option>
                        <option>교수명</option>
                    </select>
                </Select>
                <Searchbar ref={inputref} name="input" placeholder={searchInputs.searchItem} type="text" onChange={handle_InputsChange}/>
            </SearchCollection>
        </Total_Container>
    );
        
}
export default Search;