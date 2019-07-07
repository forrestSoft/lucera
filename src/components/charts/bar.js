
import React from 'react';
import {useGridDataContext} from '../contexts/grid'
import * as V from 'victory'

const Bar = props => {
	const grid = useGridDataContext()
	return(
		<div>
			<V.VictoryChart 
				height={250} 
				width={400} 
				domainPadding={{ x: [100,10] }}
			>
		    <V.VictoryLabel 
          text={props.title}
          dy={30}
          dx={125}
        />
		    <V.VictoryBar 
		    	data={grid.data}
		    	x={props.x}
		      y={props.y}
		      barWidth={25}
		    />
		    <V.VictoryAxis
		      label="Ask Price"
		      tickCount={3}
		    	style={{
		    		tickLabels: {
				      fontSize: "15px"
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
				  axisLabelComponent={<V.VictoryLabel dy={-100}/>}
				  fixLabelOverlap={true}
		    />
			 </V.VictoryChart>
		 </div>)
   }

   export default Bar