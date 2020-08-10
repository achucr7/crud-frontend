import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    name: '',
    opening_sales: 0,
    closing_sales: 0,
   
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:8090/rep/addrep', {
      method: 'post',
      headers: {
        "Access-Control-Allow-Origin":"*",
       "Access-Control-Allow-Methods": "HEAD, GET, POST, PUT, PATCH, DELETE",
       "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "X-Auth-Token,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        opening_sales: this.state.opening_sales,
        closing_sales: this.state.closing_sales
        
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:8090/rep/updaterep', {
      method: 'put',
      headers: {
        "Access-Control-Allow-Origin":"*",
       "Access-Control-Allow-Methods": "HEAD, GET, POST, PUT, PATCH, DELETE",
       "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "X-Auth-Token,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        opening_sales: this.state.opening_sales,
        closing_sales: this.state.closing_sales
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id,name,opening_sales,closing_sales } = this.props.item
      this.setState({ id,name,opening_sales,closing_sales })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="first" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
        </FormGroup>
        
        <FormGroup>
          <Label for="opening_sales">Opening Sales</Label>
          <Input type="text" name="opening_sales" id="email" onChange={this.onChange} value={this.state.opening_sales === null ? '' : this.state.opening_sales}  />
        </FormGroup>
        
        <FormGroup>
          <Label for="closing_sales">Closing Sales</Label>
          <Input type="text" name="closing_sales" id="email" onChange={this.onChange} value={this.state.closing_sales === null ? '' : this.state.closing_sales}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm