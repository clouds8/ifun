import React from "react";
import { AppTop } from '../topbar'
import { connect } from 'react-redux';
import './index.css';
import { AppMain } from '../main'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <AppTop />
                <AppMain />
            </div>
        )
    }
}


export default App