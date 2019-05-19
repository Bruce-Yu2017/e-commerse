import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllProducts, getBuyerInfo } from '../actions/action'
import ProductItem from './productItem';

const ProductList = (props) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    useEffect(() => {
        if(props.productListState.length === 0) {
            getProduct();
        }
    }, [])

    useEffect(() => {
        if(!props.buyerState.id) {
            getBuyerInfo(user.id);
        }
    }, [])

    const getProduct = () => {
        props.getAllProducts();
    }

    const getBuyerInfo = (id) => {
        props.getBuyerInfo(id)
    }

    const renderLists = () => {
        return props.productListState.map((item, index) => {
            return (
                <ProductItem productInfo={item} key={item.id}/>
            )
        })
    }
    if(!props.productListState) {
        
        return <div>Loading</div>
    }
    return (
        <div className='row py-5 mx-auto marginToNavBar container'>
            {renderLists()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        productListState: state.productListState,
        buyerState: state.buyerState
    };
}
export default connect(mapStateToProps, { getAllProducts, getBuyerInfo })(ProductList);