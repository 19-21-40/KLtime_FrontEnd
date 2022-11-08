import { render } from '@testing-library/react';
import React, { useState } from 'react';
import { PieChart } from "react-minimal-pie-chart";
import Main_Modal from './Main_Modal';
import styled from "styled-components";

const Design_Box = styled.div`
    width: ${props => `${props.Width}px`};
    height: ${props => `${props.Height}px`};
    // border: 2px solid black;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    margin-bottom: 25px;
    margin-left: 5px;
    
`;

const Full_box = styled.div`
    display: flex;
    top: ${props => `${props.Top_css}px`};
    // height: 300;
    // flex-direction: column;
`;

const Text_box = styled.div`
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 200px;
    align-items: center;
    justify-content: center;
    text-align:center;
    
`;

function Piechart( {Already_num, Full_num, Kind, Chart_size, Width, Height, Top_css, Left_css, Detail_chart} ){

  const [modalOpen, setModalOpen] = useState(false);//모달

    // 모달창 노출
    const showModal = () => {
      if(modalOpen == false){
        setModalOpen(true);
      }
        
    };

    const closeModal = () => {
      if(modalOpen == true) {
        setModalOpen(false);
      }
      
  };




  return (
    <Design_Box Width={Width} Height={Height} >
      <Full_box onClick={ () =>  {
        showModal()
      }} Top_css={Top_css} >
        <PieChart
          style={{ position: "relative", height: `${Chart_size}px`, top: `${Top_css}`, left: `${Left_css}`}}
          data={[
            {
            value: Already_num / Full_num*100,
            color: "#F6CB44",
            name: "name1",
            },
          ]}
          startAngle={270}
          // reveal={12/60*100} //퍼센트 치수
          reveal={Already_num / Full_num * 100}
          lineWidth={35} //도넛 두께
          background="#f3f3f3"
          lengthAngle={(360)}
          rounded
          animate
          label={({ dataEntry }) => `${Math.round(dataEntry?.value)}%`}
          labelStyle={{
          fontSize: "26px",
          fill: "#33333",
          }}
          labelPosition={0}
          />
          <Text_box>
            <h1>{Kind}</h1>
            <div>기준 학점 : {Full_num}</div>
            <div>이수 학점 : {Already_num}</div>
          </Text_box>
          {modalOpen ? <Main_Modal closeModal={closeModal}/> : null}
      </Full_box>
    </Design_Box>
  );
}

export default Piechart;