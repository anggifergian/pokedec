import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { errorLoading, finishLoading, startLoading } from '../../utils/fetch-util'
import { titleCase } from '../../utils/text-util'
import { Image } from '../../components'

const baseUrl = "https://pokeapi.co/api/v2/"

function Detail() {
    const { name } = useParams()

    const [pokemon, setPokemon] = useState({
        isLoading: false,
        hasError: false,
        error: "",
        detail: {},
    })

    useEffect(() => {
        fetchDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function fetchDetail() {
        try {
            setPokemon(startLoading)

            const response = await fetch(`${baseUrl}pokemon/${name}`)
            const jsonData = await response.json()

            setPokemon(prev => ({
                ...finishLoading(prev),
                detail: jsonData,
            }))
        } catch (error) {
            setPokemon(errorLoading)
        }
    }

    return (
        <div className='max-w-3xl mx-auto px-4 sm:px-6 md:px-8 min-h-screen'>
            <main className='py-10'>
                <div>
                    <p className='pb-2 font-bold text-2xl md:text-2xl text-gray-800 dark:text-white'>
                        {titleCase(name)}
                    </p>
                </div>

                <div>
                    {pokemon.detail.sprites && !pokemon.isLoading ? (
                        <Image 
                            name={name} 
                            className="w-60 h-60 bg-cover"
                            imageUrl={pokemon.detail.sprites.other.dream_world.front_default} 
                        />
                    ) : (
                        <p className='font-bold text-red-500'>Loading...</p>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Detail