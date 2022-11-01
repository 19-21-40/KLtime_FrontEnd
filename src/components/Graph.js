import { render } from '@testing-library/react';
import React, { useState } from 'react';
import { PieChart } from "react-minimal-pie-chart";
import Main_Modal from './Main_Modal';
import styled from "styled-components";

const Design_Box = styled.div`
    width: ${props => `${props.Width}px`};
    height: ${props => `${props.Height}px`};
    // border: 2px solid black;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    margin-bottom: 25px;
    margin-left: 5px;
`;

const Full_box = styled.div`
    display: flex;
    position: relative;
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
`;

function Piechart( {Already_num, Full_num, Kind, Chart_size, Width, Height, Top_css, Detail_chart} ){

  const [modalOpen, setModalOpen] = useState(false);//모달
  const [Detail, setDetail] = useState(false);//그래프
  const [Edit, setEdit] = useState(false);//계정정보 수정
  const [Klas, setKlas] = useState(false);//Klas 연동하기

    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };

    const showDetail = () => {
        setDetail(true);    
    };

    const showEdit = () => {
      setEdit(true);    
  };

  const showKlas = () => {
      setKlas(true);    
  };


  return (
    <Design_Box Width={Width} Height={Height} >
      <Full_box onClick={ () =>  {
        showModal()
        showDetail()
      }} Top_css={Top_css} >
        <PieChart
          style={{ position: "relative", height: `${Chart_size}px` }}
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
          {modalOpen && <Main_Modal setModalOpen={setModalOpen} setDetail={setDetail} setEdit={setEdit} setKlas={setKlas} Detail={Detail} Edit={Edit} Klas={Klas} />}
      </Full_box>
    </Design_Box>
  );
}

export default Piechart;