import React from 'react'

import {GridProvider} from './contexts/grid'
import {MetaProvider} from './contexts/meta'

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