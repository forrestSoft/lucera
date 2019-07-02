import React, {useCallback, Fragment} from 'react';
import useMetaContext from './contexts/meta'
import Select from 'antd/es/select'
import Form, {FormItem} from 'antd/es/form'

import Button from 'antd/es/button'
import Dropdown from 'antd/es/dropdown'
import Menu from 'antd/es/menu'
import Icon from 'antd/es/icon'
import Divider from 'antd/es/divider'

import "antd/es/select/style/css"
import "antd/es/form/style/css"
import "antd/es/button/style/css"
import "antd/es/dropdown/style/css"
import "antd/es/menu/style/css"
import "antd/es/icon/style/css"
import "antd/es/divider/style/css"

const { Option } = Select;
const AppMenu = (meta)=>{
	// debugger
  return (<Menu >
  	{
			meta.symbolList &&
	  	meta.symbolList.map((symbol, i)=>{
	  		return(
	  			<Menu.Item key="1">
			      <Icon type="user" />
			      {Symbol}
			    </Menu.Item>
				)
  		})
	  }
  </Menu>)
};
const Controls = props => {
	const [meta, metaDispatch] = useMetaContext()
  return (
  	<Fragment>
  		<h3>Data filters</h3>
  		<Divider />
	    <Form >
		    <Dropdown.Button 
		    	overlay={AppMenu(meta)}
		    	icon={<Icon type="dollar" />}
		  	>
		       symbol
		    </Dropdown.Button>
	    </Form>
    </Fragment>
  )
}

export default Controls

const SymbolSelect = props => {
	const [meta, metaDispatch] = useMetaContext()

	const handleChange = useCallback((e)=>{
		metaDispatch({
	    action: 'SYMBOL_CHANGED',
	    payload: e.target.value
	  })
	}, [meta.selectedSymbol, metaDispatch])

	return (
		<Form.Item >
			<Select 
	    	onChange={handleChange}
	    	value={meta.selectedSymbol || ''}
	    >
	    	{
		    	meta.symbolList && meta.symbolList.map((symbol, i)=>{
		    		return(
		    			<Option value={symbol} key={symbol}>
	    					{symbol}
	  					</Option>
						)
		    	})
	    	}
	    </Select>
    </Form.Item>
    )
  }