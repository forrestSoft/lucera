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
    <Layout>
      <Header><img src={Logo} className="invert" /></Header>
      <Layout>
        <Sider width={200}>
	        <Menu
	          defaultSelectedKeys={['1']}
	          defaultOpenKeys={['sub1']}
	          style={{ height: '100%', borderRight: 0 }}
	        > 
						<Menu.Item style={{ height: '100%', borderRight: 0 }}>
							<Controls />
						</Menu.Item>
						<Menu.Divider style={{margin: '-20px'}}/>
	          <Menu.Item key="2">option2</Menu.Item>
	          <Menu.Item key="3">option3</Menu.Item>
	          <Menu.Item key="4">option4</Menu.Item>
	        </Menu>
	      </Sider>
	      <Content>
	      	<DataGrid />
	      </Content>
	    </Layout>
	  </Layout>
  )
}

export default Grid;