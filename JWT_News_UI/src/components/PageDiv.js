import React from "react";
import PageButton from "./PageButton.js";

class PageDiv extends React.Component {
    renderPages = () => {
        const {onPageClick} = this.props;
        let {page, length, count} = this.props;
        let pagesAmount = Math.ceil (length / count);
        let pagesTemplate = [];
        
        if(pagesAmount <= 10) {
            for(let i = 0; i < pagesAmount; i++){
                pagesTemplate.push(<PageButton key = {i + 1}
                    page = {i + 1}
                    onPageClick = {() => onPageClick(i + 1, count)}/>
                );
            }
        }
        else {
            if((page - 5) <= 1) {
                for(let i = 0; i < 9; i++){
                    pagesTemplate.push(<PageButton key = {i + 1}
                        page = {i + 1}
                        onPageClick = {() => onPageClick(i + 1, count)}/>
                    );
                }
                pagesTemplate.push(<button disabled = {true}>...</button>);
                pagesTemplate.push(<PageButton key = {pagesAmount}
                    page = {pagesAmount}
                    onPageClick = {() => onPageClick(pagesAmount, count)}/>
                );
            }
            else if ((page + 5) >= length) {
                for(let i = pagesAmount - 9; i < pagesAmount; i++){
                    pagesTemplate.push(<PageButton key = {i + 1}
                        page = {i + 1}
                        onPageClick = {() => onPageClick(i + 1, count)}/>
                    );
                }
                pagesTemplate.unshift(<button disabled = {true}>...</button>);
                pagesTemplate.unshift(<PageButton key = {1}
                    page = {1}
                    onPageClick = {() => onPageClick(1), count}/>
                );
            }
            else {
                for(let i = page - 4; i < page + 4; i++){
                    pagesTemplate.push(<PageButton key = {i + 1}
                        page = {i + 1}
                        onPageClick = {() => onPageClick(i + 1, count)}/>
                    );
                }
                pagesTemplate.push(<button disabled = {true}>...</button>)
                pagesTemplate.push(<PageButton key = {pagesAmount}
                    page = {pagesAmount}
                    onPageClick = {() => onPageClick(pagesAmount, count)}/>
                );
                pagesTemplate.unshift(<button disabled = {true}>...</button>)
                pagesTemplate.unshift(<PageButton key = {1}
                    page = {1}
                    onPageClick = {() => onPageClick(1, count)}/>
                );
            }
        }
        return pagesTemplate;
    }
    render() {
        return (
          <div id="pageDiv">
            {this.renderPages()}
          </div>
        );
    }
}

export default PageDiv