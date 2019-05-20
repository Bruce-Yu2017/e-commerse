import React from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { updateCart } from "../actions/action";
import JSONTree from "react-json-tree";
import PaypalBtn from "./PaypalExpressBtn";



const DeleteModal = props => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const deleteFromCart = productId => {
    console.log('productId: ', productId);
    console.log(user.id)
    let lines = JSON.parse(JSON.stringify(props.buyerState.cart));
    delete lines[productId];
    props.updateCart(user.id, lines);
    props.closeModalFunc();
  };

  const deleteAll = () => {
    props.updateCart(user.id, {});
    props.closeModalFunc();
  };
  const count = () => {
    if (props.json) {
      let countTotal = 0;
      for (let key in props.json) {
        countTotal += props.json[key].qty * props.json[key].price;
      }
      return (countTotal * 1.1).toFixed();
    }
  };

  const theme = {
    scheme: "monokai",
    author: "wimer hazenberg (http://www.monokai.nl)",
    base00: "#272822",
    base01: "#383830",
    base02: "#49483e",
    base03: "#75715e",
    base04: "#a59f85",
    base05: "#f8f8f2",
    base06: "#f5f4f1",
    base07: "#f9f8f5",
    base08: "#f92672",
    base09: "#fd971f",
    base0A: "#f4bf75",
    base0B: "#a6e22e",
    base0C: "#a1efe4",
    base0D: "#66d9ef",
    base0E: "#ae81ff",
    base0F: "#cc6633"
  };

  return (
    <div>
      {props.modalType === "one" && (
        <div>
          <Modal
            size="lg"
            show={props.modalState}
            onHide={() => props.closeModalFunc()}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Are you sure to delete{" "}
                <strong className="delete-product-name">
                  {props.selectedProduct.name}
                </strong>{" "}
                from cart?
              </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => props.closeModalFunc()}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => deleteFromCart(props.selectedProduct.id)}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
      {props.modalType === "all" && (
        <div>
          <Modal
            size="lg"
            show={props.modalState}
            onHide={() => props.closeModalFunc()}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Are you sure to delete all products from cart?
              </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => props.closeModalFunc()}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={() => deleteAll()}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
      {props.modalType === "result" && (
        <div>
          <Modal
            size="lg"
            show={props.modalState}
            onHide={() => props.closeModalFunc()}
          >
            <Modal.Header closeButton>
              <Modal.Title>Order Summary</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <JSONTree data={props.json} theme={theme} invertTheme={true} />
            </Modal.Body>
            <div className="foot">
              <div className="bottom">
                <h5>Total: ${count()}</h5>
                {/* <Button
                  variant="secondary"
                  onClick={() => props.closeModalFunc()}
                  className='mr-2'
                >
                  Cancel
                </Button> */}
                <PaypalBtn
                  total={parseInt(count())}
                  cancel={props.closeModalFunc}
                  clearCart={deleteAll}
                  toggleCancelAlert={props.toggleCancelAlert}
                  toggleSuccessAlert={props.toggleSuccessAlert}
                />
                {/* <Button variant="primary">Check Out</Button> */}
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    buyerState: state.buyerState
  };
};

export default connect(
  mapStateToProps,
  { updateCart }
)(DeleteModal);
