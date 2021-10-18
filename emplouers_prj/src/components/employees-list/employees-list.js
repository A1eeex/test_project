import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data, onDelete}) => {
    const elem = data.map((item)=>{
        const {id, ...itemProps}= item
        return (
            <EmployeesListItem
                key={item.id}
                {...itemProps}
                onDelete = {()=> onDelete(id)}
            />
        )
    })
    console.log(elem)

    return (
        <ul className="app-list list-group">
            {elem}
        </ul>
    )
}

export default EmployeesList;