import './charList.scss';
import {useEffect, useRef, useState} from "react";
import useMarvelService from "../../services/UseMarvelService";
import Spinner from "../Spiner/Spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharList = (props) => {

    const [char, setChar] = useState([])

    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)

    const {loading, getAllCharacters, error} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial = false) => {
        initial ? setNewItemLoading(false): setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }


    const onCharListLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }

        setChar(char => [...char, ...newCharList])

        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)
    }

    const refItems = useRef([])

    const addFocus = (id) => {
        refItems.current.forEach((item) => {
            item.classList.remove('char__item_selected')
        })
        refItems.current[id].classList.add('char__item_selected')
    }

    function renderItems(arr) {
        const items = arr.map((item, index) => {
            let imgStyle = {'objectFit': 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }

            return (
                <li className="char__item"
                    ref={el => refItems.current[index] = el}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id)
                        addFocus(index)
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return items;
    }

    const items = renderItems(char)
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading && !newItemLoading? <Spinner/> : null

    return (
        <div className="char__list">
            <ul className="char__grid">
                {spinner}
                {errorMessage}
                {items}
            </ul>
            <button
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

export default CharList;