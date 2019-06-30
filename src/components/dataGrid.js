import React, {useContext, useEffect, Fragment, memo} from 'react';
import DispatchContext, {MetaContext} from 'context'

import Table from 'antd/es/table';
import "antd/es/table/style/css"
import * as V from 'victory'

import Bar from 'charts/bar'
import Line from 'charts/line'
const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

const DataGrid = props => {
	const [grid, gridsDispatch] = useContext(DispatchContext)
	const [meta, metaDispatch] = useContext(MetaContext)

	const sort = (e)=>{
		gridsDispatch({
			action: 'SORT',
			payload: e.target.textContent
		})
	}
	
 const columns = [{
    title: 'bid_price',
    dataIndex: 'bid_price',
    key: 'bid_price',
  },
  {
    title: 'ask_price',
    dataIndex: 'ask_price',
    key: 'ask_price',
  },
  {
    title: 'sym',
    dataIndex: 'sym',
    key: 'sym',
  },
];


  return (
  	<Fragment>
  		<Table 
  			dataSource={grid.data}
  			columns={columns} 
  			loading={!grid.LOADING===false} 
  			rowKey={record => record._id}
  		/>
	    <table style={{display: 'none'}}>
	    	<tbody>
	    		<tr>
	    		{ meta.LOADING===false && meta.headerKeys.map((header, i)=>{
						return (<th key={`${header}`} onClick={sort}>{header}</th>)	
					})}
					</tr>

		    	{grid.LOADING===false &&
			    	<Rows data={grid.data} />
		    	}
	    	</tbody>
	    </table>
	    
	    <Line />
			<Bar />
    </Fragment>
  )
}

export default DataGrid;

/*
response.data = response.data.sort((a,b)=>{
          if(a.ask_price>b.ask_price){
            return 1
          }else if (a.ask_price<b.ask_price){
            return -1
          }else{
            return 0
          }
        })*/
// TR
const Rows = (props) => {
  return (
    <Fragment>{rows(props.data)}</Fragment>
  )
}

const rows =  (data)=>{
	return data.map((row, i)=>{
		return (<Row key={`${row.ts}-${i}`} data={row}></Row>)	
	})
}
const Row = memo((props) => {
  return (
    <tr key={props.data._id}>{cells(props.data)}</tr>
  )
})

const cells = (data)=>{
	return Object.keys(data).map((cell, i)=>{
		return (<Cell 
			data={data[cell]}
			key={`${data._id}-${i}`} 
		/>)	

	})
}
// TD
const Cell = memo((props)=>{
	return(<td>{props.data}</td>)
}
)