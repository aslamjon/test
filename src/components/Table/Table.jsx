import React from 'react'
import { Table, Spin, Space, Input } from 'antd';
import styled from 'styled-components';
import { searchProducts } from '../../redux/products/products.action';
import { connect } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons'

const SearchBoxStyled = styled.div`
    padding: 15px;
    div {
        width: 300px;
    }
`;
const TableStyled = styled.div`
    ul {
        padding: 0 15px;
    }
`;
const SpinerBoxStyled = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        margin: 10px;
    }
`;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const TableComponent = ({dataSource, columns, SearchProducts, ProductsSelector}) => {
    const { Search } = Input;

    const onSearch = value => SearchProducts(value);
    return (
        <>
            {!ProductsSelector ? 
                <SpinerBoxStyled>
                    <Spin indicator={antIcon} />
                    Loading...
                </SpinerBoxStyled> 
                : 
                <>
                    <SearchBoxStyled>
                        <Space direction="vertical">
                            <Search placeholder="input search text" onSearch={onSearch} enterButton />
                        </Space>
                    </SearchBoxStyled>
                    <TableStyled>
                        <Table dataSource={dataSource} columns={columns} />
                    </TableStyled>
                </>
            }
        </>
    )
}

const mapDispathToProps = dispatch => ({
    SearchProducts: value => dispatch(searchProducts(value)),
})

export default connect(null, mapDispathToProps)(TableComponent);
