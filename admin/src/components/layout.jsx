import React, { useState } from 'react'
import { Layout as AntdLayout, Menu } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { IoIosNotifications } from 'react-icons/io'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { menuList } from '../utils/data'

const { Header, Sider, Content } = AntdLayout

const Layout = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <AntdLayout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <h2 className="logo text-white fs-5 text-center py-3 mb-0">Painel</h2>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => navigate(key)}
          items={menuList}
        />
      </Sider>

      <AntdLayout>
        <Header
          className="d-flex justify-content-between gap-4 align-items-center ps-1 pe-5"
          style={{ padding: 0, backgroundColor: '#131921' }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger text-white',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative" role="button">
              <IoIosNotifications className="fs-4 text-white" />
              <span className="badge bg-primary rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

            <div className="dropdown">
              <div
                className="d-flex gap-3 align-items-center"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  width={32}
                  height={32}
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt=""
                  className="rounded-circle"
                />
                <div className="d-none d-sm-block">
                  <h5 className="mb-0 text-white">John Doe</h5>
                  <p className="mb-0 text-white">johndoe@email.com</p>
                </div>
              </div>
              <div
                className="dropdown-menu"
                aria-labelledby="#dropdownMenuLink"
                style={{ backgroundColor: '#131921' }}
              >
                <Link
                  to="/"
                  className="dropdown-item py-1 mb-1 text-white"
                  style={{ height: 'auto', lineHeight: '20px' }}
                >
                  Perfil
                </Link>
                <Link
                  to="/"
                  className="dropdown-item py-1 mb-1 text-white"
                  style={{ height: 'auto', lineHeight: '20px' }}
                >
                  Sair
                </Link>
              </div>
            </div>
          </div>
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            backgroundColor: '#fff',
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </AntdLayout>
    </AntdLayout>
  )
}

export default Layout
