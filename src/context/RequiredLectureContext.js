import React, { useRef, useReducer, useMemo, useContext, createContext } from 'react';

const initialState = {
    isProblem: false,
    beforeNeed: "",
    afterNeed: "",
    departmentList: [
        {
            department: "전자공학과",
            lectureList: [
                {before : "대학수학및연습1", after: "대학수학및연습2"},
                {before : "대학수학및연습1 또는 대학수학및연습2", after: "공학수학1"},
                {before : "대학수학및연습1 또는 대학수학및연습2", after: "공학수학2"}, 
                {before : "전자기학1", after: "마이크로파공학"},
                {before : "회로이론1", after: "전자회로1"},
                {before : "디지털공학", after: "컴퓨터구조"},
                {before : "기초전자회로및실험1 또는 기초전자회로및실험2", after: "전자회로실험"},
                {before : "기초전자회로및실험1 또는 기초전자회로및실험2", after: "전자공학응용실험"},
                {before : "공학설계입문", after: "기초전자회로및실험1"},
                {before : "공학설계입문", after: "캡스톤설계"}
                        ]
        },
        {
            department: "전자융합공학과",
            lectureList: [
                {before : "대학수학및연습1", after: "대학수학및연습2"},
                {before : "대학물리학1 ((구)대학물리및실험1)", after: "반도체소자1"},
                {before : "전자기학2", after: "초고주파공학"}, 
                {before : "전자회로1", after: "전자회로2"},
                {before : "공학설계입문", after: "캡스톤설계1"},
                {before : "공학설계입문", after: "캡스톤설계2"}
                        ]
        },
        {
            department: "전자통신공학과",
            lectureList: [
                {before : "대학수학및연습1", after: "대학수학및연습2"},
                {before : "대학물리학2 ((구)대학물리및실험2)", after: "전자기학1"},
                {before : "C프로그래밍응용", after: "소프트웨어설계"}, 
                {before : "신호및시스템", after: "디지털신호처리"},
                {before : "전자회로1", after: "전자회로2"},
                {before : "전자회로1", after: "집적회로설계"},
                {before : "디지털통신", after: "무선통신시스템"},
                {before : "공학설계입문", after: "예비캡스톤설계"},
                {before : "예비캡스톤설계", after: "캡스톤설계"}
                        ]
        },
        {
            department: "전기공학과",
            lectureList: [
                {before : "대학수학및연습1", after: "대학수학및연습2"},
                {before : "공학설계입문", after: "전기및디지털회로실험"},
                {before : "C프로그래밍", after: "고급C프로그래밍및설계"}, 
                {before : "C프로그래밍", after: "마이크로프로세서응용설계"},
                {before : "대학물리및실험2", after: "전자기학1"},
                {before : "회로이론1", after: "회로이론2"},
                {before : "전자기학1", after: "전자기학2"},
                {before : "전자회로기초", after: "전자회로응용"},
                {before : "전기및디지털회로실험", after: "전기공학세미나"},
                {before : "전기공학세미나", after: "캡스톤설계"}
                        ]
        },
        {
            department: "전자재료공학과",
            lectureList: [
                {before : "대학수학및연습1", after: "대학수학및연습2"},
                {before : "기초회로실험및설계1", after: "기초회로실험및설계2"},
                {before : "전자재료물성실험및설계1", after: "전자재료물성실험및설계2"}, 
                {before : "전자재료물성실험및설계2", after: "전자재료공정실험및설계1"},
                {before : "전자재료공정실험및설계1", after: "전자재료공정실험및설계2"},
                {before : "공학설계입문", after: "캡스톤설계1"},
                {before : "캡스톤설계1", after: "캡스톤설계2"}
                        ]
        },
        {
            department: "로봇학부",
            lectureList: [
                {before : "대학수학및연습1", after: "대학수학및연습2"},
                {before : "로봇학입문", after: "자동제어"},
                {before : "로봇학실험1", after: "로봇학실험2"}, 
                {before : "로봇운동학", after: "로봇제어"},
                {before : "자동제어", after: "캡스톤설계"}
                        ]
        },
        {
            department: "컴퓨터정보공학부",
            lectureList: [
                {before : "대학수학및연습1", after: "대학수학및연습2"},
                {before : "대학수학및연습2", after: "신호및시스템"},
                {before : "C프로그래밍", after: "고급C프로그래밍"}, 
                {before : "디지털논리회로1", after: "디지털논리회로2"},
                {before : "오픈소스소프트웨어설계및실습", after: "소프트웨어프로젝트1"},
                {before : "공학설계입문", after: "객체지향프로그래밍설계"},
                {before : "객체지향프로그래밍설계", after: "산학협력캡스톤설계1"},
                {before : "객체지향프로그래밍설계", after: "산학협력캡스톤설계2"}
                        ]
        },
        {
            department: "소프트웨어학부",
            lectureList: [
                {before : "대학수학및연습1", after: "대학수학및연습2"},
                {before : "C프로그래밍", after: "고급C프로그래밍및설계"},
                {before : "고급C프로그래밍및설계", after: "고급프로그래밍"}, 
                {before : "컴퓨터그래픽스", after: "컴퓨터애니메이션"},
                {before : "네트워크보안", after: "최신정보보안이론"},
                {before : "공학설계입문", after: "산학협력캡스톤설계1"},
                {before : "공학설계입문", after: "산학협력캡스톤설계2"}
                        ]
        },
        {
            department: "건축공학과",
            lectureList: [
                {before : "대학수학및연습1", after: "대학수학및연습2"},
                {before : "공학설계입문", after: "건축설계및도서작성1"},
                {before : "건축설계및도서작성1", after: "건축설계및도서작성2"}, 
                {before : "건축환경1", after: "건축환경2"},
                {before : "구조역학1", after: "구조역학2"},
                {before : "구조역학1", after: "철근콘크리트구조1"},
                {before : "공학수학1", after: "건축동역학"},
                {before : "철근콘크리트구조1", after: "철근콘크리트구조2"},
                {before : "건축공학캡스톤설계", after: "건축종합논문"},
                {before : "공학건축설계및도서작성2수학1", after: "건축공학캡스톤설계"}
                        ]
        },
        {
            department: "화학공학과",
            lectureList: [
                {before : "대학수학및연습1", after: "대학수학및연습2"},
                {before : "대학화학및실험1", after: "유기화학1"},
                {before : "공학수학1", after: "공학수학2"}, 
                {before : "공학수학1", after: "수치해석"},
                {before : "공학수학1", after: "유체역학"},
                {before : "유기화학1", after: "유기화학2"},
                {before : "유기화학1", after: "고분자화학"},
                {before : "물리화학", after: "화공열역학1"},
                {before : "화공열역학1", after: "화공열역학2"},
                {before : "반응공학((구)반응공학1)", after: "촉매반응공학"}, 
                {before : "공학설계입문", after: "화공기초이론및실험1"},
                {before : "공학설계입문", after: "캡스톤설계기초("},
                {before : "캡스톤설계기초((구)캡스톤설계1)", after: "캡스톤설계심화"}
                        ]
        },
        {
            department: "환경공학과",
            lectureList: [
                {before : "대학수학및연습1", after: "대학수학및연습2"},
                {before : "대학화학및실험1", after: "대학화학및실험2"},
                {before : "대학생물및실험", after: "환경미생물학"}, 
                {before : "대학화학및실험2", after: "환경화학"},
                {before : "환경화학", after: "환경유기화학"},
                {before : "공학설계입문", after: "폐기물처리시설설계"},
                {before : "공학설계입문", after: "대기오염방지시설설계"},
                {before : "공학설계입문", after: "환경복원공정설계"},
                {before : "공학설계입문", after: "수처리시설설계"},
                {before : "폐기물처리시설설계 또는 대기오염방지시설설계 또는 환경복원공정설계 또는 수처리시설설계", after: "캡스톤설계"}
                        ]
        },
    ]
  };


function RequiredLectureReducer(state, action) {
  switch (action.type) {
    case 'SEARCH':
        // action.type, action.department, action.lectureName 필요
        let departmentIndex = initialState.departmentList.findIndex( element => element.department == action.department );
        let lectureIndex = -1;
        if(departmentIndex == -1){
            return {
                ...state,
                isProblem: false,
                beforeNeed: "",
                afterNeed: "",
            }
        }
        else{
            lectureIndex =  initialState.departmentList[departmentIndex].lectureList.findIndex( element => element.after == action.lectureName);
            if(lectureIndex == -1){
                return {
                    ...state,
                    isProblem: false,
                    beforeNeed: "",
                    afterNeed: "",
                }
            }
            else{
                return{
                    ...state,
                    isProblem: true,
                    beforeNeed: initialState.departmentList[departmentIndex].lectureList[lectureIndex].before,
                    afterNeed: initialState.departmentList[departmentIndex].lectureList[lectureIndex].after,
                }
            }
        }
        case 'RESET':
            return{
                ...state,
                isProblem: false,
                beforeNeed: "",
                afterNeed: "",
            }
       default:
        return state;
  }
}



const RequiredLectureDispatchContext = createContext();
const RequiredLectureStateContext = createContext();

export function RequiredLectureProvider({ children }) {
  const [state, dispatch] = useReducer(RequiredLectureReducer, initialState);

  return (
    <div>
      <RequiredLectureStateContext.Provider value={state}>
        <RequiredLectureDispatchContext.Provider value={dispatch} >
          {children}
        </RequiredLectureDispatchContext.Provider>
      </RequiredLectureStateContext.Provider>
    </div>
  );
}

export function useRequiredLectureState() {
  return useContext(RequiredLectureStateContext);
}

export function useRequiredLectureDispatch() {
  return useContext(RequiredLectureDispatchContext);
}