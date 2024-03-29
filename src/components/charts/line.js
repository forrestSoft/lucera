import React from 'react'
import {useGridDataContext} from '../contexts/grid'
import * as V from 'victory'

const Line = ()=>{
  const grid = useGridDataContext()

  return(
    <div>
      <V.VictoryChart >
        <V.VictoryLabel 
          text={"Ask and Bid Price over time"}
          dy={30}
          dx={125}/>
        <V.VictoryLine 
          data={grid.data}
          x="ts"
          y="bid_price"
        />
        <V.VictoryLine 
          data={grid.data}
          x="ts"
          y="ask_price"
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
        />
        <V.VictoryLegend x={20} y={310}
          standalone={false}
          orientation="horizontal"
          width={10}
          style={{ border: { stroke: "black", strokeWidth: .5  }, labels: {fontSize: 7 } }}
          data={[
            { name: "Bid Price", symbol: { fill: "tomato" }},
            { name: "Ask Price", symbol: { fill: "black" }}
          ]}
        />
        <V.VictoryAxis
          tickValues={['','']}
          label="Time"
          style={{
            tickLabels: {
              fontSize: "5px"
            }
          }}
        />
        <V.VictoryAxis
          dependentAxis
          label=""
          tickCount={3}
          style={{
            tickLabels: {
              fontSize: "15px"
            }
          }}
        />
      </V.VictoryChart>
    </div>
  )
}

export default Line