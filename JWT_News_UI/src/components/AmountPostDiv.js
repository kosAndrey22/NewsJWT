import React from "react";

class AmountPostDiv extends React.Component{
    onSelect = e => {
        let {onRadioClick} = this.props
        let { page } = this.props
        onRadioClick(page, e.currentTarget.value)
    }
    render(){
        let {count} = this.props;
        return(
            <React.Fragment>
                <p>Posts on page: </p>
                <input 
                    name="amount" 
                    type="radio" 
                    value="5"
                    checked = {5 == count}
                    onChange = {this.onSelect}/>5
                <input 
                    name="amount" 
                    type="radio" 
                    value="10"
                    checked = {10 == count}
                    onChange = {this.onSelect}/>10
                <input 
                    name="amount" 
                    type="radio" 
                    value="15"
                    checked = {15 == count}
                    onChange = {this.onSelect}/>15
            </React.Fragment>
        )
    }
}

export default AmountPostDiv