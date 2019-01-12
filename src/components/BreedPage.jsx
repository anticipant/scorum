import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBreedInfo, increaseShowedImages } from '../actions/PageActions';

class BreedPage extends React.Component {
  componentDidMount() {
    const { getBreedInfoActions, match } = this.props;
    const { breed, subBreed } = match.params;

    getBreedInfoActions({ breed, subBreed });
  }

  getImageElements = (images, showedImages) => {
    const showBtn = (
      <button
        key="show-button"
        type="button"
        onClick={this.onShowMoreBtnClick}
      >
        Show more
      </button>
    );

    return images.map((it, index) => {
      const { id, url } = it;

      return index < showedImages ? <div key={id}><img src={url} alt="" /></div> : null;
    }).concat(showedImages < images.length ? showBtn : null);
  };

  onShowMoreBtnClick = () => {
    const { increaseShowedImagesActions } = this.props;

    increaseShowedImagesActions();
  };

  render() {
    const { breedPage, match } = this.props;
    const { breed, subBreed } = match.params;

    return (
      <div>

        <h1>The dog is the best friend</h1>
        <h2>{`${subBreed} ${breed}`}</h2>
        <div>
          {breed ? `Breed: ${breed}` : null}
        </div>
        <div>
          {subBreed ? `Sub-breed: ${subBreed}` : null}
        </div>

        {breedPage.isFetching ? 'Loading...' : this.getImageElements(breedPage.allImagesOfTheBreed, breedPage.showedImages)}

      </div>
    );
  }
}

BreedPage.propTypes = {

  breedPage: PropTypes.shape({
    subBreed: PropTypes.string,
    breed: PropTypes.string,
    allImagesOfTheBreed: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    // breed: PropTypes.string.isRequired,
    // subBreed: PropTypes.string.isRequired,
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
