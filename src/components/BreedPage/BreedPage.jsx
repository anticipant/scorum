import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBreedInfo, increaseShowedImages } from '../../actions/PageActions';
import './BreedPage.scss';
import Preloader from '../Preloader/Preloader';
import HomeAnchor from '../HomeAnchor/HomeAnchor';

const GetBreedFullName = ({ breed, subBreed }) => {
  if (breed && subBreed) {
    return (
      <React.Fragment>
        <h2 className="BreedPage__breed-name">{`${subBreed} ${breed}`}</h2>
        <div>{`Sub-breed: ${subBreed}`}</div>
        <div>{`Breed: ${breed}`}</div>
      </React.Fragment>
    );
  } if (breed) {
    return (
      <React.Fragment>
        <h2 className="BreedPage__breed-name">{`${breed}`}</h2>
        <div>{`Breed: ${breed}`}</div>
      </React.Fragment>
    );
  }

  return null;
};

GetBreedFullName.propTypes = {
  subBreed: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
};

class BreedPage extends React.Component {
  componentDidMount() {
    const { getBreedInfoActions, match } = this.props;
    const { breed, subBreed } = match.params;

    getBreedInfoActions({ breed, subBreed });
  }

  getImageElements = (images, showedImages) => {
    const showBtn = (
      <div className="BreedPage__button-wrapper" key="show-button">
        <button
          className="BreedPage__button"
          type="button"
          onClick={this.onShowMoreBtnClick}
        >
          Show more
        </button>
      </div>
    );

    return images.map((it, index) => {
      const { id, url } = it;

      return index < showedImages ? <div className="BreedPage__image" key={id} style={{ backgroundImage: `url(${url})` }} /> : null;
    }).concat(showedImages < images.length ? showBtn : null);
  };

  onShowMoreBtnClick = () => {
    const { increaseShowedImagesActions } = this.props;

    increaseShowedImagesActions();
  };


  render() {
    const { breedPage, match } = this.props;
    const {
      isFetching, allImagesOfTheBreed, showedImages, error,
    } = breedPage;
    const { breed, subBreed = '' } = match.params;

    if (error !== '') {
      throw new Error(error);
    }
    return (
      <React.Fragment>
        <div className="BreedPage">
          <HomeAnchor />
          <h1 className="BreedPage__title">The dog is the best friend</h1>
          <GetBreedFullName subBreed={subBreed} breed={breed} />

          <div className="BreedPage__container">
            <Preloader isFetching={isFetching}>
              {this.getImageElements(allImagesOfTheBreed, showedImages)}
            </Preloader>
          </div>

        </div>
      </React.Fragment>
    );
  }
}

BreedPage.propTypes = {

  breedPage: PropTypes.shape({
    subBreed: PropTypes.string,
    breed: PropTypes.string,
    error: PropTypes.string.isRequired,
    allImagesOfTheBreed: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
  match: PropTypes.shape({

  }).isRequired,
  getBreedInfoActions: PropTypes.func.isRequired,
  increaseShowedImagesActions: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  breedPage: store.breedPage,
});
const mapDispatchToProps = dispatch => ({
  getBreedInfoActions: breedName => dispatch(getBreedInfo(breedName)),
  increaseShowedImagesActions: () => dispatch(increaseShowedImages()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BreedPage);
