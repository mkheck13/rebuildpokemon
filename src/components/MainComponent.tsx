'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { IPoke } from '@/interfaces/IPoke'
import { GetData } from '@/services/services'
import { ILocalArray } from '@/interfaces/ILocal'
import { Chain, IEvo } from '@/interfaces/IEvo'
import { getLocalStorage, removeFromLocalStorage, saveToLocalStorage } from '@/utils/localstorage'

import pokedox from '../assets/pokedox.png'
import HeartFilled from '../assets/HeartFilled.png'
import HeartEmpty from '../assets/HeartEmpty.png'
import SparkleFilled from '../assets/SparkleFilled.png'
import Sparkle from '../assets/Sparkle.png'
import bulba from '../assets/bulba.png'
import search from '../assets/faSearch.png'
import random from '../assets/faRandom.png'
import superchunk from '../assets/superChunk.jpg'

import ModalComponent from './ModalComponent'

const MainComponent = () => {

  const [pokemon, setPokemon] = useState<IPoke | null>(null);
  const [input, setInput] = useState<string | number>('');
  const [searchItem, setSearchItem] = useState<string | number>(234);
  const [image, setImage] = useState<string | null>(null);
  const [isShiny, setIsShiny] = useState(true);
  const [shinyFormBtn, setShinyFormBtn] = useState(Sparkle);
  const [types, setTypes] = useState('');
  const [location, setLocation] = useState('');
  const [localData, setLocalData] = useState<ILocalArray | null>(null);
  const [abilities, setAbilities] = useState('');
  const [moves, setMoves] = useState('');
  const [evolution, setEvolution] = useState('');
  const [evoData, setEvoData] = useState<IEvo | null>(null);
  const [favoriteHeartBtn, setFavoriteHeartBtn] = useState(HeartEmpty);

  const handleSearchClick = async () => {
    let validInput = input.toString().trim().toLowerCase();
  
    const specialCases: { [key: string]: string } = {
      deoxys: "386",
      wormadam: "413",
      shaymin: "492",
      giratina: "487",
      rotom: "479",
      basculin: "550",
      darmanitan: "555",
      meloetta: "648",
      tornadus: "641",
      thundurus: "642",
      landorus: "645",
      keldeo: "647",
    };
  
    if (specialCases[validInput]) {
      validInput = specialCases[validInput];
    }
  
    if (!isNaN(Number(validInput))) {
      const pokemonId = parseInt(validInput, 10);
  
      if (pokemonId >= 1 && pokemonId <= 649) {
        setSearchItem(pokemonId);
      } else {
        alert("Please enter a number between 1 and 649.");
      }
    } else {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${validInput}`);
  
        if (response.ok) {
          const data = await response.json();
          const pokemonId = data.id;
  
          if (pokemonId >= 1 && pokemonId <= 649) {
            setSearchItem(pokemonId);
          } else {
            alert("This Pokémon is outside the valid range (1 to 649).");
          }
        } else {
          alert("Pokémon not found. Please check the name and try again.");
        }
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        alert("Error fetching Pokémon data. Please try again.");
      }
    }
  
    setInput("");
  };
  

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleRandomClick = () => {
    const randNum = Math.floor(Math.random() * 649);
    if (randNum) {
      setSearchItem(randNum);
    }
    setInput('');
  };

  const handleShinyClick = () => {
    setIsShiny(!isShiny);
  };

  const handleFavoriteClick = () => {
    const favorites = getLocalStorage();

    if (pokemon) {
      if (favorites.includes(pokemon.name)) {
        removeFromLocalStorage(pokemon.name);
        setFavoriteHeartBtn(HeartEmpty);
      } else {
        saveToLocalStorage(pokemon.name);
        setFavoriteHeartBtn(HeartFilled);
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      const pokeData = await GetData(searchItem);
      setPokemon(pokeData);

      if (pokeData.id === 143) {
        setImage(superchunk.src);
      } else {
        const pokemonImage = pokeData.sprites?.other?.['official-artwork']?.front_default;

        if (pokemonImage) {
          setImage(pokemonImage);
        } else {
          setImage(null);
        }
      }
    };
    getData();
  }, [searchItem]);

  const handleSelectPokemon = (pokemonName: string) => {
    setSearchItem(pokemonName.toLowerCase()); // Use lowercase to avoid case-sensitive issues
  };

  useEffect(() => {
    const getData = async () => {
      if (pokemon) {
        const localFetch = await fetch(pokemon.location_area_encounters);
        const data = await localFetch.json();
        setLocalData(data);

        const speciesPromise = await fetch(`${pokemon.species.url}`);
        const speciesData = await speciesPromise.json();

        const evolutionPromise = await fetch(`${speciesData.evolution_chain.url}`);
        const evolutionData = await evolutionPromise.json();
        setEvoData(evolutionData);
      }
    }
    getData();

    setShinyFormBtn(Sparkle);
    setIsShiny(false);

    if (pokemon && pokemon.sprites.other && pokemon.sprites.other['official-artwork']) {
      setImage(pokemon.sprites.other['official-artwork'].front_default);
    }

    if (pokemon) {
      const pokeTypesArr = pokemon.types;
      const pokeTypes = pokeTypesArr.map(element => element.type.name);
      setTypes(pokeTypes.map(capitalizeFirstLetter).join(", "));

      const pokeAbilitiesArr = pokemon.abilities;
      const pokeAbilities = pokeAbilitiesArr.map(element => capitalizeFirstLetter(element.ability.name));
      setAbilities(pokeAbilities.join(", "));

      const pokeMovesArr = pokemon.moves;
      const pokeMoves = pokeMovesArr.map(element => capitalizeFirstLetter(element.move.name));
      setMoves(pokeMoves.join(", "));

      const favorites = getLocalStorage();
      if (!favorites.includes(pokemon.name)) {
        setFavoriteHeartBtn(HeartEmpty);
      } else {
        setFavoriteHeartBtn(HeartFilled);
      }
    }
  }, [pokemon]);

  useEffect(() => {
    if (!isShiny) {
      if (pokemon && pokemon.sprites.other && pokemon.sprites.other['official-artwork']) {
        setImage(pokemon.sprites.other['official-artwork'].front_default);
        setShinyFormBtn(Sparkle);
      }
    } else {
      if (pokemon && pokemon.sprites.other && pokemon.sprites.other['official-artwork']) {
        setImage(pokemon.sprites.other['official-artwork'].front_shiny);
        setShinyFormBtn(SparkleFilled);
      }
    }
  }, [isShiny, pokemon]);

  useEffect(() => {
    if (!localData || Object.keys(localData).length === 0) {
      setLocation("N/A");
    } else if (localData[0]?.location_area) {
      setLocation(capitalizeAndRemoveHyphens(localData[0].location_area.name));
    } else {
      setLocation("N/A");
    }
  }, [localData]);

  useEffect(() => {
    if (evoData?.chain && evoData.chain.evolves_to.length !== 0) {
      const evolutionArr = [evoData.chain.species.name];

      const traverseEvolutions = (chain: Chain) => {

        if (chain.evolves_to.length === 0) return;

        chain.evolves_to.forEach((evolution) => {
          evolutionArr.push(evolution.species.name);
          traverseEvolutions(evolution);
        });
      };
      traverseEvolutions(evoData.chain);
      setEvolution(evolutionArr.map(capitalizeFirstLetter).join(' - '))
    } else {
      setEvolution("N/A");
    }
  }, [evoData]);



  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function capitalizeAndRemoveHyphens(str: string) {
    const words = str.split('-');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
  }


  return (
    <>
      <main className='flex flex-wrap mx-10 sm:mx-20 md:mx-32 lg:mx-20 2xl:mx-40 py-16'>
        <header className='w-full lg:w-[45%]'>
          <nav className='flex justify-center items-center'>
            <Image src={pokedox} alt={'pokedox logo'} width={200} height={100} className='pb-10' />
          </nav>

          <section className='lg:pe-10 xl:pe-20 xl:border-r-2'>

            <div className='flex justify-center items-center w-full max-w-2xl'>
              <div className='bg-white bg-opacity-50 flex w-full max-w-md h-16 sm:h-14 items-center rounded-lg px-2'>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleSearchKeyPress}
                  type="text"
                  placeholder='Pokémon name/ number'
                  className='text-xl font-medium border-none w-full flex-1 px-2 bg-transparent focus:outline-none'
                />
                <button className='flex items-center justify-center p-2 hover:cursor-pointer' onClick={handleSearchClick}>
                  <Image
                    src={search}
                    alt={'search icon'}
                    width={24}
                    height={24}
                    className='h-6 w-6 object-contain'
                  />
                </button>
                <button className='flex items-center justify-center p-2 ml-1 hover:cursor-pointer' onClick={handleRandomClick}>
                  <Image
                    src={random}
                    alt={'random icon'}
                    width={24}
                    height={24}
                    className='h-6 w-6 object-contain'
                  />
                </button>
              </div>
            </div>

            <div className='flex flex-col items-center'>
              <div className='flex items-center space-x-2 sm:space-x-4'>
                <button className='flex-shrink-0 hover:cursor-pointer' onClick={handleFavoriteClick}>
                  <Image
                    src={favoriteHeartBtn}
                    alt={'heart Icon'}
                    width={32}
                    height={32}
                    className='h-8 w-8 object-contain'
                  />
                </button>

                <div className='flex items-baseline space-x-2'>
                  <p className='font-extrabold text-2xl sm:text-4xl'>{pokemon && capitalizeFirstLetter(pokemon.name)}</p>
                  <p className='font-extrabold text-xl sm:text-3xl '>
                    #<span>{pokemon && pokemon.id.toString().padStart(3, '0')}</span>
                  </p>
                </div>

                <button className='flex-shrink-0 hover:cursor-pointer' onClick={handleShinyClick}>
                  <Image
                    src={shinyFormBtn}
                    alt={'favorite Icon'}
                    width={32}
                    height={32}
                    className='h-8 w-8 object-contain'
                  />
                </button>
              </div>

              <div className='flex justify-center items-center py-5 w-full'>
                <Image
                  src={image || bulba}
                  alt={'pokemon image'}
                  width={200}
                  height={200}
                  unoptimized
                  className='w-full max-w-xs h-auto object-contain rounded-lg'
                />
              </div>
            </div>
          </section>
        </header>

        <aside className='w-full lg:w-[55%] lg:ps-5 xl:ps-16 pt-16 lg:pt-0'>

          <div className='flex justify-center lg:justify-end pt-6'>
            <ModalComponent onSelectPokemon={handleSelectPokemon} />

          </div>

          <article className='font-semibold text-[22px] sm:text-[25px] md:text-3xl lg:text-2xl xl:text-4xl pb-16 pt-16 lg:pb-0 md:pt-24'>

            <div className="grid grid-cols-2 pt-10 " style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)' }}>
              <div className="">
                <h3 className="font-bold h-12 mb-4">Type:</h3>
                <h3 className="font-bold h-12 mb-4">Location:</h3>
                <h3 className="font-bold h-12 mb-4">Abilities:</h3>
                <h3 className="font-bold h-12 mb-4">Moves:</h3>
              </div>
              <div className="overflow-hidden">
                <div className="h-12 mb-4 overflow-y-auto">{types}</div>
                <p className="h-12 mb-4 overflow-y-auto">{location}</p>
                <p className="h-12 mb-4 overflow-y-auto">{abilities}</p>
                <p className="h-32 overflow-y-auto">{moves}</p>
              </div>
            </div>

            <div className="pt-10 w-full">
              <h3 className="font-bold">Evolution:</h3>
              <div className="overflow-x-auto pt-10 flex justify-between items-center text-base sm:text-xl md:text-xl lg:text-xl xl:text-4xl">{evolution}</div>
            </div>

          </article>
        </aside>

      </main>
    </>

  )
}

export default MainComponent