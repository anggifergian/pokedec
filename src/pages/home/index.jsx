import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

import { startLoading, finishLoading, errorLoading } from '../../utils/fetch-util'
import { titleCase } from '../../utils/text-util'

const baseUrl = "https://pokeapi.co/api/v2/"

function Home() {
    const navigate = useNavigate()

    const [pokemon, setPokemon] = useState({
        isLoading: false,
        hasError: false,
        error: "",
        offset: 0,
        list: [],
        types: [],
        selectedType: "",
        isFiltered: false,
    })

    useEffect(() => {
        if (!pokemon.isFiltered) {
            fetchPokemon()
        }
    }, [pokemon.offset, pokemon.isFiltered])

    useEffect(() => {
        fetchType()
    }, [])

    useEffect(() => {
        fetchPokemonByType()
    }, [pokemon.selectedType])

    async function fetchPokemon() {
        try {
            setPokemon(startLoading)

            const response = await fetch(`${baseUrl}pokemon?&offset=${pokemon.offset}`)
            const jsonData = await response.json()

            setTimeout(() => {
                setPokemon(prev => ({
                    ...finishLoading(prev),
                    list: [...prev.list, ...jsonData.results],
                }))
            }, 3000);
        } catch (err) {
            setPokemon(errorLoading)
        }
    }

    async function fetchPokemonByType() {
        try {
            setPokemon(prev => ({
                ...startLoading(prev),
                list: []
            }))

            const response = await fetch(pokemon.selectedType)
            const jsonData = await response.json()

            setPokemon(prev => ({
                ...finishLoading(prev),
                list: jsonData.pokemon.map(item => item.pokemon)
            }))
        } catch (err) {
            setPokemon(errorLoading)
        }
    }

    async function fetchType() {
        try {
            setPokemon(startLoading)

            const response = await fetch(`${baseUrl}type`)
            const jsonData = await response.json()

            setPokemon(prev => ({
                ...finishLoading(prev),
                types: jsonData.results,
            }))
        } catch (err) {
            setPokemon(errorLoading)
        }
    }

    function handleClick(name) {
        navigate(`pokemon/${name}`)
    }

    function fetchNext() {
        setPokemon(prev => ({
            ...prev,
            offset: prev.offset + 20
        }))
    }

    function handleChangeType(item) {
        const { value } = item.target

        setPokemon(prev => ({
            ...prev,
            selectedType: value,
            isFiltered: value !== "",
            offset: value === "" ? 0 : prev.offset,
        }))
    }

    return (
        <div className='max-w-3xl mx-auto px-4 sm:px-6 md:px-8 min-h-screen'>
            <main className='py-10'>
                <div className='sticky top-0 z-40 py-4 bg-white dark:bg-slate-900'>
                    <p className='pb-2 font-bold text-2xl md:text-3xl text-gray-800 dark:text-white'>PokeDec</p>
                    <p className='font-medium text-base text-gray-400 dark:text-white'>All the Pokemon data which fetch from <a href="https://pokeapi.co/" target='_blank' rel="noopener noreferrer">pokeapi.co</a></p>

                    <div className='pt-2 flex justify-between items-center'>
                        <div>
                            <p className='font-semibold text-cyan-500'>Total data {pokemon.isLoading ? (
                                <span>...</span>
                            ) : (
                                <span>{pokemon.list.length}</span>
                            )}</p>
                        </div>

                        <div>
                            <select
                                id="countries"
                                className="bg-gray-50 border-2 border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                                value={pokemon.selectedType}
                                onChange={handleChangeType}
                            >
                                <option value="">Choose Pokemon Type</option>
                                {pokemon.types.map(item => (
                                    <option
                                        key={item.url}
                                        value={item.url}
                                    >
                                        {titleCase(item.name)}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>
                </div>

                <div>
                    <InfiniteScroll
                        dataLength={pokemon.list.length}
                        hasMore={!pokemon.isFiltered}
                        next={fetchNext}
                        loader={<p className='py-4 font-bold text-red-500'>Loading...</p>}
                    >
                        <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2">
                            {pokemon.list.map((item, index) => (
                                <div
                                    key={item.url}
                                    onClick={() => handleClick(item.name)}
                                    className={`${index < 2 ? "mt-1" : "m-0"} group py-2 px-4 bg-white rounded-md border-2 shadow-none hover:cursor-pointer hover:border-cyan-500 focus:border-cyan-500 hover:shadow-lg hover:-translate-y-0.5 transition duration-200 ease-in-out`}
                                >
                                    <p className='group-hover:font-semibold group-hover:text-gray-700 text-gray-600 font-medium text-lg'>{titleCase(item.name)}</p>
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </main>
        </div>
    )
}

export default Home