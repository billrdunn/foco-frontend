import { createGlobalStyle } from 'styled-components';

import DomaineDisplayNarrowMedium from './DomaineDisplayNarrow-Medium.woff';
import DomaineDisplayNarrowMedium2 from './DomaineDisplayNarrow-Medium.woff2';

export default createGlobalStyle`
    @font-face {
      font-family: 'DomaineDisplayNarrowMedium';
      src: local('DomaineDisplayNarrowMedium'), local('DomaineDisplayNarrowMedium2'),
      url(${DomaineDisplayNarrowMedium}) format('woff'),
      url(${DomaineDisplayNarrowMedium2}) format('woff2');
      font-weight: 300;
      font-style: normal;
     }
  `;
