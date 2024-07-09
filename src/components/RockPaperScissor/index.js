import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {RiCloseLine} from 'react-icons/ri'

import ChoiceItem from '../ChoiceItem'
import './index.css'

const gameStatusConstants = {
  inProgress: 'IN_PROGRESS',
  win: 'WIN',
  lost: 'LOST',
  draw: 'DRAW',
}

class RockPaperScissor extends Component {
  state = {
    score: 0,
    gameStatus: gameStatusConstants.inProgress,
    userChoice: '',
    opponentChoice: '',
  }

  getOpponentChoice = () => {
    const {choicesList} = this.props
    const randomIndex = Math.floor(Math.random() * 3)
    const result = choicesList[randomIndex].id

    return result
  }

  onClickUserChoice = id => {
    const opponentChoice = this.getOpponentChoice()
    this.setState({userChoice: id, opponentChoice}, this.getGameResults)
  }

  getGameResults = () => {
    const {userChoice, opponentChoice} = this.state

    if (userChoice === opponentChoice) {
      this.setState({gameStatus: gameStatusConstants.draw})
    } else if (userChoice === 'ROCK') {
      if (opponentChoice === 'SCISSORS') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.lost,
          score: prevState.score - 1,
        }))
      }
    } else if (userChoice === 'PAPER') {
      if (opponentChoice === 'ROCK') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.lost,
          score: prevState.score - 1,
        }))
      }
    } else if (userChoice === 'SCISSORS') {
      if (opponentChoice === 'PAPER') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.lost,
          score: prevState.score - 1,
        }))
      }
    }
  }

  renderGameInProgressView = () => {
    const {choicesList} = this.props
    return (
      <ul className="choice-list">
        {choicesList.map(eachItem => (
          <ChoiceItem
            eachItem={eachItem}
            key={eachItem.id}
            onClickUserChoice={this.onClickUserChoice}
          />
        ))}
      </ul>
    )
  }

  onClickPlayAgain = () => {
    this.setState({gameStatus: gameStatusConstants.inProgress})
  }

  renderGameWinView = () => {
    const {choicesList} = this.props
    const {userChoice, opponentChoice} = this.state

    const getUserChoice = choicesList.filter(choice => choice.id === userChoice)
    const userResult = getUserChoice[0].imageUrl

    const getOpponentChoice = choicesList.filter(
      choice => choice.id === opponentChoice,
    )

    const opponentResult = getOpponentChoice[0].imageUrl

    return (
      <div className="status-container">
        <div className="game-status-container">
          <div className="user-choice-container">
            <h1 className="user">YOU</h1>
            <img src={userResult} alt="your choice" className="result-img" />
          </div>
          <div className="opponent-choice-container">
            <h1 className="opponent">OPPONENT</h1>
            <img
              src={opponentResult}
              alt="opponent choice"
              className="result-img"
            />
          </div>
        </div>
        <p className="result">YOU WON</p>
        <button
          type="button"
          className="play-button"
          onClick={this.onClickPlayAgain}
        >
          PLAY AGAIN
        </button>
      </div>
    )
  }

  renderGameLostView = () => {
    const {choicesList} = this.props
    const {userChoice, opponentChoice} = this.state

    const getUserChoice = choicesList.filter(choice => choice.id === userChoice)
    const userResult = getUserChoice[0].imageUrl

    const getOpponentChoice = choicesList.filter(
      choice => choice.id === opponentChoice,
    )

    const opponentResult = getOpponentChoice[0].imageUrl

    return (
      <div className="status-container">
        <div className="game-status-container">
          <div className="user-choice-container">
            <h1 className="user">YOU</h1>
            <img src={userResult} alt="your choice" className="result-img" />
          </div>
          <div className="opponent-choice-container">
            <h1 className="opponent">OPPONENT</h1>
            <img
              src={opponentResult}
              alt="opponent choice"
              className="result-img"
            />
          </div>
        </div>
        <p className="result">YOU LOSE</p>
        <button
          type="button"
          className="play-button"
          onClick={this.onClickPlayAgain}
        >
          PLAY AGAIN
        </button>
      </div>
    )
  }

  renderGameDrawView = () => {
    const {choicesList} = this.props
    const {userChoice, opponentChoice} = this.state

    const getUserChoice = choicesList.filter(choice => choice.id === userChoice)
    const userResult = getUserChoice[0].imageUrl

    const getOpponentChoice = choicesList.filter(
      choice => choice.id === opponentChoice,
    )

    const opponentResult = getOpponentChoice[0].imageUrl

    return (
      <div className="status-container">
        <div className="game-status-container">
          <div className="user-choice-container">
            <h1 className="user">YOU</h1>
            <img src={userResult} alt="your choice" className="result-img" />
          </div>
          <div className="opponent-choice-container">
            <h1 className="opponent">OPPONENT</h1>
            <img
              src={opponentResult}
              alt="opponent choice"
              className="result-img"
            />
          </div>
        </div>
        <p className="result">IT IS DRAW</p>
        <button
          type="button"
          className="play-button"
          onClick={this.onClickPlayAgain}
        >
          PLAY AGAIN
        </button>
      </div>
    )
  }

  renderGameDetailsView = () => {
    const {gameStatus} = this.state

    switch (gameStatus) {
      case gameStatusConstants.inProgress:
        return this.renderGameInProgressView()
      case gameStatusConstants.win:
        return this.renderGameWinView()
      case gameStatusConstants.lost:
        return this.renderGameLostView()
      case gameStatusConstants.draw:
        return this.renderGameDrawView()
      default:
        return null
    }
  }

  render() {
    const {score} = this.state

    return (
      <div className="app-container">
        <div className="header-container">
          <div className="options-container">
            <h1 className="option-name">
              ROCK <br /> PAPER <br /> SCISSORS
            </h1>
          </div>
          <div className="score-container">
            <p className="score-title">Score</p>
            <p className="score">{score}</p>
          </div>
        </div>
        {this.renderGameDetailsView()}
        <Popup
          modal
          trigger={
            <button type="button" className="popup-button">
              RULES
            </button>
          }
        >
          {close => (
            <div className="popup-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
                className="rules-img"
              />
              <button
                type="button"
                className="close-button"
                aria-label="closeButton"
                onClick={() => close()}
              >
                <RiCloseLine className="close-icon" />
              </button>
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default RockPaperScissor
