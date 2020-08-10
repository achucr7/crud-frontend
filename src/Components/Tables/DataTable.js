import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      const url = 'https://cors-anywhere.herokuapp.com/';
      fetch('http://localhost:8090/rep/deleterepbyid/', {
      method: 'delete',
      headers: {
        "Access-Control-Allow-Origin":"*",
       "Access-Control-Allow-Methods": "HEAD, GET, POST, PUT, PATCH, DELETE",
       "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "X-Auth-Token,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.name}</td>
          <td>{item.opening_sales}</td>
          <td>{item.closing_sales}</td>
         
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            
            <th>opening_sales</th>
            <th>closing_sales</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable