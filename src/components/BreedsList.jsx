import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getBreedsList, getBreedURL } from '../actions/ListActions';

// const BreedsList = ({ breeds }) => (
//   <div>
//     <div>Hello Dogs</div>
//     {breeds.breedsList}
//   </div>
// );

class BreedsList extends React.Component {
  componentDidMount() {
    const { getBreedsListActions } = this.props;

    getBreedsListActions();
  }

  onBreedNameClick = (evt) => {
    const { getBreedURLActions } = this.props;
    const breedName = evt.target.innerHTML;
    if (breedName.split(' ').length === 1) {
      // link на роутер для конкретной породы
      console.log('Breed');
    } else {
      console.log('subBreed');

      // link на роутер для конкретной породы
    }

    getBreedURLActions(breedName);

    // в сторе надо добавить свойство с именем выбранной породы
  };

  render() {
    const { breedsList } = this.props;

    if (breedsList.referrer) return <Redirect to={`/dog${breedsList.referrer}`} />;

    return (
      <div>
        <div>Hello Dogs:</div>
        <hr />
        <div role="presentation" className="wrapper" onClick={this.onBreedNameClick}>
          {breedsList.breeds.map((it) => {
            const breedTitle = Object.keys(it);
            if (it[breedTitle].length) {
              return it[breedTitle].map(subBreed => (
                <p key={`${subBreed} ${breedTitle}`}>
                  {`${subBreed} ${breedTitle}`}
                </p>
              ));
            }
            return (
              <p key={breedTitle}>{breedTitle}</p>
            );
          })}
        </div>

        {breedsList.isFetching ? 'Loading...' : null}
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
  getBreedURLActions: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  breedsList: store.breedsList,
});

const mapDispatchToProps = dispatch => ({
  getBreedsListActions: () => dispatch(getBreedsList()),
  getBreedURLActions: breedName => dispatch(getBreedURL(breedName)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BreedsList);
