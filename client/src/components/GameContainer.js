import React, { Component } from 'react';
import {Container, Row} from 'react-bootstrap/lib';
import Game from './Game';
import games from './games';
import config  from '../utils/config';
import Sort from './../constants';
let { SERVER, ROUTES } = config;

class GameContainer extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            games: [],
            sortBy: this.props.sortBy
        }
    }

    componentDidMount(){
        //fetch all games and update state
        this.fetchGames();
        //this.setState({games})
    }

    fetchGames(){
        let url = SERVER.PROTOCOL + '://' + SERVER.HOST + ':' + SERVER.PORT + ROUTES.GET_GAMES;
        console.log(url)
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type' : 'application/json',
            }
        })
        .then((response) => response.json())
        .then((games) => {
          this.setState({games})
        })
        .catch((error) => {
          console.error(error);
        });
    }
    componentWillReceiveProps(nextProps){
        if(this.props.sortBy != nextProps.sortBy)
            this.setState({sortBy: nextProps.sortBy})
    }
    sort(games, sortBy){
        console.log(games);
        //sort descending order of votes
        switch(sortBy){
            case Sort.TOTAL_VOTES:
                return games.sort(function(a, b){return b.votes - a.votes})
                break;
            case Sort.TOTAL_VALUE:
                console.log("in switch total votes")
                return games.sort(function(a, b){return b.value - a.value})
                break;
            case Sort.RECENTLY_ADDED:
                return games.sort(function(a, b){return b.createdOn - a.createdOn})
                break;
            case Sort.EXPIRY:
                return games.sort(function(a, b){return a.expiresIn - b.expiresIn})
                break;
            default:
                return games.sort(function(a, b){return b.votes - a.votes})
                break;
            console.log("Sort : " + sortBy);
        }
        
    }
    render(){
        return(
           
            <Container>
                {
                 this.sort(this.state.games, this.state.sortBy).map((game, i) => <Game class="game-container" key={game['_id']} index={i+1} data={game} />)  
                }
               
            </Container>
         
        );
    }

}

export default GameContainer;