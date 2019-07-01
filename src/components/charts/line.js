import React, {useContext, Fragment, memo} from 'react';
import useGridContext from '../contexts/grid'
import * as V from 'victory'

const Line = ()=>{
  const [grid, gridsDispatch] = useGridContext()
  // debugger
  return(
    <Fragment>
      <V.VictoryChart 
        theme={V.VictoryTheme.material}
      >
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
          tickCount={10}
          dependentAxis
          label="USD"
          style={{
            tickLabels: {
              fontSize: "5px"
            }
          }}
        />
      </V.VictoryChart>
    </Fragment>
  )
}

export default Line