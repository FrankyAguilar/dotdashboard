import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

const Navigation = () =>
  <div>
    <ul>
      <li><Link to={routes.LANDING}>Landing</Link></li>
      <li><Link to={routes.NEWCOLLECTIBLE}>New Collectible</Link></li>
    </ul>
  </div>

export default Navigation;
