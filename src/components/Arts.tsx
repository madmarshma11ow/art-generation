import { artImages } from '../utils/artImages';
import { Parameters_generation } from '../utils/parameters_generator';
import type { Art } from '../types/types';
import { ArtInfo } from './ArtInfo';
import { useEffect, useState, useRef } from 'react'
import './arts.css'

export default function Arts({ quantityArts }: { quantityArts: number }) {
    const [arts, setArts] = useState<Art[]>([]);
    const [correctArt, setCorrectArt] = useState<Art>({ id: 0, image: '', parameters: {}, improve_count: 0 });
    const artRef = useRef<HTMLDialogElement | null>(null);
    const randomValue = Math.floor(Math.random() * artImages.length)

    useEffect(() => {

        const newArt: Art = {
            id: Date.now(),
            image: artImages[randomValue],
            parameters: Parameters_generation(),
            improve_count: 0,
        }

        if (quantityArts) {
            setArts([...arts, newArt])
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantityArts])

    function handleCorrectArt(data: Art): void {
        setCorrectArt(data);
    }

    return (
        <>
            {
                arts.map((art) => {
                    return <button className='art__button' key={art.id} onClick={() => {
                        setCorrectArt(art);
                        artRef.current?.showModal()
                    }} >
                        <img className='art__image' src={art.image} />
                    </button>
                })
            }
            <dialog className='art__info' ref={artRef}>
                <ArtInfo correctArt={correctArt} setUpCorrectArt={handleCorrectArt} artRef={artRef} />
            </dialog>
        </>
    )
}