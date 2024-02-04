import React from 'react'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import Die from './Die'

export default function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  //Confetti Effect
  const { width, height } = useWindowSize()

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])
  
  function generateNewDie(){
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  function allNewDice(){
    const newDice = [];
    for (let i = 0; i < 10; i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }


  function rollDice(id){
    if (!tenzies){
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id){
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? 
        {...die, isHeld: !die.isHeld} :
        die
    }))
  }



  const diceElements = dice.map(die => (
    <Die 
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      id={die.id}
      holdDice={() => holdDice(die.id)} />))

  return (
    <main>
      {tenzies && <Confetti width={width} height={height} />}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
          {diceElements}
      </div>
      <button 
        className="roll-button" 
        onClick={rollDice}
        >
        {tenzies ? 'New Game': 'Roll'}
      </button>
    </main>
  )
}
