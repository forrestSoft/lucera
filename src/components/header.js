import React, {useContext, memo} from 'react'
import {MetaContext} from 'context'

const Header = (props) => {
	const [meta, metaDispatch] = useContext(MetaContext)

  return (
    <table>
    	<tbody>

    		<tr>{HeaderItems(meta.headerKeys)}</tr>
    		
    	</tbody>
    </table>
  )
}

export default memo(Header)

const HeaderItems = headers => {
	return headers.map((header, i)=>{
		return (<th key={`${header}`}>{header}</th>)	
	})
}