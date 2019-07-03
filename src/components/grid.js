import React, {Fragment} from 'react'
import Logo from 'logo-1.svg'
import Layout from 'antd/es/layout'
import Menu from 'antd/es/menu'



import "antd/es/layout/style/css"
import "antd/es/menu/style/css"


import Controls from 'controls'
import DataGrid from 'dataGrid'
const { Header, Footer, Sider, Content } = Layout;


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
		      	<img src={Logo} className="invert" />
						<Controls />
	      </Sider>

      <Layout>
	      
	      <Content>
	      	<DataGrid />
	      </Content>
	    </Layout>
	  </Layout>
  )
}

export default Grid;