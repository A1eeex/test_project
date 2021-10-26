import './charList.scss';
import {Component} from "react";
import MarvelServices from "../../services/MarvelServices";
import Spinner from "../Spiner/Spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        char: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded:false
    }
    marvelService = new MarvelServices()

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }
    onCharListLoading = () => {
        this.setState({newItemLoading: true})
    }
    onCharListLoaded = (newCharList) => {
    let ended = false
        if (newCharList.length< 9 ){
            ended= true
        }

        this.setState(({char, offset}) => (
            {
                char: [...char, ...newCharList],
                loading: false,
                newItemLoading: false,
                offset: offset + 9,
                charEnded: ended
            }
        ))
    }

    // onCharLoading = () => {
    //     this.setState({loading: true})
    // }

    onError = () => {
        this.setState({error: true})
    }

    renderItems(arr) {
        const items = arr.map((item) => {
            let imgStyle = {'objectFit': 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }

            return (

                <li className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return items;
    }

    render() {
        const {char, loading, error, offset, newItemLoading,charEnded} = this.state
        const items = this.renderItems(char)
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null

        const content = !(loading || error) ? items : null

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {spinner}
                    {errorMessage}
                    {content}

                </ul>
                <button
                    className="button button__main button__long"
                    onClick={() => this.onRequest(offset)}
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none':'block' }}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;