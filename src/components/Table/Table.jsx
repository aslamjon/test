import React, { useState } from 'react'
import { Table, Spin, Space, Input } from 'antd';
import styled from 'styled-components';

import { LoadingOutlined } from '@ant-design/icons'
import { orderBy, startsWith } from 'lodash';

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
const TableComponent = ({ dataSource, columns, ProductsSelector }) => {
    
    const { Search } = Input;

    const [SearchProduct, SetSearchProduct] = useState('');
    const [dataOrder, setDataOrder] = useState(false);

    const onSearch = value => SetSearchProduct(value);


    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
        if (sorter.order) setDataOrder(orderBy(extra.currentDataSource, ['name'], ['asc']));
        else setDataOrder(false)
    }
    // function for search input
    const filterData = (main) => {
        let newDataSource = [];
        let temp = [];
        main.map((val, index) => {
            if (val.name.toLowerCase().includes(SearchProduct.toLowerCase())) {
                if (startsWith(val.name.toLowerCase(), SearchProduct.toLowerCase()))
                    newDataSource.push({
                        key: index + 1,
                        name: val.name,
                        sellPrice: val.sellPrice,
                        count: val.count
                    })
                else 
                    temp.push({
                        key: index + 1,
                        name: val.name,
                        sellPrice: val.sellPrice,
                        count: val.count
                    })
            }
            return val
        })
        newDataSource.push(...temp)
        return newDataSource;
    }

    if (SearchProduct !== '' && !dataOrder)
        dataSource = filterData(dataSource)
    else if (SearchProduct !== '' && dataOrder)
        dataSource = filterData(dataOrder)
    
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
                        <Table dataSource={dataOrder ? dataOrder : dataSource} columns={columns} onChange={onChange} />
                    </TableStyled>
                </>
            }
        </>
    )
}



export default TableComponent;
