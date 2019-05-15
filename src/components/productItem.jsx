import React from "react";
import { Link } from 'react-router-dom'

const ProductItem = props => {
  const { img, price, title, id } = props.productInfo;
  return (
    <div className="col-lg-3 col-md-4 col-sm-12 mx-auto my-1">
      <div className="card addShadow">
        <div className="img-container p-4">
          <Link to={`/detail/${id}`}>
            <img
              src={require(`./img/${img.slice(4)}`)}
              alt=""
              className="card-img-top "
            />
          </Link>
        </div>
        <i className="fas fa-2x fa-cart-plus shoping-cart pr-1 mb-1" />
        <div className="card-bottom">
          <Link to={`/detail/${id}`}><span className="float-left">{title}</span></Link>
          <span className="float-right">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
