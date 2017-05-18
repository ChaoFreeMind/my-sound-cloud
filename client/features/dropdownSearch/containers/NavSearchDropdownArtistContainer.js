import { connect } from 'react-redux';
import { getUserById } from 'client/features/entities/entitiesSelectors';
import defaultImageUrl from 'assets/images/default-artist.png';
import NavSearchDropdownItem from 'client/features/dropdownSearch/components/NavSearchDropdownItem';

const mapStateToProps = (state, { userId }) => {
  const artist = getUserById(state, userId);
  return ({
    imageUrl: artist.avatarUrl || defaultImageUrl,
    itemLinkUrl: `/artist/${userId}`,
    itemTitle: artist.username,
  });
};

export default connect(mapStateToProps)(NavSearchDropdownItem);