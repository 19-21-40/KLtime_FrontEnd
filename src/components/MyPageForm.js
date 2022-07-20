import PropTypes from "prop-types";
import { useState } from "react";
import { renderMatches } from "react-router-dom";
import styles from "./MyPageForm.module.css";
import uuid from "react-uuid";

function MyPageForm({studentnumber,pw,department,email}){
  const multiMajors=['심화전공', '복수전공','복수심화전공','부전공','연계전공','*해당없음*'];
  const majors=['소프트웨어학부','컴퓨터정보공학부','정보융합학부','*해당없음*'];
  const [MultiMajors,setMultiMajors]=useState(
    {
      multiMajorName:'',
      majorName:''
    });
  const [Majors,setMajors]=useState({major:department});
  const onChange=(event)=>{
    if(event.target.id==='multiMajorName'){
      // console.log(event.target.value);
      setMultiMajors({...MultiMajors,[event.target.id]:event.target.value});
    }else{
      // console.log(event.target.value);
      setMultiMajors({...MultiMajors,[event.target.id]:event.target.value}); 
    }
  }
  // console.log(MultiMajors);

  const onSubmit=(event)=>{
    event.preventDefault();
    // console.log(event.target);
    // console.log(MultiMajors);
    setMajors((Majors)=>({...Majors,MultiMajors}));
    localStorage.setItem('multiMajorName',MultiMajors.multiMajorName);//추가
    localStorage.setItem('majorName',MultiMajors.majorName);//추가

  };
  // console.log(Majors);

  return (
    <div className={styles.box}>
      <div>
        <h2>내 정보</h2>
        <ul><li className={styles.index}>{email}</li></ul>
      </div>
      <div className={styles.smallbox}>
        <ul>
            <li><span>학번</span>{studentnumber}</li>
            <li>
              <div>
                <span>비밀번호</span>
                {pw}
                <button className={styles.btn}>비밀번호 변경</button> 
              </div>
            </li>
            {/* <li>{email}</li> */}
            <li><span>학과(학부)</span>{department}</li>
            <form onSubmit={onSubmit}>
              <select defaultValue={localStorage.getItem('multiMajorName')} id='multiMajorName' className={styles.dropdown} onChange={onChange} >
                <option>--- 다전공 ---</option>
                {multiMajors.map((multiMajor,index)=>(
                  <option key={index}>
                    {multiMajor}
                  </option>
                ))}
              </select>
              <select defaultValue={localStorage.getItem('majorName')} id='majorName' className={styles.dropdown} onChange={onChange}>
                <option>--- 학과(학부) ---</option>
                {majors.map((major,index)=>(
                  <option key={index}>
                    {major}
                  </option>
                ))}
              </select>      
              <button className={styles.btn}>수정하기</button>
            </form>
        </ul>
      </div>     
    </div>
  )
  
}

export default MyPageForm;