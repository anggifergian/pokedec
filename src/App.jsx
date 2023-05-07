import { useState, useEffect } from 'react'
import './App.css'

import { startLoading, finishLoading, errorLoading } from './utils/fetch-util'
import { titleCase } from './utils/text-util'

const baseUrl = "https://pokeapi.co/api/v2/"

function App() {
  const [pokemonState, setPokemon] = useState({
    isLoading: false,
    hasError: false,
    error: "",
    results: [],
  })

  useEffect(() => {
    fetchPokemon()
  }, [])

  function fetchPokemon() {
    try {
      setPokemon(prev => ({
        ...startLoading(prev),
        results: [],
      }))

      setTimeout(async () => {
        const response = await fetch(`${baseUrl}pokemon`)
        const jsonData = await response.json()
        setPokemon(prev => ({
          ...finishLoading(prev),
          results: jsonData.results,
        }))
      }, 3000)

    } catch (err) {
      setPokemon(errorLoading)
    }
  }

  return (
    <div className='max-w-3xl mx-auto px-4 sm:px-6 md:px-8'>
      <main className='pt-10'>
        <div>
          <p className='pb-2 font-bold text-2xl md:text-3xl text-gray-800 dark:text-white'>PokeDec</p>
          <p className='font-medium text-base text-gray-400 dark:text-white'>All the Pokemon data which fetch from <a href="https://pokeapi.co/" target='_blank' rel="noopener noreferrer">pokeapi.co</a></p>
        </div>

        <div className="py-4">
          {pokemonState.isLoading ? (
            <p className='font-bold text-red-500'>Loading...</p>
          ) : (
            <p className='pb-4 font-semibold text-cyan-500'>Data loaded {pokemonState.results.length}</p>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {pokemonState.results.map(item => (
              <div key={item.url} className='py-2 px-4 bg-white rounded-md border-2 shadow-md hover:cursor-pointer hover:border-cyan-500 focus:border-cyan-500 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out'>
                <p className='text-gray-700 font-medium text-lg'>{titleCase(item.name)}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
