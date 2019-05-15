import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getOneProduct } from "../actions/action";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from 'react-bootstrap/FormControl'
import { Link } from 'react-router-dom';


const ProductDetail = props => {
  const { productid } = props.match.params;
  useEffect(() => {
    getPorductDetail(productid);
  }, [productid]);

  const [qty, setQty] = useState(1);
  const qtyOnchange = (val) => {
    setQty(val);
  }

  const getPorductDetail = id => {
    props.getOneProduct(id);
  };

  const renderProduct = () => {
    const info = props.detail;
    if (!info) {
      return (
        <div className="row">
          <h1 className="product-title">Loading....</h1>
        </div>
      );
    }
    return (
      <>
        <div className="row">
          <h1 className="product-title">{info.title}</h1>
        </div>
        <div className="row">
          <div className="col-md-6">
            <img
              src={require(`./img/${info.img.slice(4)}`)}
              alt=""
              className="card-img-top"
            />
          </div>

          <div className="col-md-6 mt-5">
            <h3>Company: {info.company}</h3>
            <h3>Price: ${info.price}</h3>
            <InputGroup className="mb-3" size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text>Qty</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl type='number' min={1} value={qty} onChange={(e) => {qtyOnchange(e.target.value)}} />
            </InputGroup>
            <h3>Description: {info.info}</h3>
            <div>
              <Link to='/productlist'><button className='btn btn-lg btn-primary'>Go Back</button></Link>
              <button className='btn btn-lg btn-warning ml-3'>Add To Cart</button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <div>{renderProduct()}</div>;
};

const mapStateToProps = state => {
  return { detail: state.productState };
};

export default connect(
  mapStateToProps,
  { getOneProduct }
)(ProductDetail);
