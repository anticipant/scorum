import React from 'react';
import './DogList.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DogsList = ({ breedsList }) => {
  const onListBtnClick = (evt) => {
    const btn = evt.target;
    const subMenu = btn.nextSibling;
    btn.classList.toggle('DogsList__toggle-btn--opened');
    subMenu.classList.toggle('DogsList__container--opened');
  };

  return (
    <div className="DogsList">
      <ul className="DogsList__container">
        {breedsList.breeds.map((it) => {
          const breedTitle = Object.keys(it);

          if (it[breedTitle].length) {
            return (
              <li key={`${breedTitle}`}>
                <button onClick={onListBtnClick} type="button" className="DogsList__toggle-btn">
                  {breedTitle}
                </button>
                <ul className="DogsList__container DogsList__container--sub">
                  {it[breedTitle].map(subBreed => (
                    <li key={`${subBreed} ${breedTitle}`}>
                      <Link className="DogsList__link" to={`/dog/${breedTitle}/${subBreed}`}>
                        {`${subBreed} ${breedTitle}`}
                      </Link>
                    </li>

                  ))}
                </ul>
              </li>
            );
          }
          return (

            <li key={breedTitle}>
              <Link className="DogsList__link" to={`/dog/${breedTitle}`}>
                {breedTitle}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

DogsList.propTypes = {
  breedsList: PropTypes.shape({
    breeds: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired,
  }).isRequired,
};

export default DogsList;
