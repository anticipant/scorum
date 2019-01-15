import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBreedsList, IMAGES_TO_RENDER_ON_MAIN_PAGE, imageRendered } from '../../actions/ListActions';
import DogsList from '../DogList/DogList';
import BreedImage from '../BreedImage/BreedImage';
import Preloader from '../Preloader/Preloader';
import './BreedList.scss';
import checkImgArrAndGo from '../../help/util';


class BreedsList extends React.Component {
  constructor(props) {
    super(props);
    this.numberOfRenderedImages = 0;
  }

  componentDidMount() {
    const { getBreedsListActions } = this.props;

    getBreedsListActions();
  }

  showBreedListContainer = () => {
    const container = document.querySelector('.BreedList__content-wrapper');

    if (container) {
      container.classList.add('BreedList__content-wrapper--visible');
    }
  };

  finishImageRender = () => {
    const { imageRenderedActions } = this.props;
    this.numberOfRenderedImages += 1;

    if (this.numberOfRenderedImages === IMAGES_TO_RENDER_ON_MAIN_PAGE) {
      imageRenderedActions();
    }
  };

  startImageRender = () => {
    requestAnimationFrame(this.finishImageRender);
  };

  imageLoaded = () => {
    requestAnimationFrame(this.startImageRender);
  };

  render() {
    const {
      breedsList,
      breedsList: {
        isFetchingListImages, isFetchingList, areImagesShowing, error,
      },
    } = this.props;

    if (areImagesShowing) {
      checkImgArrAndGo('BreedList__content-wrapper', 'BreedList__flex-image');
      this.showBreedListContainer();
    }

    if (error !== '') {
      throw new Error(error);
    }

    return (
      <div className="BreedList">
        <h1 className="BreedList__title">Choose your Dog!</h1>

        <Preloader
          isFetching={isFetchingListImages || isFetchingList}
          areImagesShowing={areImagesShowing}
        >
          <div className="BreedList__container">
            <DogsList breedsList={breedsList} />

            <div className="BreedList__content-wrapper" onLoad={this.imageLoaded}>
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
    areImagesShowing: PropTypes.bool.isRequired,
  }).isRequired,
  getBreedsListActions: PropTypes.func.isRequired,
  imageRenderedActions: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  breedsList: store.breedsList,
});

const mapDispatchToProps = dispatch => ({
  getBreedsListActions: () => dispatch(getBreedsList()),
  imageRenderedActions: () => dispatch(imageRendered()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BreedsList);
