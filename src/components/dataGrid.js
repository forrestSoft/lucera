import React, {useContext, useEffect, Fragment, memo} from 'react';
import useGridContext from './contexts/grid'
import useMetaContext, {useMetaDataContext} from './contexts/meta'
import Layout from 'antd/es/layout'
import Table from 'antd/es/table'
import Pagination from 'antd/es/pagination';
import "antd/es/layout/style/css"
import "antd/es/table/style/css"
import "antd/es/pagination/style/css"
import * as V from 'victory'

import Bar from 'charts/bar'
import Line from 'charts/line'

const { Header, Footer, Sider, Content } = Layout

const toTitleCase = (s)=>{
	    return s.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

const useColumns = ()=>{
	const meta = useMetaDataContext()
    if(!meta.headerKeys){
      return []
    }
   
   let c = meta.headerKeys.map((header, i)=>{
    if(header === '_id'){
    		return
    	}
    return {
      title: toTitleCase(header.replace('_', ' ')),
      dataIndex: header,
      key: header,
      width:'18%'
    }
  })
  c.pop()
  return c
}
const DataGrid = props => {
	const [grid, gridsDispatch] = useGridContext()
	const [meta, metaDispatch] = useMetaContext()

	const sort = (e)=>{
		gridsDispatch({
			action: 'SORT',
			payload: e.target.textContent
		})
	}

	const handleTableChange=(pagination, filters, sorter)=>{
		gridsDispatch({
			action: 'PAGINATION_CLICK',
			payload: {current: pagination.current}
		})
	}

	function handleShowSizeChange(current, pageSize) {
		debugger
	  gridsDispatch({
			action: 'PAGINATION_SIZE_CHANGE',
			payload: {current: current, pageSize: pageSize}
		})
	}
	return (
		<Layout>
			<Content style={{height: '66vh'}}>
	  		<Table 
	  			dataSource={grid.data}
	  			columns={useColumns()} 
	  			rowKey={record => record._id}
	  			loading={grid.loading}
	        pagination={{
	        	...grid.pagination,
	        	total: grid.total,
	        	showSizeChanger: true,
	        	pageSizeOptions: [
							'10',
							'25',
							'100',
							'1000'
	        	],
	        	onShowSizeChange:(current, page)=>{
	        		handleShowSizeChange(current, page)
	        	}
	        }}
	        size="small"
	        scroll={{ y: '44vh' }}
	        onChange = {handleTableChange}
	        
	  		/>
  		</Content>
  		<Content className={'flex'}>
				<Line />
				<Bar />
			</Content>
		</Layout>
	)
}

export default DataGrid;