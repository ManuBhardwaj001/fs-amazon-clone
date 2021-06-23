import { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Home from './home/Home'
import Checkout from './checkout/Checkout';
import Login from './login/Login';
import Payment from './checkout/Payment';

const promise = loadStripe('pk_test_51J5T7DSIJRW4yvGotVaPhctWXJjjwttRHXMMPaY2gXQYJ7DZ4Hnl7ah6F3AEn0VaM8JkskSlonf3qq0588tDVDmc000if6ulrD');

function App() {

  // eslint-disable-next-line
  const [{ cart, user }, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>> ', authUser)

      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
    // eslint-disable-next-line
  }, [])
  return (
    <BrowserRouter>
      <div className="app">

        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Checkout />
          </Route>

          <Route path="/payment">
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
