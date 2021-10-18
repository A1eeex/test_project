import {Component} from "react";

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {id: 1, name: 'Alex', salary: 1300, increase: true},
                {id: 2, name: 'Ji', salary: 1300, increase: false},
                {id: 3, name: 'Sania', salary: 1300, increase: false},
            ],
            tern: ''
        }
        this.newId = 4
    }

    addEmp = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            id: this.newId++
        }
        this.setState(({data}) => {
            const newArray = [...data, newItem]
            return {
                data: newArray
            }

        })
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    searchItems=(items, tern)=>{
        if (tern.length === 0 ){
            return items
        }
        return items.filter((item)=>{
            return item.name.indexOf(tern) >-1
        })
    }
    onChangeSearch= (tern)=>{
        this.setState({tern})
}

    render() {
        const {data, tern} = this.state
const visible = this.searchItems(data, tern)
        return (
            <div className="app">
                <AppInfo/>
                <div className="search-panel">
                    <SearchPanel onChangeSearch={this.onChangeSearch} />
                    <AppFilter/>
                </div>

                <EmployeesList
                    onDelete={this.deleteItem}
                    data={visible}/>
                <EmployeesAddForm
                    onAdd={this.addEmp}
                />
            </div>
        );
    }
}

export default App;
