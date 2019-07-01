
import React, {useContext} from 'react';
import useGridContext from '../contexts/grid'
import * as V from 'victory'

const Bar = () => {
	const [grid, gridsDispatch] = useGridContext()
	return(
		<V.VictoryChart >
	    <V.VictoryBar 
	    	data={grid.data}
	    	x="ask_price"
	      y="bid_price"
	      barWidth={20}
	    />
	    <V.VictoryAxis
	      label="l"
	    	style={{
	    		tickLabels: {
			      fontSize: "5px"
			    }
			  }}
	    />
	    <V.VictoryAxis
	    	dependentAxis
	    	crossAxis
	    	label="Time (ms)"
	    	style={{
	    		tickLabels: {
			      fontSize: "5px"
			    }
			  }}
	    />
		 </V.VictoryChart>)
   }

   export default Bar