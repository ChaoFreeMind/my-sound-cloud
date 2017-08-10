import React from 'react';
import * as routes from 'common/constants/routeConsts';
import Fixed from 'common/components/Fixed';
import SidebarItem from './SidebarItem';

const SidebarWrapper = Fixed.extend`
  width: 300px;
  height: 100%;
  background-color: ${props => props.theme.colors.bgSub};
  z-index: ${props => props.theme.zIndexes[1]};
`;

const sidebarItemList = [
  {
    to: routes.CHARTS_ROUTE,
    iconClassName: 'fa fa-trophy',
    title: 'Top 50',
  },
  {
    to: routes.FAVORITES_ROUTE,
    iconClassName: 'fa fa-heart',
    title: 'Favorites',
  },
  {
    to: routes.PLAYLISTS_ROUTE,
    iconClassName: 'fa fa-list',
    title: 'Playlists',
  },
  {
    to: routes.STREAM_ROUTE,
    iconClassName: 'fa fa-music',
    title: 'Stream',
  },
];

// Should be refactored to take sidebar items as props
function Sidebar() {
  // The activeClassName thing would need work-around to work with styled-component: https://github.com/styled-components/styled-components/issues/184
  return (
    <SidebarWrapper>
      <ul>
        {sidebarItemList.map(item => <SidebarItem {...item} key={item.title} />)}
      </ul>
    </SidebarWrapper>
  );
}

export default Sidebar;
