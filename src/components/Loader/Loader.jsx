import { Component } from 'react';
import { Circles } from 'react-loader-spinner';
import css from './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className={css.Container}>
        <Circles
          height="80"
          width="80"
          color="#3f51b5"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
}

export default Loader;
