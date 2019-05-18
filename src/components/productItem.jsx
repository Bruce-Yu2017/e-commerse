import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { connect } from 'react-redux';
import { getBuyerInfo, updateCart } from '../actions/action';

const ProductItem = props => {
  const { img, price, title, id } = props.productInfo;
  const [modalState, setModalState] = useState(false);
  const [cartState, setCartState] = useState('');
  const user = JSON.parse(localStorage.getItem("user"));

  const saveToCart = (productId) => {
    let buyer = props.buyerState;
    if(buyer.cart) {
      if(buyer.cart[productId]) {
        setCartState('already_in_cart');
      }
      else {
        let updatedCart = {...buyer.cart, ...{[productId]: {name: title, qty: 1, img: img, price: price}}};
        props.updateCart(user.id, updatedCart);
        setCartState('new_added');
      }
    }
    else {
      let updatedCart = {[productId]:{name: title, qty: 1, img: img, price: price}};
      props.updateCart(user.id, updatedCart);
      setCartState('new_added');
    }
    
    setModalState(true);
  }

  const closeModal = () => {
    setModalState(false);
  }

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
        <i className="fas fa-2x fa-cart-plus shoping-cart pr-1 mb-1" onClick={() => saveToCart(id)}/>
        <div className="card-bottom">
          <Link to={`/detail/${id}`}>
            <span className="float-left">{title}</span>
          </Link>
          <span className="float-right">${price}</span>
        </div>
      </div>
      <Modal show={modalState} onHide={() => closeModal()}>
        <Modal.Header closeButton>
          {cartState === "already_in_cart" && <Modal.Title>
            <b className='product-title-in-modal'>{title}</b> 
            <br/>
            already in cart.
          </Modal.Title>}
          {cartState === "new_added" && <Modal.Title>
            <b className='product-title-in-modal'>{title}</b> 
            <br/>
            has been added to cart.
          </Modal.Title>}
        </Modal.Header>
        <div className='mx-auto'>
          <Image src={require(`./img/${img.slice(4)}`)} rounded className='modal-img' />
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeModal()}>
            Continue Shopping
          </Button>
          <Button variant="primary" onClick={() => closeModal()}>
            Go to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    buyerState: state.buyerState
  };
}

export default connect(mapStateToProps, { getBuyerInfo, updateCart })(ProductItem);
