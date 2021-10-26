import './charInfo.scss';
import {Component} from "react";
import MarvelServices from "../../services/MarvelServices";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../Spiner/Spiner";
import Skeleton from "../skeleton/Skeleton";
import PropTypes from 'prop-types'

class CharInfo extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelServices()

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }
    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
        this.setState({error:true})
    }

    updateChar = () => {
        const {charId} = this.props
        if (!charId) {
            return
        }

        this.onCharLading()
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch()
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }
    onCharLading = () => {
        this.setState({loading: true})
    }
    onError = () => {
        this.setState({loading: false, error: true})
    }

    render() {
        const {char, loading, error} = this.state
        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error || !char) ? <View char={char}/> : null
        return (
            <div className="char__info">
                {spinner}
                {skeleton}
                {errorMessage}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null  :'Comics with character is empty'}
                {comics.map((item, i)=> {
                    // eslint-disable-next-line array-callback-return
                    if (i>10) return
                    return(
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                })}

            </ul>
        </>
    )
}
CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;