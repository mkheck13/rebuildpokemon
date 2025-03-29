'use client'

import React, { useState, useEffect } from 'react';
import { getLocalStorage } from '@/utils/localstorage';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import Image from 'next/image';
import heartIcon from '../assets/faHeart.png';

interface ModalComponentProps {
  onSelectPokemon: (pokemonName: string) => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ onSelectPokemon }) => {
  const [openModal, setOpenModal] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = getLocalStorage();
    setFavorites(Array.isArray(storedFavorites) ? storedFavorites : []);
  }, [openModal]);

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="h-16 w-72  flex justify-center items-center focus:ring-0 hover:cursor-pointer"
        color="gray"
      >
        <p className="text-white montserrat font-semibold text-2xl pe-3">See Favorites</p>
        <Image
          src={heartIcon}
          alt="heart icon"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      </Button>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Favorite Pokémon</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            {favorites.length > 0 ? (
              favorites.map((fav: string, index: number) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectPokemon(fav);
                    setOpenModal(false);
                  }}
                  className="block w-full text-left p-2 text-blue-600 hover:underline hover:cursor-pointer"
                >
                  {capitalizeFirstLetter(fav)}
                </button>
              ))
            ) : (
              <p className="text-gray-500">No favorite Pokémon yet!</p>
            )}
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
};

export default ModalComponent;

