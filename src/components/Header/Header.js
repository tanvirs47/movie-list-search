import React, { useRef } from 'react';
import './Header.scss';
import logo from '../../logo.svg';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const Header = (props) => {
  let searchText = useRef('');
  return (
    <div className='Header'>
      <div className='logo-container'>
        <img className='logo' src={logo} alt='logo' />
        <h3>Movies Catalogue</h3>
      </div>
      <div className='form d-flex justify-content-center align-items-center'>
        <InputGroup>
          <FormControl
            className='search'
            placeholder='Type something...'
            aria-label='search'
            aria-describedby='basic-addon2'
            type='search'
            onInput={(e) => (searchText = e.target.value)}
          />
          <InputGroup.Append>
            <Button
              onClick={() => onSearch()}
              style={{
                borderTopRightRadius: '16px',
                borderBottomRightRadius: '16px',
              }}
              variant='dark'
            >
              <i className='fa fa-search'></i>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    </div>
  );
  function onSearch() {
    props.onChangeQuery(searchText);
  }
};
export default Header;
