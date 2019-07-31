import React from 'react'

const OrderConfirmation = (props) => (
  <div>
      <h2>Your order is received. Please note down order # for reference: {props.match.params.number}</h2>
      
  </div>
)

export default OrderConfirmation
