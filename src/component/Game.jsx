import React, { Component } from 'react'

import './Game.css'

const strategy = { "rock": "paper", "paper": "scissor", "scissor": "rock" }

const weapons = ["rock", "paper", "scissor"];
const mode = ["Human", "Computer", "Tactic"]
class Game extends Component {

    constructor() {
        super()
        this.state = {
            player1: {
                Type: "",
                score: 0,
                weapon: null
            },
            player2: {
                Type: "",
                score: 0,
                weapon: null
            },
            disableMode: false,
            game: 1,
            winner: {
                1: null,
                2: null,
                3: null
            }
        }
    }

    // select for player 1
    selectModePlayer1 = (event) => {
        const value = event.target.value;

        this.setState(prevState => ({
            player1: {
                ...prevState.player1,
                Type: value
            }
        }))
    }


    // select for player 2
    selectModePlayer2 = (event) => {
        const value = event.target.value;

        this.setState(prevState => ({
            player2: {
                ...prevState.player2,
                Type: value
            }
        }))
    }

    // game begins
    startGame = async () => {

        const game = this.state.game;
        console.log("game ", game);
        // tactical player 1
        if (this.state.player1.Type.toLocaleLowerCase() === "tactic") {

            if (game === 1) {
                const weapon = weapons[Math.floor(Math.random() * weapons.length)]
                await this.setState(prevState => ({
                    player1: {
                        ...prevState.player1,
                        weapon
                    }
                }));
            } else {
                await this.setState(prevState => ({
                    player1: {
                        ...prevState.player1,
                        weapon: strategy[prevState.player1.weapon]
                    }
                }));

            }
        }

        // tactical player 2
        if (this.state.player2.Type.toLocaleLowerCase() === "tactic") {
            if (game === 1) {
                const weapon = weapons[Math.floor(Math.random() * weapons.length)]
                await this.setState(prevState => ({
                    player2: {
                        ...prevState.player2,
                        weapon
                    }
                }));
            } else {
                console.log(strategy[this.state.player2.weapon]);
                await this.setState(prevState => ({
                    player2: {
                        ...prevState.player2,
                        weapon: strategy[prevState.player2.weapon]
                    }
                }));

            }
        }

        // human condition
        if (this.state.player1.Type.toLocaleLowerCase() === "human" && this.state.player1.weapon === null) {
            alert("pick the choice before start the game");
            return null;
        }
        if (this.state.player2.Type.toLocaleLowerCase() === "human" && this.state.player2.weapon === null) {
            alert("pick the choice before start the game");
            return null;
        }

        // player 1 is computer
        if (this.state.player1.Type.toLocaleLowerCase() === "computer") {
            const weapon = weapons[Math.floor(Math.random() * weapons.length)]
            await this.setState(prevState => ({
                player1: {
                    ...prevState.player1,
                    weapon
                }
            }));

        }
        if (this.state.player2.Type.toLocaleLowerCase() === "computer") {
            const weapon = weapons[Math.floor(Math.random() * weapons.length)]
            await this.setState(prevState => ({
                player2: {
                    ...prevState.player2,
                    weapon
                }
            }));

        }
        this.setState({ disableMode: true });
        let winningStatus = await this.gameStatus()

        await this.setState(prevState => ({
            winner: {
                ...prevState.winner,
                [`${game}`]: winningStatus
            }
        }))

        // to end the game
        if (this.state.game === 4) {
            this.setState({
                player1: {
                    Type: "",
                    score: 0,
                    weapon: null
                },
                player2: {
                    Type: "",
                    score: 0,
                    weapon: null
                },
                disableMode: false,
                game: 1,
                winner: {
                    1: null,
                    2: null,
                    3: null,
                }
            })

            return;
        }
        //check the game iteration
        await this.setState(prevState => ({
            game: prevState.game + 1
        }), () => console.log(this.state));

    }

    async gameStatus() {
        const { player1, player2 } = this.state;
        let winningStatus = null
        if (player1.weapon === player2.weapon) {
            console.log("inside tie :", this.state)
            console.log("Oops it's a Tie!");
            winningStatus = "tie"
        } else if (
            (player1.weapon === "rock" && player2.weapon === "scissor") ||
            (player1.weapon === "scissor" && player2.weapon === "paper") ||
            (player1.weapon === "paper" && player2.weapon === "rock")
        ) {
            winningStatus = "player1 wins"
            console.log(winningStatus)
            this.setState(prevState => ({
                player1: {
                    ...prevState.player1,
                    score: prevState.player1.score + 1
                }
            }));
            console.log("Player One Wins!");
        } else {
            console.log("Player two Wins!");
            winningStatus = "player2 wins"
            this.setState(prevState => ({
                player2: {
                    ...prevState.player2,
                    score: prevState.player2.score + 1
                }
            }));
        }

        return winningStatus;
    }

    // player 1 for human
    player1Human = (event) => {
        const weapon = event.target.alt;
        this.setState(prevState => ({
            player1: {
                ...prevState.player1,
                weapon
            }
        }))
    }

    // player 2 for human
    player2Human = (event) => {
        const weapon = event.target.alt;
        this.setState(prevState => ({
            player2: {
                ...prevState.player2,
                weapon
            }
        }))
    }


    render() {
        const disable = (this.state.player1.Type === "" || this.state.player2.Type === "") ? true : false;

        return (
            <div className="overflow-hidden game-wrapper">
                <h4 className="text-center title">Game</h4>
                <div className="col-sm-4 float-left player-1">
                    <h6>Player 1</h6>
                    <div className="form-group">
                        <select name="" id="" className="form-control" onChange={this.selectModePlayer1} value={this.state.player1.Type} disabled={this.state.disableMode}>
                            <option value="">Select mode</option>
                            {mode.map(mode => {
                                return (<option value={mode}>{mode}</option>)
                            })}
                        </select>
                    </div>
                    {this.state.player1.Type.toLocaleLowerCase() === "human" ?
                        <div className="humanMode-options" >
                            <a onClick={this.player1Human} ><img src="../assets/rock.png" alt="rock" /></a>
                            <a onClick={this.player1Human}><img src="../assets/scissor.png" alt="scissor" /></a>
                            <a onClick={this.player1Human}><img src="../assets/paper.png" alt="paper" /></a>
                        </div> : null
                    }

                    {/* show the image */}
                    {this.state.player1.weapon ?
                        <div className="show-weapon">
                            <img src={this.state.player1.weapon === "rock" ? "../assets/rock.png" : this.state.player1.weapon === "scissor" ? "../assets/scissor.png" : "../assets/paper.png"} alt="" />
                        </div>
                        : null}
                </div>

                <div className="col-sm-4 float-left text-center pt-4">
                    <div >
                        <button className="btn btn-info" onClick={this.startGame} disabled={disable}>{this.state.game > 3 ? "Restart" : "Start"}</button>
                    </div>
                    <h5 className="d-block"> Tournament {this.state.game > 3 ? "End" : this.state.game}</h5>
                    {this.state.winner[1] !== null ? <p className="mb-0">Tournament 1 : <span>{this.state.winner[1]}</span></p> : null}
                    {this.state.winner[2] !== null ? <p className="mb-0">Tournament 2 : <span>{this.state.winner[2]}</span></p> : null}
                    {this.state.winner[3] !== null ? <p className="mb-0">Tournament 3 : <span>{this.state.winner[3]}</span></p> : null}

                    {/* show the result */}
                    {this.state.game > 3 ?
                        <div className="show-result">
                            <div className="overflow-hidden">
                                <div className="w-50 float-left score">
                                    <h5>player1</h5>
                                    <p>{this.state.player1.score}</p>
                                </div>
                                <div className="w-50 float-left score">
                                    <h5>player2</h5>
                                    <p>{this.state.player2.score}</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="winner">{this.state.player1.score === this.state.player2.score ? "oops! its a tie" :
                                    this.state.player1.score > this.state.player2.score ? "Winner!! Player 1" : "Winner!! Player2"}</h4>
                            </div>
                        </div> : null
                    }
                </div>
                <div className="col-sm-4 float-left Player 2">
                    <h6>Player 2</h6>
                    <div className="form-group">
                        <select name="" id="" className="form-control" value={this.state.player2.Type} onChange={this.selectModePlayer2} disabled={this.state.disableMode}>
                            <option value="">Select mode</option>
                            {mode.map(mode => {
                                return (<option value={mode}>{mode}</option>)
                            })}
                        </select>
                    </div>
                    {this.state.player2.Type.toLocaleLowerCase() === "human" ?
                        <div className="humanMode-options" >
                            <a onClick={this.player2Human} ><img src="../assets/rock.png" alt="rock" /></a>
                            <a onClick={this.player2Human}><img src="../assets/scissor.png" alt="scissor" /></a>
                            <a onClick={this.player2Human}><img src="../assets/paper.png" alt="paper" /></a>
                        </div> : null
                    }

                    {/* show the image */}
                    {this.state.player2.weapon ?
                        <div className="show-weapon">
                            <img className="" src={this.state.player2.weapon === "rock" ? "../assets/rock.png" : this.state.player2.weapon === "scissor" ? "../assets/scissor.png" : "../assets/paper.png"} alt="" />
                        </div>
                        : null}
                </div>
            </div>
        )
    }

}


export default Game;