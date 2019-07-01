import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  state = {
    pokemon:[],
    // searchPokemon: "",
    filterTerm: "",
    // filterPokemon: []
    sortByName: false
  }

/////////----render all pokemon--------/////////////

 componentDidMount() {
   fetch("http://localhost:3000/pokemon")
   .then(response => response.json())
   .then(pokemons =>
     this.setState({
       pokemon: pokemons
     })
   )
 }

//-----one way to do it-----by putting pokemons inside another filter

 // handleSearch =(event) => {
 //   var pokeCopy = [...this.state.pokemon]
 //   var newPokeList = pokeCopy.filter(poke =>  {
 //     if (poke.name.includes(event.target.value)){
 //       return poke
 //     }
 //   })this.setState({
 //     filterPokemon: newPokeList
 //   })
 // }

//--------another way to filter search below-------//////////
 handleSearch = (event) => {
   this.setState({
     filterTerm: event.target.value
   })
 }

 applyFilter = () => {
   return this.state.pokemon.filter(pokemon => {
     if (pokemon.name.includes(this.state.filterTerm)) {
      return pokemon
     }
   })
 }

////-----------addPokemon & then push it into Pokemon Form------------/////////
 addPokemon = (newPokemon) => {
   // console.log(newPokemon)
   this.setState({
     pokemon: [newPokemon, ...this.state.pokemon]
   })
 }

  handleName = () => {
    this.setState({
      sortByName: !this.state.sortByName
    })
    this.state.sortByName ? this.state.pokemon.sort((a,b) => {
      return (a.name < b.name) ? 1 : -1
    }) : this.state.pokemon.sort((a,b) =>{
      retur (a.name > b.name) ? 1 : -1
    })
  }

  render() {
    // console.log(this.state.pokemon)
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={this.handleSearch} showNoResults={false} />
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
        <button onClick={this.handleName}> Sort Pokemons by Name </button>
        <br />
        <PokemonCollection pokemon={this.applyFilter()}/>
      </div>
    )
  }
}

export default PokemonPage
