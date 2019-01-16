import React from 'react';
import { shallow } from 'enzyme';
import Preloader from '../Preloader';

describe('Preloader component', () => {
  const props = {
    children: <p>Content Loaded</p>,
    isFetching: false,
  };

  describe('News container initial', () => {
    it('should show that preloader render children with text "Content Loaded"', () => {
      const newsPreloader = shallow(<Preloader {...props} />);

      expect(newsPreloader.find('p').text()).toEqual('Content Loaded');
      expect(newsPreloader).toMatchSnapshot();
    });
  });
  describe('when it is shown Preloader', () => {
    const preloaderHTML = '<div class="Preloader"><hr/><hr/><hr/><hr/></div>';

    it('should show preloader without content (no data received) isFetching = false', () => {
      const nextProps = { ...props, isFetching: true };
      const newsPreloader = shallow(<Preloader {...nextProps} />);

      expect(newsPreloader.html()).toEqual(preloaderHTML);
      expect(newsPreloader).toMatchSnapshot();
    });


    it('should show preloader with content (data received, images not drawn) isFetching = false, areImagesShowing = false', () => {
      const nextProps = { ...props, isFetching: false, areImagesShowing: false };
      const newsPreloader = shallow(<Preloader {...nextProps} />);

      expect(newsPreloader.html()).toEqual(`${preloaderHTML}<p>Content Loaded</p>`);
      expect(newsPreloader).toMatchSnapshot();
    });
  });
});
