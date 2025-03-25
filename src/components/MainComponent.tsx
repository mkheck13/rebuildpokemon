'use client'
import React, { useState } from 'react'

const MainComponent = () => {

    const [background, setBackground] = useState();
    const [pokemon, setPokemon] = useState();
    const [input, setInput] = useState();
    const [searchItem, setSearchItem] = useState();
    const [image, setImage] = useState();
    const [isShiny, setIsShiny] = useState();
    const [shinyFormBtn, setShinyFormBtn] = useState();
    const [types, setTypes] = useState();
    const [location, setLocation] = useState();
    const [localData, setLocalData] = useState();
    const [abilities, setAbilities] = useState();
    const [moves, setMoves] = useState();



  return (
    <>
        <div className='bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500'>MainComponent</div>
    </>
    
  )
}

export default MainComponent