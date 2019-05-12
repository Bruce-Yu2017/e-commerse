import React from 'react'

const ProductItem = (props) => {
    const {img} = props.productInfo;
    return (
        <div className='col-lg-3 col-md-4 col-sm-12 mx-auto my-1'>
            <div className="card addShadow">
                <div className="img-container p-5">
                    <img src={require(`./img/${img.slice(4)}`)} alt="" className='card-img-top ' />
                </div>
            </div>
        </div>
    )
}

export default ProductItem;