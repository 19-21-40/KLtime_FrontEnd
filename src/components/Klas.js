import { useContext, useReducer, useState } from "react";
import useInputs from "../hooks/useInputs";
import { UserState } from '../context/UserInfoContext';
import { call } from "../service/ApiService";
import { JSEncrypt } from 'jsencrypt';
import axios from "axios";
import styled from "styled-components";
import { Circles } from 'react-loader-spinner';
import { API_BASE_URL } from "../app-config";
import KwangWoon_text_logo from "../image/KwangwoonTextLogo.png"

const KwangWoonTextLogo_ = styled.img`
    width: 200px;
    margin-bottom: 40px;
`

const InputContainer = styled.div`
    display : flex;
    margin-bottom: 30px;
`
// const Label = styled.label`
//     margin-right: 15px;
//     width: 80px;
//     height: 50px;

//     text-align: center;
//     line-height: 50px;
//     font-size:20px;
//     color:white;
// `

const Input = styled.input`
    width: 300px;
    height: 50px;
    padding: 5px 20px;

    border-radius: 25px;
    background: rgb(255,255,255);

    font-size:20px;
`

const Button = styled.button`

    width: 100%;
    height: 50px;
    margin-top:50px;
    background: #8b0b02;
    
    padding: 6px;
    border-radius: 20px;

    color: #fff;
    font-size: 20px;
    font-weight: 800;

    cursor: pointer;
`

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
        case 'Klas SUCCESS':
            return {
                loading: true,
                data: action.data,
                error: null
            };
        // 에러가 발생하면 action.error를 전달해주겠습니다.
        case 'SUCCESS':
            return {
                ...state,
                loading: false
            };
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
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        dispatch({ type: 'LOADING' });
        try {
            if (accessToken && accessToken !== null) {
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
                        .then(() => {
                            axios.post('/proxy/std/cps/inqire/AtnlcScreSungjukInfo.do')
                                .then(async (resData) => {
                                    let klasTimeTableDTO = [];
                                    const promises = resData.data.map(async (value, index) => {
                                        if (value.hakgi < 3) {
                                            await axios.post('/proxy/std/cmn/frame/StdHome.do', JSON.stringify({ "searchYearhakgi": `${value.thisYear},${value.hakgi}` }), {
                                                headers: {
                                                    'Content-type': 'application/json; charset=UTF-8',
                                                    'Accept': '*/*',
                                                }
                                            }).then((d) => klasTimeTableDTO.push(d.data.atnlcSbjectList));
                                        }
                                    });
                                    await Promise.all(promises);
                                    dispatch({
                                        type: 'Klas SUCCESS', data: {
                                            klasTookLectureListDTOList: resData.data,
                                            klasTimeTableDTO: klasTimeTableDTO
                                        }
                                    });
                                    axios.post(`${API_BASE_URL}/api/Klas/link`, {
                                        klasTookLectureListDTOList: resData.data
                                        , klasTimeTableDTOListList: klasTimeTableDTO
                                    }, {
                                        headers: {
                                            'Content-type': 'application/json; charset=UTF-8',
                                            'Accept': '*/*',
                                            'Authorization': "Bearer " + accessToken,
                                        },
                                    }
                                    ).then(
                                        () => {
                                            dispatch("SUCCESS");
                                            window.location.href="/";}
                                            
                                    );
                                })

                        }
                        )
                });
            } else {
                window.location.href = "/Login"
            }
        } catch (e) {
            dispatch({ type: 'ERROR', error: e });
        }

    }


    return (
        <div>
            {state.loading ? <Circles
                            height="80"
                            width="80"
                            radius="9"
                            color="green"
                            ariaLabel="loading"
                            wrapperStyle
                            wrapperClass
                        /> : <>
                        <form>
                            <div>
                                <KwangWoonTextLogo_ src={KwangWoon_text_logo} />
                                <InputContainer>
                                    {/* <Label htmlFor="stdnum">학번<br /></Label> */}
                                    <Input onChange={onChange} id="loginId" type="text" name="loginId" value={loginId} placeholder="학번을 입력하시오." />
                                </InputContainer>
                                <InputContainer>
                                    {/* <Label htmlFor="password">비밀번호<br /></Label> */}
                                    <Input onChange={onChange} id="loginPwd" type="password" name="loginPwd" value={loginPwd} placeholder="비밀번호를 입력하시오." />
                                </InputContainer>
                            </div>
                        </form>
                        <div>
                            <Button onClick={onClick}>연동하기</Button>
                        </div>
                        </>}
            
        </div>
    );
}

export default Klas;