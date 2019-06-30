import React, {useContext, Fragment, memo} from 'react';
import DispatchContext from 'context'
import * as V from 'victory'

const Stack = ()=>{
  const [grid, gridsDispatch] = useContext(DispatchContext)
  return(
    
      <V.VictoryStack 
        horizontal
        
        height={500}
        width={500}
        padding={{ top: 80, bottom: 80, left: 20, right: 20 }}
        /* setting a symmetric domain makes it much easier to center the axis  */
        domain={{ y: [-60, 60] }}
        
        style={{ data: { width: 20 }, labels: { fontSize: 11 } }}
      >

        <V.VictoryBar
          style={{ data: { fill: "tomato" } }}
          data={grid.data}
          x={'ask_price'}
          y={'ts'}
          
        />
        <V.VictoryBar
          style={{ data: { fill: "orange" } }}
          data={grid.data}
          y="bid_price"
          x="ts"
          
        />
      </V.VictoryStack>
    
  )
}

export default Stack