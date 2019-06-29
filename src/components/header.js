import React, {useContext} from 'react';
import {MetaContext} from 'context'

const Header = (props) => {
	const [meta, metaDispatch] = useContext(MetaContext)

  return (
    <table>
    	<tbody>
    		{meta.Loading===false &&
    		<tr>{HeaderItems(meta.headerKeys)}</tr>
    		}
    	</tbody>
    </table>
  )
}

export default Header;

const HeaderItems = headers => {
	return headers.map((header, i)=>{
		return (<th key={`${header}`}>{header}</th>)	
	})
}