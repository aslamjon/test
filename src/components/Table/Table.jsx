import React from 'react'
import { Table, Tag, Space, Input } from 'antd';
import styled from 'styled-components';
import { AudioOutlined } from '@ant-design/icons';
import { searchProducts } from '../../redux/products/products.action';
import { connect } from 'react-redux';


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
const TableComponent = ({dataSource, columns, SearchProducts}) => {
    const { Search } = Input;

    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );

    const onSearch = value => SearchProducts(value);
    return (
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
    )
}

const mapDispathToProps = dispatch => ({
    SearchProducts: value => dispatch(searchProducts(value)),
})

export default connect(null, mapDispathToProps)(TableComponent);
