import React, {useCallback, Fragment, Memo} from 'react';
import useMetaContext from './contexts/meta'
import useGridContext from './contexts/grid'

import Select from 'antd/es/select'
import Form, {FormItem} from 'antd/es/form'

import Button from 'antd/es/button'
import Dropdown from 'antd/es/dropdown'
import Menu from 'antd/es/menu'
import Icon from 'antd/es/icon'
import Divider from 'antd/es/divider'
import Collapse from 'antd/es/collapse'

import "antd/es/select/style/css"
import "antd/es/form/style/css"
import "antd/es/button/style/css"
import "antd/es/dropdown/style/css"
import "antd/es/menu/style/css"
import "antd/es/icon/style/css"
import "antd/es/divider/style/css"

import "antd/es/collapse/style/css"

const { Option } = Select
const { Panel } = Collapse

const Options = ()=>{
	const [meta, metaDispatch] = useMetaContext()
	
  return (	
		meta.symbolList &&
	  	meta.symbolList.map((symbol, i)=>{
	  		return(<Option value={i} key={i}>{symbol}</Option>)
			})
  )
}

const Controls = props => {
	const [grid, gridDispatch] = useGridContext()

  return (
  	<Fragment>
  		<h3>Data filters</h3>
  		<Divider />
  		<Collapse >
		    <Panel header="Select a symbol" key="1">
		      <Form >
			      <Select
					    mode="multiple"
					    style={{ width: '100%' }}
					    placeholder="Please select"
					    onChange={(vals)=>{
					    	gridDispatch({
									action: 'SYMBOL_OPTION_CHANGE',
									payload: vals
								})
					    }}

					    
					  >
					    {Options() }
					  </Select>,
				    
			    </Form>
		    </Panel>
		    <Panel header="other">
		    	
		    </Panel>
		    
		  </Collapse>,
	    
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