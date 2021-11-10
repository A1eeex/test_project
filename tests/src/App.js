import {useState} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

function useInputWithValidate(initialValue) {
    const [value, setValue] = useState(initialValue)

    const onChange = event => {
        setValue(event.target.value)
    }

    const validateInp = () => {
        return value.search(/\d/) >= 0
    }

    return {value: value, onChange: onChange,validateInp}
}


const Form = () => {


    const input = useInputWithValidate('')
    const textArea =useInputWithValidate('')



    const form_control = 'form-control'
    const color = input.validateInp() ? 'text-danger' : null

    return (
        <Container>
            <form className="w-50 border mt-5 p-3 m-auto">
                <div className="mb-3">
                    <input value={`${input.value} / ${textArea.value}`} type="text" className="form-control" readOnly/>
                    <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                    <input
                        value={input.value}
                        onChange={input.onChange}
                        type="email"
                        className={`${form_control && color} `}

                        placeholder="name@example.com"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea
                        value={textArea.value}
                        onChange={textArea.onChange}
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                    />


                </div>
            </form>
        </Container>
    )
}

function App() {
    return (
        <Form/>
    );
}

export default App;
