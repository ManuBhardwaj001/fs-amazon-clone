import React from 'react'
import './CartItem.css'
import { useStateValue } from '../StateProvider'
import CurrFormat from '../CurrFormat';
import { REMOVE_FROM_CART } from '../actionsList'

function CartItem({ id, title, image, price, rating, hideButtons }) {

  // eslint-disable-next-line
  const [{ cart }, dispatch] = useStateValue();

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      id: id,
    })
  }

  return (
    <div className="cartItem">
      <img
        className="cartItem__left"
        src={image}
        alt="Cart item"
      />
      <div className="cartItem__middle">
        <p className="cartItem__title">{title}</p>

        <div className="cartItem__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))
          }
        </div>

        {!hideButtons && (
          <>
            <div className="cartItem__giftOption">
              <input type="checkbox" />
              <small>&nbsp; This will be a gift</small>
            </div>

            <button
              className="am-yellow-button cartItem__deleteButton"
              onClick={removeFromCart}>
              Remove from Cart
            </button>
          </>
        )}
      </div>

      <div className="cartItem__right">
        <p>
          <small>₹</small>
          <strong>
            <CurrFormat price={price} />
          </strong>
        </p>
      </div>
    </div>
  )
}

export default CartItem