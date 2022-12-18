import { useState, useEffect } from 'react'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import './selecao.css'
export default function Battle(prop) {
    const [pocket, setPocket] = useState(1)
    const [hp, setHp] = useState()
    const [hpAdv, setHpAdv] = useState()
    const [pocketRand, setPocketRand] = useState()
    const [pocketRandId, setPocketRandId] = useState(1)
    const [geral, setGeral] = useState()
    const [pokeEscolhido, setPokeEscolhido] = useState()
    const [imagem, setImagem] = useState()
    let pokemon = []
    let pokemonAdv = []

    const history = useHistory()
    async function pegaPoke() {
        pokemon = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pocket}`)).json()
        if (pokemon.name) {
            setGeral(pokemon)
            console.log(pokemon)
            setImagem(pokemon.sprites.front_default)
        }
    }

    useEffect(() => {
        pegaPoke()
    }, [pocket]);



    function randomNumberInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleClick = () => {
        setPocketRandId(randomNumberInRange(1, 905));
    };
    async function pegaPokeAdv() {
        pokemonAdv = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pocketRandId}`)).json()
        if (pokemonAdv.name) {
            setPocketRand(pokemonAdv)
        }
    }

    useEffect(() => {
        pegaPokeAdv()
    }, [pocketRandId]);

    function avancar() {
        if (pocket < 905) {
            setPocket(pocket + 1)
        }
    }
    function voltar() {
        if (pocket > 1) {
            setPocket(pocket - 1)
        }
    }

    const Escolher = () => {
        setPokeEscolhido(geral)
    }

    const lose = () => {
        history.push("/derrota")
    }

    const win = () => {
        history.push("/vitoria")
    }

    const atacarPoke = () => {
        setHp((pokeEscolhido.stats[0].base_stat = Math.floor(pokeEscolhido.stats[0].base_stat - (pocketRand.stats[1].base_stat * .3))) +
            (pokeEscolhido.stats[2].base_stat * .1))
        if (pokeEscolhido.stats[0].base_stat <= 0) {
            lose()
        }
    }

    const atacarPokeAdv = () => {
        setHpAdv((pocketRand.stats[0].base_stat = Math.floor(pocketRand.stats[0].base_stat - (pokeEscolhido.stats[1].base_stat * .3))) +
            (pocketRand.stats[2].base_stat * .1))
        if (pocketRand.stats[0].base_stat <= 0) {
            win()
        }
    }

    const iniciar = () => {
        handleClick()
        Escolher()
    }

    return (
        <div>
            <header>
                <h1>Ex2 Battle</h1>
            </header>

            {!pokeEscolhido && <main>
                <div id="poke">
                    <div>
                        <button onClick={avancar}>AVANÇAR</button>
                        <button onClick={iniciar}>SELECIONAR</button>
                        <button onClick={voltar}>VOLTAR</button>
                        {geral && <h2>{geral.name}</h2>}
                        <img onClick={iniciar} src={imagem} />
                        <div>
                            {geral && geral.stats.map((e) => <p>{`${e.stat.name} = ${e.base_stat}`}</p>)}
                        </div>
                    </div>
                </div>
            </main>}
            {
                pokeEscolhido && <section id='batalha'>
                    <div>
                        <button onClick={atacarPokeAdv}>ATACAR</button>
                        <h2>{pokeEscolhido.name}</h2>
                        <img src={pokeEscolhido.sprites.front_default} />
                        <h2>Energia: {pokeEscolhido.stats[0].base_stat}</h2>
                    </div>
                    <div>
                        <button onClick={atacarPoke}>ATACAR</button>
                        <h2>{pocketRand.name}</h2>
                        <img src={pocketRand.sprites.front_default} />
                        <h2>Energia: {pocketRand.stats[0].base_stat}</h2>
                    </div>|
                </section>
            }
        </div >
    )
}