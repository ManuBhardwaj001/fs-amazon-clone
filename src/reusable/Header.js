import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';

function Header() {
  const [{ cart, user }] = useStateValue()

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  }

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon logo"
        />
      </Link>

      <div className="header__search">
        <input
          className="header__searchInput" type="text"
        />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">

        <Link to={!user && "/login"}>
          <div
          className="header__option"
          onClick={handleAuth}>
            <span className="header__optionLineOne">Hello Guest</span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout" className="header__optionBasket header__option">
          <div className="header__optionBasketVisual">
            <ShoppingCartOutlinedIcon className="header__cartIcon" />
            <span className="header__optionLineTwo header__basketCount">{cart?.length}</span>
          </div>
          <span>&nbsp;Cart</span>
        </Link>

      </div>

    </div>
  )
}

export default Header