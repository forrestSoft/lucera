
import React, {useContext} from 'react';
import useGridContext from '../contexts/grid'
import * as V from 'victory'

const Bar = () => {
	const [grid, gridsDispatch] = useGridContext()
	return(
		<div>
			<V.VictoryChart height={250} width={400} domainPadding={{ x: [100,10] }}>
		    <V.VictoryBar 

		    	data={grid.data}
		    	x="ask_price"
		      y="bid_price"
		      barWidth={25}
		    />
		    <V.VictoryAxis
		      label="Ask Price"
		    	style={{
		    		tickLabels: {
				      fontSize: "5px"
				    }
				  }}
				  
				
		    />
		    <V.VictoryAxis
		    	dependentAxis
		    	crossAxis
		    	label="Bid Price"
		    	style={{
		    		tickLabels: {
				      fontSize: "15px"
				    }
				  }}
				  axisLabelComponent={<V.VictoryLabel dy={-10}/>}
				  fixLabelOverlap={true}
		    />
			 </V.VictoryChart>
		 </div>)
   }

   export default Bar