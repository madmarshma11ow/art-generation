import { useState, useEffect, type RefObject } from "react";
import type { Art, Parameters } from "../types/types";
import './artInfo.css';
import { parameters_improve } from "../utils/parameters_improve";

export function ArtInfo({ correctArt, setUpCorrectArt, artRef }: { correctArt: Art, setUpCorrectArt: (data: Art) => void, artRef: RefObject<HTMLDialogElement | null> }) {
    const [mainParameter, setMainParameter] = useState<keyof Parameters>();
    const parameters: Partial<Parameters> = correctArt?.parameters;

    useEffect(() => {
        for (const key in parameters) {
            const k = key as keyof Parameters;
            if (parameters[k] === 10) {
                setMainParameter(k);
                break;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [correctArt])

    function sendNewCorrectArtData(): void {
        const improved = parameters_improve(correctArt.parameters, correctArt.improve_count);
        setUpCorrectArt({ id: correctArt.id, image: correctArt.image, parameters: improved.parameters, improve_count: improved.improve_count })
    }

    const mainValue = (parameters && mainParameter) ? parameters[mainParameter] : undefined;

    return (
        <>
            <header className="art-info__header">
                <button className="art-info__header__button" onClick={() => artRef.current?.close()}>&#x2715;</button>
            </header>
            <main className="art-info__main">
                <img className="art-info__image" src={correctArt.image ? correctArt.image : 'noimg'} />
                <b>Main parameter:</b>
                {parameters ? <p>{mainParameter}: {mainValue}</p> : ''}
                <b>Side parameters:</b>
                {parameters?.attack && parameters.attack !== mainValue ? <p>attack: {parameters.attack}</p> : ''}
                {parameters?.health && parameters.health !== mainValue ? <p>health: {parameters.health}</p> : ''}
                {parameters?.protect && parameters.protect !== mainValue ? <p>protect: {parameters.protect}</p> : ''}
                {parameters?.critDamage && parameters.critDamage !== mainValue ? <p>critDamage: {parameters.critDamage}</p> : ''}
                {parameters?.critChance && parameters.critChance !== mainValue ? <p>critChance: {parameters.critChance}</p> : ''}
                <button className="art-info__main__button" onClick={() => {
                    sendNewCorrectArtData();
                }}>Improve {correctArt.improve_count}/5</button>
            </main>
        </>
    )
}