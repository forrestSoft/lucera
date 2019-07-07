import React, {useCallback, Fragment, Memo} from 'react';
import {useMetaDataContext} from './contexts/meta'
import {useGridDispatchContext} from './contexts/grid'

// import useGridContext from './contexts/grid'

import Select from 'antd/es/select'
import Form, {FormItem} from 'antd/es/form'

import Button from 'antd/es/button'
import Menu from 'antd/es/menu'
import Icon from 'antd/es/icon'
import Divider from 'antd/es/divider'
import InputNumber from 'antd/es/input-number'

import "antd/es/select/style/css"
import "antd/es/form/style/css"
import "antd/es/button/style/css"
import "antd/es/menu/style/css"
import "antd/es/icon/style/css"
import "antd/es/divider/style/css"
import "antd/es/input-number/style/css"


const { Option } = Select

const SymbolOptions = ()=>{
	const meta = useMetaDataContext()
	
  return (	
		meta.symbolList &&
	  	meta.symbolList.map((symbol, i)=>{
	  		return(<Option value={i} key={i}>{symbol}</Option>)
			})
  )
}

const LPOptions = ()=>{
	const meta = useMetaDataContext()
	
  return (	
		meta.lpList &&
	  	meta.lpList.map((symbol, i)=>{
	  		return(<Option value={i} key={i}>{symbol}</Option>)
			})
  )
}

const Controls = props => {
	const gridDispatch = useGridDispatchContext()
  return (
  	<Fragment>
  		<h3>Data filters</h3>
  		<Divider />
	    <Form >
	      <Form.Item label="Symbol">
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
				    {SymbolOptions()}
				  </Select>
				</Form.Item>
				<Form.Item label="Symbol">
		      <Select
				    mode="multiple"
				    style={{ width: '100%' }}
				    placeholder="Please select"
				    onChange={(vals)=>{
				    	gridDispatch({
								action: 'LP_OPTION_CHANGE',
								payload: vals
							})
				    }}
				  >
				    {LPOptions()}
				  </Select>
				</Form.Item>
	    </Form>
    </Fragment>
  )
}

export default Controls
