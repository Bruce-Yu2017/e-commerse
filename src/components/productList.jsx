import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllProducts } from '../actions/action'
import ProductItem from './productItem';

const ProductList = (props) => {
    useEffect(() => {
        console.log(props)
        getProduct();
    }, [])

    const getProduct = () => {
        props.getAllProducts();
    }

    const renderLists = () => {
        return props.state.map((item, index) => {
            return (
                <ProductItem productInfo={item} key={item.id}/>
            )
        })
    }
    if(props.state.length === 0) {
        return <div>Loading</div>
    }
    return (
        <div className='row py-5 mx-auto'>
            {renderLists()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {state: state.productState};
}
export default connect(mapStateToProps, { getAllProducts })(ProductList);