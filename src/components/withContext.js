import React from 'react'

import {GridContext, GridProvider} from './contexts/grid'
import {MetaContext, MetaProvider} from './contexts/meta'

const WithContext = (props) => {
	return(
		<MetaProvider>
			<GridProvider>
					{props.children}
			</GridProvider>
		</MetaProvider>
	)
}
export default WithContext