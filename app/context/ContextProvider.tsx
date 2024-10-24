'use client'
import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

interface ContextProps{
 isModalOpen: boolean,
 toggleModal: () => void;
 closeModal: () => void;
}

export const contextReader = createContext<ContextProps | undefined>(undefined)

export const ContextProvider = ({children} : {children: ReactNode}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  return (
    <contextReader.Provider  value={{isModalOpen, toggleModal, closeModal}}>
        {children}
    </contextReader.Provider>
  )
}
