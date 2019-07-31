import React, { Component } from 'react';
import logo from './logo.svg';
import './OrderForm.css';
import DatePicker from "react-datepicker";
import { Switch, Route } from 'react-router-dom'

import DeleteIcon from "@material-ui/icons/Delete";
import AddBoxIcon from "@material-ui/icons/AddBox";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import diningmenu from './dining-menu.json';
import PhoneInput from 'react-phone-number-input/basic-input';
const orderItemsData = [
{ item: '', qty: '', unit: 'lb(s)',price: '0.00' },

]
class OrderForm extends React.Component {
  diningmenu = {};
  constructor() {
    super();
    this.state = {
      phone: '',
      pickupDate: '',
      orderItems: orderItemsData,
      orderStatus:'',
      orderNumber:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);

  }


  handleSubmit = async (event) => {
      event.preventDefault();
      var orderJson = {};
      orderJson["phone"] = this.state.phone;
      orderJson["PickupDate"] = this.state.pickupDate;
      orderJson["itemTotal"] = "9847896080";
      orderJson["items"] = this.state.orderItems.map((row, index) =>
        {
            var orderItem = {};
            orderItem["item"] = this.state.orderItems[index].item;
            orderItem["qty"] = this.state.orderItems[index].qty;
            orderItem["unit"] = this.state.orderItems[index].unit;
            orderItem["price"] = this.state.orderItems[index].price;
            return (orderItem)
        });

        try {
          console.log('Before API calls');
          const response = await axios
          .post('/dev/order', JSON.stringify(orderJson),
            {
              headers: {
                      'Content-Type': 'application/json'
                    }
           });
           console.log('After API calls'+JSON.stringify(response));
           if(response["data"].statusCode == 200)
           {
             this.setState({orderStatus: 'submitted'});
             this.setState({orderNumber: '10101'});
             this.props.history.push('/confirm/200');
           }

        } catch (e) {

        } finally {

        }




}
  onChange = pickupDate => this.setState({ pickupDate })

  handlePhoneChange(event) {
    this.setState({phone: event.target.value});
  }

  addButtonIcon(props) {
    const index = props.index;
    const len = props.len;
    if (index == len-1)
    {
      return (
        <AddBoxIcon onClick={props.onClick}/>

      );
    }else {
      return (
        <DeleteIcon onClick={props.onClick}/>
      );
    }

  }
  handleAddDeleteRow(index) {
    if (index == this.state.orderItems.length-1)
    {
      var row = { item: '', qty: '', unit: 'lb(s)',price: '0.00' };
      this.setState(prevState => ({ orderItems: [...prevState.orderItems, row]}));
    }else {
      this.setState(prevState => ({ orderItems: prevState.orderItems.filter((_, i) => i !== index) }));

    }
  }
getMenuOptions(menutype)
{

  var options = [];
  diningmenu.alacarte.map((row, index) => {
        options.push( <option value={row.name}>{row.name}</option>);
  });



  return(options);
}
  handleChange(index, dataType, value)
  {
    const newState = this.state.orderItems.map((item, i) =>
    {
      if (i == index) {
        return {...item, [dataType]: value};
      }
      return item;
    });
    newState.map((item, i) =>
    {
      /* Find entry from diningmenu for corresponding item */
      var entry = diningmenu.alacarte.find(entry => { return (entry.name == item.item) });
      item.unit = entry.unit;
      if ( typeof(item.qty) != "undefined" && !isNaN(parseFloat(item.qty)))
        item.price = String(parseFloat(entry.priceperunit)*parseFloat(item.qty));
      else {
        item.price = "0.0";
      }

    });


    newState.map((item, i) =>
    {
      /* Find entry from diningmenu for corresponding item */
      var entry = diningmenu.alacarte.find(entry => { return (entry.name == item.item) });
      item.unit = entry.unit;

    });

    this.setState({
       orderItems: newState
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="contact-pickup">
        <label>
          Phone:&nbsp;
          <PhoneInput onChange={phone => this.setState({ phone })}  value={this.state.phone ? this.state.phone : null } hintText="Phone to reach" />
          &nbsp;&nbsp;
        </label>
        <label>
          Pickup Date:&nbsp;
          <DatePicker  onChange={this.onChange}  value ={this.state.pickupDate ? this.state.pickupDate.toString() : null } hintText="Pickup date" />
        </label>
        </div>
        <div >
        <table className="order-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Price</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {this.state.orderItems.map((row, index) => {
                    return (
                        <tr>

                            <td>
                              <select onChange={(e) => this.handleChange(index, 'item', e.target.value)}
                                     type='text'
                                     className='form-control'
                                     value={this.state.orderItems[index].item}>
                                        <this.getMenuOptions/>
                              </select>
                            </td>
                            <td>
                              <input onChange={(e) => this.handleChange(index, 'qty', e.target.value)}
                                     type='number'
                                     className='form-control'
                                     value={this.state.orderItems[index].qty}/>
                            </td>
                            <td>
                              <input readOnly
                                     type='text'
                                     className='form-control'
                                     placeholder='Lb(s)'
                                     value={this.state.orderItems[index].unit} />
                            </td>
                            <td>
                              <input readOnly
                                     type='text'
                                     className='form-control'
                                     value={this.state.orderItems[index].price} />
                            </td>
                            <td>
                                  <this.addButtonIcon index={index} len={this.state.orderItems.length} onClick={(e) => this.handleAddDeleteRow(index)}/>
                            </td>

                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
        <div className="submit-area">
          <input type="submit" value="Submit" className="submit-button" />
        </div>
        </form>
    );
  }
}








export default OrderForm;
