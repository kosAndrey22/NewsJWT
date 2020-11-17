import React from "react";

class PageButton extends React.Component {
    render(){
        const {page, onPageClick} = this.props;
        return(
            <button className = "pageButton" onClick = {onPageClick}>{page}</button>
        )
    }
}
export default PageButton;