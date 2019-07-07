import React  from 'react'

import Logo from 'logo-1.svg'
import Layout from 'antd/es/layout'
import "antd/es/layout/style/css"
import "antd/es/menu/style/css"

import Controls from 'controls'
import DataGrid from 'dataGrid'

const { Sider } = Layout;

const Grid = props => {
  return(
    <Layout style={{ marginLeft: 200 }}>
		    <Sider 
	        	style={{
			        overflow: 'auto',
			        height: '100vh',
			        position: 'fixed',
			        left: 0,
			        padding: 20
			      }}
		      >
		      	<img src={Logo} alt="Logo" className="invert" />
						<Controls />
	      </Sider>
      	<DataGrid />
	  </Layout>
  )
}

export default Grid;