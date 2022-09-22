import { render } from '@testing-library/react';
import React, { useState } from 'react';
import { PieChart } from "react-minimal-pie-chart";

function Piechart( {Already_num, Full_num, Kind} ){
  const [Lecture_list, setLecture_list] = useState(false);

  return (
    <div>
        <h1>{Kind}</h1>
        <PieChart
        style={{ position: "relative", height: "200px" }}
        data={[
            {
            value: `${Math.round(Already_num / Full_num * 100)}`,
            color: "#F6CB44",
            name: "name1",
            },
        ]}
        startAngle={270}
        // reveal={12/60*100} //퍼센트 치수
        reveal={Already_num / Full_num * 100}
        lineWidth={18} //도넛 두께
        background="#f3f3f3"
        lengthAngle={(360)}
        rounded
        animate
        label={({ dataEntry }) => dataEntry.value + "%"}
        labelStyle={{
        fontSize: "26px",
        fill: "#33333",
        }}
        labelPosition={0}
        onClick={ () => {
          setLecture_list(true);
        }}
        />
        {/* {Lecture_list === true ? <Modal /> : null} */}
        <h2>기준 학점 : {Full_num}</h2>
        <h2>이수 학점 : {Already_num}</h2>
    </div>
  );
}

export default Piechart;