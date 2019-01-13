import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBreedsList } from '../../actions/ListActions';
import DogsList from '../DogList/DogList';
import Preloader from '../Preloader/Preloader';
import './BreedList.scss';

class BreedsList extends React.Component {
  componentDidMount() {
    const { getBreedsListActions } = this.props;

    getBreedsListActions();
  }

  render() {
    const { breedsList } = this.props;


    return (
      <div className="BreedList">
        <h1 className="BreedList__title">Choose your Dog!</h1>
        <div className="BreedList__container">

          <Preloader isFetching={breedsList.isFetching}>
            <DogsList breedsList={breedsList} />
          </Preloader>

        </div>
      </div>
    );
  }
}

BreedsList.propTypes = {
  breedsList: PropTypes.shape({
    breeds: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
  getBreedsListActions: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  breedsList: store.breedsList,
});

const mapDispatchToProps = dispatch => ({
  getBreedsListActions: () => dispatch(getBreedsList()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BreedsList);
