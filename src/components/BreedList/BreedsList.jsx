import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBreedsList } from '../../actions/ListActions';
import DogsList from '../DogList/DogList';
import BreedImage from '../BreedImage/BreedImage';
import Preloader from '../Preloader/Preloader';
import './BreedList.scss';
import checkImgArrAndGo from '../../help/util';


class BreedsList extends React.Component {
  componentDidMount() {
    const { getBreedsListActions } = this.props;

    getBreedsListActions();
  }

  componentDidUpdate() {
    const { breedsList } = this.props;
    const { isFetchingListImages, isFetchingList } = breedsList;

    if (!isFetchingListImages || !isFetchingList) {
      setTimeout(() => {
        checkImgArrAndGo('BreedList__content-wrapper', 'BreedList__flex-image');
      }, 1000);

      setTimeout(() => {
        this.showBreedListContainer();
      }, 1300);
    }
  }

  showBreedListContainer = () => {
    const container = document.querySelector('.BreedList__content-wrapper');

    if (container) {
      container.classList.add('BreedList__content-wrapper--visible');
    }
  };

  render() {
    const { breedsList } = this.props;
    const { isFetchingListImages, isFetchingList } = breedsList;


    return (
      <div className="BreedList">
        <h1 className="BreedList__title">Choose your Dog!</h1>


        <Preloader isFetching={isFetchingListImages || isFetchingList}>
          <div className="BreedList__container">
            <DogsList breedsList={breedsList} />

            <div className="BreedList__content-wrapper">
              {breedsList.breedsImages.map(it => <BreedImage key={it.id} imageInfo={it} name="BreedList__flex-image" />)}

            </div>

          </div>
        </Preloader>
      </div>
    );
  }
}

BreedsList.propTypes = {
  breedsList: PropTypes.shape({
    breeds: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired,
    isFetchingList: PropTypes.bool.isRequired,
    isFetchingListImages: PropTypes.bool.isRequired,
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
