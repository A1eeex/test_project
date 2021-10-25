import React from 'react';
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
        this.setState({error: true})
    }

    render() {
     if(this, this.state.error){
         return <ErrorMessage />
     }
     return this.props.children
    }
}

export default ErrorBoundary;