import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
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
        error: false
    }
    marvelService = new MarvelServices()

    componentDidMount() {
        this.updateChar()
    }

    updateChar = () => {
        this.onCharLoading()
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoad)
    }
    onCharLoad = (char) => {
        this.setState({char, loading: false})
    }
    onCharLoading = () => {
        this.setState({loading: true})
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
        const {char, loading, error} = this.state
        const items = this.renderItems(char)
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null

        const content = !(loading || error)? items: null

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {spinner}
                    {errorMessage}
                    {content}

                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;