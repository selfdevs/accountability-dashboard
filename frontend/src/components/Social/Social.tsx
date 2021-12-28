import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiscord, faGithub, faInstagram, faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import Card from '../Card';
import './styles.css';

const profilePicUrl = 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg';

const SocialButton = ({ icon, network }) => (
  <button type="button" className="social-icon-button" data-network={network}>
    <FontAwesomeIcon icon={icon} className="social-icon" />
  </button>
);

const Social = () => (
  <Card className="social-card flex-row">
    <img src={profilePicUrl} alt="Profile" className="social-image" />
    <div style={{ color: 'gray' }}>
      <h2 className="social-username">Long</h2>
      <SocialButton icon={faGithub} network="github" />
      <SocialButton icon={faDiscord} network="discord" />
      <SocialButton icon={faInstagram} network="instagram" />
      <SocialButton icon={faYoutube} network="youtube" />
    </div>
  </Card>
);

export default Social;
