import './search-panel.css';
import {Component} from "react";

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tern: ''
        }
    }

    onChangeSearch=(e) => {
        const target = e.target.value
        this.setState({target})
        this.props.onChangeSearch(target)
    }
    render() {


        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="Найти сотрудника"
                onChange={this.onChangeSearch}
            />
        )
    }
}

export default SearchPanel;