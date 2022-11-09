import { useContext, useReducer, useState } from "react";
import useInputs from "../hooks/useInputs";
import { UserState } from '../context/UserInfoContext';
import { call } from "../service/ApiService";
import { JSEncrypt } from 'jsencrypt';
import axios from "axios";

function reducer(state, action) {
    switch (action.type) {
        // 발생할 수 있는 상황 LOADING, SUCCESS, ERROR에 대한 case를 만들어 줍니다.
        // 로딩중 상태 업데이트
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null
            };
        // 불러오는데에 성공했을 때는 action.data를 저장해줍니다.
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null
            };
        // 에러가 발생하면 action.error를 전달해주겠습니다.
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function Klas() {

    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });
    const page = "https://klas.kw.ac.kr";
    const [{ loginId, loginPwd }, onChange, reset] = useInputs({
        loginId: '',
        loginPwd: '',
    });
    const { loading, data, error } = state;
    const onClick = () => {
        dispatch({ type: 'LOADING' });
        try {
            const encrypt = new JSEncrypt();
            axios.post(
                //publicKey를 받아옴
                '/proxy/usr/cmn/login/LoginSecurity.do', "", {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'Accept': '*/*',
                    },
                withCredentials: true
            }).then((response) => {
                //로그인을 시행
                let login = JSON.stringify({
                    "loginId": loginId,
                    "loginPwd": loginPwd,
                    "storeIdYn": "N"
                });
                console.log(login);
                encrypt.setPublicKey(response.data?.publicKey);
                let loginToken = encrypt.encrypt(login);
                let requestData = JSON.stringify({
                    "loginToken": loginToken,
                    "redirectUrl": "",
                    "redirectTabUrl": ""
                })
                console.log(requestData);
                axios.post('/proxy/usr/cmn/login/LoginConfirm.do', requestData, {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'Accept': '*/*',
                    }, withCredentials: true,
                })
                .then(()=>{
                    axios.post('/proxy/std/cps/inqire/AtnlcScreSungjukInfo.do')
                    .then((resData)=>{
                        dispatch({ type: 'SUCCESS', data: resData });
                        call("/api/Klas/link","POST",resData);
                    })
                    }
                )   
            });
        } catch (e) {
            dispatch({ type: 'ERROR', error: e });
        }



        // call("/usr/cmn/login/LoginSecurity.do", "POST", "")
        //     .then((res) => {
        // const login = JSON.stringify({
        //     "loginId": loginId,
        //     "loginPwd": loginPwd,
        //     "storeIdYn": "N"
        // });
        // const encrypt = new JSEncrypt();
        // encrypt.setPublicKey(res.publicKey);
        // const loginToken = encrypt.encrypt(login);
        // const data = JSON.stringify({
        //     "loginToken": loginToken,
        //     "redirectUrl": "",
        //     "redirectTabUrl": ""
        // })
        // call("/usr/cmn/login/LoginConfirm.do", "POST", data, page)
        //     .then((res) => {
        //         call("std/cmn/frame/YearhakgiAtnlcSbjectList.do", "POST", "{}", page)
        //             .then((res) => {
        //                 setData(res);
        //             })
        //     })
        // })

    }

    // if (loading) return <div>로딩중..</div>;
    // if (error) return <div>에러가 발생했습니다</div>;

    return (
        <div>
            <form>
                <div>
                    <div>
                        <label htmlFor="stdnum">학번<br /></label>
                        <input onChange={onChange} id="loginId" type="text" name="loginId" value={loginId} placeholder="학번을 입력하시오." />
                    </div>
                    <div>
                        <label htmlFor="password">비밀번호<br /></label>
                        <input onChange={onChange} id="loginPwd" type="password" name="loginPwd" value={loginPwd} placeholder="비밀번호를 입력하시오." />
                    </div>
                </div>
            </form>
            <div>
                <button onClick={onClick}>로그인</button>
                <button>비밀번호 찾기</button>
            </div>

            {/* {
                data?.map((array) => {
                    array?.map((value) =>
                        <div>
                            <div>{value.label}</div>
                            <div>{value.subjList.map((list) => (
                                <div>{list?.label}</div>)
                            )}
                            </div>
                        </div>
                    )
                })
            } */}
        </div>
    );
}

export default Klas;