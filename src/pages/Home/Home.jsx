import React from 'react'
import axios from 'axios';
import { orderBy } from 'lodash'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ToastContainer, toast } from 'react-toastify';

import Table from '../../components/Table';
import { ProductsSelector, SearchProductSelector } from '../../redux/products/products.selector';
import { setProducts } from '../../redux/products/products.action';

const columns = [
    {
        key: 'key',
        title: '№',
        dataIndex: 'key',
    },
    {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        sortDirections: ['ascend'],
        render: name => orderBy(name, ['name'], ['asc'])
    },
    {
        title: 'Sell Price',
        dataIndex: 'sellPrice',
        key: 'sellPrice',
    },
    {
        title: 'Count',
        dataIndex: 'count',
        key: 'count',
    },
];

let dataSource = false;
const Home = ({ token, ProductsSelector, SetProducts }) => {
    const notify = () => {
        toast.error("Error: Server Error !", {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    // get Product from API
    const getProduct = () => {
        const url = 'https://face.ox-sys.com/variations'
        const params = JSON.stringify({
            size: 286,
            page: 1,
            stock: {
                exist: true,
                location: [
                    42
                ]
            },
        })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        axios.post(url, params, config)
            .then(res => {
                SetProducts(res.data.items)
                return res
            }).catch(err => notify())
    }
    const DataToTable = () => {
        ProductsSelector && ProductsSelector.map((val, index) => dataSource.push({
            key: index+1,
            name: val.name,
            sellPrice: val.stocks[0].sellPrice.UZS + " UZS",
            count: val.stocks[0].count
        }))
    }
    dataSource = [];
    if (!dataSource) {
        getProduct();
        DataToTable()
    }
    // data for test
    let dataSource1 = [
        {
            key: 1,
            name: "Olma",
            count: 1,
            sellPrice: 100
        },
        {
            key: 2,
            name: "Nok",
            count: 2,
            sellPrice: 100
        },
        {
            key: 3,
            name: "Banan",
            count: 4,
            sellPrice: 100
        },
        {
            key: 4,
            name: "Ananas",
            count: 4,
            sellPrice: 100
        },
        {
            key: 5,
            name: "Olcha",
            count: 5,
            sellPrice: 100
        },
        {
            key: 6,
            name: "Anor",
            count: 6,
            sellPrice: 100
        }
    ]

    return (
        <>
            <ToastContainer />
            <Table ProductsSelector={ProductsSelector} dataSource={dataSource} columns={columns}
                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }} />
        </>
    )
}
const mapStateToProps = createStructuredSelector({
    ProductsSelector,
    SearchProduct: SearchProductSelector,
})

const mapDispathToProps = dispatch => ({
    SetProducts: value => dispatch(setProducts(value)),
})

export default connect(mapStateToProps, mapDispathToProps)(Home);

