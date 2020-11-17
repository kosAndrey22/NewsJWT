import { connect } from 'react-redux';
import { axiosPosts } from '../actions';
import PageDiv from '../components/PageDiv';

const mapStateToProps = (state) => {
    return {
        page: state.notes.page,
        length: state.notes.totalLength,
        count: state.notes.postsOnPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPageClick:(page, count) =>{
            dispatch(axiosPosts(page, count));
        }
    }
} 
const VisiblePageDiv = connect(
    mapStateToProps,
    mapDispatchToProps
)(PageDiv);
    
export default VisiblePageDiv;