import React from 'react'
import { Switch, Route } from 'react-router-dom'
import OrderForm from './components/OrderForm'
import OrderConfirmation from './components/OrderConfirmation'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const orderItems = [
{ item: '', qty: '', unit: 'lb(s)',price: '0.00' },

]
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={OrderForm}/>
      <Route path='/confirm/:number' component={OrderConfirmation}/>
    </Switch>
  </main>
)

export default Main
