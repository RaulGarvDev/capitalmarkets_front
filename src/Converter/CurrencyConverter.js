import React, { Component } from 'react'
import {
    endpointPath
} from '../config/api';
import Dropdowns from "../components/Dropdowns"
import ConvertResult from "../components/ConvertResult"

class CurrencyConverter extends Component {



    constructor(props) {
        super(props);
        this.default = {
            from: 'USD',
            to: 'EUR',
            loading: false,
            amount: 1,
            conversionResult: '',
            conversionRate: ''
        }
        this.state = this.default
    }

    convertCurrency = async ({ from, to, amount }) => {
        this.setState({ loading: true });
        let url = endpointPath(from, to);
        let data = await fetch(url);
        let parsedData = await data.json();
        const conversionRate = parsedData;
        console.log(parsedData)
        console.log(conversionRate.rates)
        console.log(amount);
        console.log("Esto es TO"+to);
       
        
        const conversionResult = conversionRate.rates[to] * amount;
        
 
        this.setState({
            conversionRate: conversionRate,
            conversionResult: conversionResult,
            loading: false
        })
    }

    handleInput = (event) => {
        this.setState({ amount: event.target.value });
    }

    handleFrom = (event) => {
        this.setState({ from: event.currentTarget.value });
    }

    handletoString = (event) => {
        this.setState({ to: event.currentTarget.value });
    }

    handleReset = () => {
        this.setState(this.default)
    }

    handleSwitch = () => {
        const { from, to } = this.state;
        this.setState({ from: to, to: from });
    };

    render() {
        const {
            from,
            to,
            amount,
            conversionRate,
            conversionResult,
            loading
        } = this.state
        return (
            <>
                <div className='container-fluid shadow'>
                    <input
                        className="form-control-lg mt-5 shadow amount bg-dark"
                        placeholder="Enter Amount"
                        value={amount}
                        type="number"
                        onChange={this.handleInput}
                    />
                    <div className='fromdrop'>
                        <Dropdowns
                            labelName="From"
                            handleChange={this.handleFrom}
                            value={from}
                        ></Dropdowns>
                    </div>
                    <div className='text-center swap'>
                        <button className="btn shadow text-center" onClick={this.handleSwitch}><i className="fas fa-sort"></i></button>
                    </div>
                    <div className='toStringdrop'>
                        <Dropdowns
                            labelName="to"
                            handleChange={this.handletoString}
                            value={to}
                        ></Dropdowns>
                    </div>
                    <div className="mt-5 text-center">
                        <button
                            className='btn btn-scolor btn-lg shadow'
                            disabled={amount === "0" || amount === "" || amount < 0}
                            onClick={() => this.convertCurrency(this.state)}
                        >Convert</button>
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            className='btn btn-rcolor btn-lg shadow'
                            text="Reset"
                            onClick={this.handleReset}
                        >Reset <i className="fas fa-redo-alt"></i></button>
                    </div>
                    <div className='mt-5 mb-2 text-center'>
                        <ConvertResult
                            Loading={loading}
                            result={conversionResult}
                            rates={conversionRate}
                           
                        ></ConvertResult>
                    </div>
                </div>
            </>
        )
    }
}

export default CurrencyConverter