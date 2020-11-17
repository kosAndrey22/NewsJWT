import { connect } from 'react-redux';
import { axiosPosts,ChangeCountPostOnPage } from '../actions';
import AmountPostDiv from '../components/AmountPostDiv';

const mapStateToProps = (state) => {
    return {
        page: state.notes.page,
        count: state.notes.postsOnPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRadioClick:(page, count) =>{
            dispatch(ChangeCountPostOnPage(count))
            dispatch(axiosPosts(page, count));
        }
    }
} 
const VisibleAmountPostDiv = connect(
    mapStateToProps,
    mapDispatchToProps
)(AmountPostDiv);
    
export default VisibleAmountPostDiv;