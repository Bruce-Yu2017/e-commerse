import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getOneProduct, getBuyerInfo, updateCart } from "../actions/action";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Link } from "react-router-dom";
import history from '../history';

const ProductDetail = props => {
  const [totalPrice, setTotalPrice] = useState(null);
  const { productid } = props.match.params;
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    getPorductDetail(productid);
  }, []);

  useEffect(() => {
    if (props && props.detail) {
      setTotalPrice(props.detail.price);
    }
  }, [props]);

  useEffect(() => {
    if (!props.buyerState.id) {
      getBuyerInfo(user.id);
    }
  }, []);

  const getBuyerInfo = id => {
    props.getBuyerInfo(id);
  };

  const [qty, setQty] = useState(1);
  const [cartButton, setCartButton] = useState(false)

  const qtyOnchange = val => {
    setQty(val);
    setTotalPrice(val * props.detail.price);
    let cart = {...props.buyerState.cart};
    if(cart[productid] !== undefined) {
      let originalQty = cart[productid].qty;
      val !== originalQty ? setCartButton(true) : setCartButton(false);
    }
     
  };

  const getPorductDetail = id => {
    props.getOneProduct(id);
  };

  const addToCart = () => {
    let cart = JSON.parse(JSON.stringify(props.buyerState.cart));
    if(cart[productid]) {
      if(cart[productid].qty === qty) {
        history.push(`/productlist`);
      }
      else {
        cart[productid].qty = parseInt(qty);
        props.updateCart(user.id, cart, `/productlist`)
      }
    }
    else {
      let obj = {name: props.detail.title, qty: parseInt(qty), img: props.detail.img, price: props.detail.price};
      cart[productid] = obj;
      props.updateCart(user.id, cart, `/productlist`);
    }
  }

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
        <div className="row mb-4">
          <div className="col-md-6">
            <img
              src={require(`./img/${info.img.slice(4)}`)}
              alt=""
              className="card-img-top"
            />
          </div>

          <div className="col-md-6 mt-5">
            <h3>Company: {info.company}</h3>
            <h3>Price: ${totalPrice}</h3>
            <InputGroup className="mb-3" size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text>Qty</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="number"
                min={0}
                value={qty}
                onChange={e => {
                  qtyOnchange(e.target.value);
                }}
              />
            </InputGroup>
            <p>
              <b>Description</b>: {info.info}
            </p>
            <div>
              <Link to="/productlist">
                <button className="btn btn-lg btn-primary">
                  <i className="fas fa-arrow-left mr-1" />
                  Go Back
                </button>
              </Link>
              <button className="btn btn-lg btn-warning ml-3" onClick={() => addToCart()}>
                {cartButton && <>Update Cart</>}
                {!cartButton && <>Add To Cart</>}
                <i className="fas fa-cart-plus " />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <div>{renderProduct()}</div>;
};

const mapStateToProps = state => {
  return {
    detail: state.productState,
    buyerState: state.buyerState
  };
};

export default connect(
  mapStateToProps,
  { getOneProduct, getBuyerInfo, updateCart }
)(ProductDetail);
