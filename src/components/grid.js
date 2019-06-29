import React, {Fragment} from 'react'

import Controls from 'controls'
import DataGrid from 'dataGrid'
import Header from 'header'

const Grid = props => {
  return(
	 	<Fragment>
	 		<Controls />
	 		<Header />
    	<DataGrid />
	 	</Fragment> 
  )
}

export default Grid;