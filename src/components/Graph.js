import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import { PieChart } from "react-minimal-pie-chart";
import Main_Modal from './Main_Modal';
import styled from "styled-components";

const Design_Box = styled.div`
    width: ${props => `${props.Width}px`};
    height: ${props => `${props.Height}px`};
    // border: 2px solid black;
    border-radius: 20px;
    margin-bottom: 25px;
    margin-left: 5px;
    
`;

const Full_box = styled.div`
    display: flex;
    top: ${props => `${props.Top_css}px`};
    // height: 300;
    // flex-direction: column;

    cursor: ${props => (props.CanOpen ? 'pointer' : 'default')};
`;

const Text_box = styled.div`
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 200px;
    align-items: center;
    justify-content: center;
    text-align:center;

    // margin: auto 0;
    margin-top: ${props => `${props.margin_t}px`};
    margin-left: 5%;
    h1 {
      font-size: ${props => `${props.font_1}px`};
      margin: 0 0 10px 0;
      font-weight:normal;
    }

    h2 {
      font-size: ${props => `${props.font_2}px`};
      margin: 0 0 10px 0;
      font-weight:normal;
    }
    
`;

function Piechart({ canOpen, Already_num, Full_num, Kind, Chart_size, Width, Height, Top_css, Left_css, section, font_1, font_2, margin_t}) {

  const [modalOpen, setModalOpen] = useState(false);//모달
  const [Al, setAl] = useState(Already_num);
  const [Fu, setFu] = useState(Full_num);
  const [AlT, setAlT] = useState();
  const [FuT, setFuT] = useState();
  const [CanOpen, setCanOpen] = useState(canOpen);

  // 모달창 노출

  useEffect(() => {
    if (Full_num == 0) {
      setAl(1);
      setFu(1);
      setAlT("-");
      setFuT("-");
    }
    else if (Already_num > Full_num) {
      setAl(Full_num);
      setFu(Full_num);
      setAlT(Already_num);
      setFuT(Full_num);
    }
    else {
      setAl(Already_num);
      setFu(Full_num);
      setAlT(Already_num);
      setFuT(Full_num);
    }
  }, [Already_num, Full_num]);


  const showModal = () => {
    if(CanOpen == false){
      setModalOpen(false);
    }else if (modalOpen == false) {
      setModalOpen(true);
    }

  };

  const closeModal = () => {
    if (modalOpen == true) {
      setModalOpen(false);
    }

  };


  return (
    <Design_Box Width={Width} Height={Height} >
      <Full_box CanOpen={CanOpen} onClick={() => {
        showModal()
      }} Top_css={Top_css} >
        <PieChart
          style={{ position: "relative", height: `${Chart_size}px`, top: `${Top_css}`, left: `${Left_css}` }}
          data={[
            {
              value: Al / Fu * 100,
              // color: "#8b0b02",
              color:"#f3f3f3"
              
            },
          ]}
          startAngle={-90}
          // reveal={12/60*100} //퍼센트 치수

          reveal={100-(Al / Fu * 100)}
          lineWidth={35} //도넛 두께
          // background="#f3f3f3"
          background="#8b0b02"
          lengthAngle={-360}
          animationDuration={1000}
          animate
          label={({ dataEntry }) => `${Math.round(dataEntry?.value)}%`}
          labelStyle={{
            fontSize: "24px",
            fill: "#33333",
          }}
          labelPosition={0}
        />
        
        <Text_box font_1={font_1} font_2={font_2} margin_t={margin_t} >
          <h1>{Kind}</h1>
          <h2>기준 학점 : {FuT}</h2>
          <h2>이수 학점 : {AlT}</h2>
        </Text_box>
        {modalOpen ? <Main_Modal closeModal={closeModal} section={section} /> : null}
      </Full_box>
    </Design_Box>
  );
}

export default Piechart;