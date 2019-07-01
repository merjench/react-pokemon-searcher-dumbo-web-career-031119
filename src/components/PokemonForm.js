import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

 handleSubmit = (event) => {
   event.preventDefault();
   let form = document.querySelector('form')
   form.reset()
   fetch('http://localhost:3000/pokemon', {
     method: 'POST',
     headers:{
     "Accept": "application/json",
     "Content-Type": "application/json"
   },
     body: JSON.stringify({
       "height": 10,
       "weight": 130,
       "name": this.state.name,
       "abilities": ["overgrow", "chlorophyll"],
       "moves": [],
       "stats": [
         {
           "value": 80,
           "name": "special-defense"
         },
         {
           "value": 80,
           "name": "special-attack"
         },
         {
           "value": 63,
           "name": "defense"
         },
         {
           "value": 62,
           "name": "attack"
         },
         {
           "value": 60,
           "name": "speed"
         },
         {
           "value": this.state.hp,
           "name": "hp"
         }
       ],
       "types": ["grass", "poison"],
       "sprites": {
         "front": this.state.frontUrl,
         "back":
           this.state.backUrl
       }
     })
   })
     .then(res => res.json())
     .then(data => this.props.addPokemon(data))
 }

//on change eventListener on JSX
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={this.handleChange}/>
            <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={this.handleChange}/>
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" onChange={this.handleChange}/>
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" onChange={this.handleChange}/>
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
