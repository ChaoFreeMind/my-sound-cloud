import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const UserNameContainer = styled.h1`margin: 0;`;

function UserName({ username }) {
  return (
    <UserNameContainer>
      {username}
    </UserNameContainer>
  );
}

UserName.defaultProps = {
  username: '',
};

UserName.propTypes = {
  username: PropTypes.string,
};

export default UserName;