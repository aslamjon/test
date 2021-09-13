import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


import Table from '../../components/Table';
import { ProductsSelector, SearchProductSelector } from '../../redux/products/products.selector';
import { setProducts } from '../../redux/products/products.action';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


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
    },
    {
        title: 'Description',
        dataIndex: 'des',
        key: 'des',
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
const Home = ({ token, ProductsSelector, SetProducts, SearchProduct }) => {
    
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
                console.log(res.data) 
                SetProducts(res.data.items)
                return res
            })
    }
    const DataToTable = () => {
        ProductsSelector && ProductsSelector.map((val, index) => dataSource.push({
            key: index+1,
            name: val.supplier,
            des: val.name,
            sellPrice: val.stocks[0].sellPrice.UZS + " UZS",
            count: val.stocks[0].count
        }))
    }
    if (!dataSource) {
        dataSource = [];
        getProduct();
        DataToTable()
    }
    if (SearchProduct === '') {
        dataSource = [];
        DataToTable()
    } else {
        dataSource = [];
        ProductsSelector.map((val, index) => {
            
            val.supplier.toLowerCase().includes(SearchProduct.toLowerCase()) && 
            dataSource.push({
                key: index+1,
                name: val.supplier,
                des: val.name,
                sellPrice: val.stocks[0].sellPrice.UZS + " UZS",
                count: val.stocks[0].count
            })
            dataSource.sort((a, b) => {
                console.log(a, b)
            })
        })
    }
    // useEffect(() => {
    //     console.log("ProductsSelector", ProductsSelector)
    // })

    return (
        <>
            {console.log('render')}
            <Table dataSource={dataSource} columns={columns}
                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }} />
        </>
    )
}
const mapStateToProps = createStructuredSelector({
    ProductsSelector,
    SearchProduct: SearchProductSelector
})

const mapDispathToProps = dispatch => ({
    SetProducts: value => dispatch(setProducts(value)),
})

export default connect(mapStateToProps, mapDispathToProps)(Home);

