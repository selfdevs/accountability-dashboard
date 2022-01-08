import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiscord, faGithub, faInstagram, faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import React, { useContext } from 'react';
import Card from '../Card';
import './styles.css';
import { AuthContext } from '../../contexts/Auth';

const profilePicUrl = 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg';

const SocialButton = ({ icon, network, link }) => (
  <button type="button" className="social-icon-button" data-network={network} onClick={() => window.open(link)}>
    <FontAwesomeIcon icon={icon} className="social-icon" />
  </button>
);

const Social = () => {
  const user = useContext(AuthContext);

  if (!user) return null;

  const {
    instagram, github, discord, youtube,
  } = user;

  return (
    <Card className="social-card flex-row">
      <img src={profilePicUrl} alt="Profile" className="social-image" />
      <div style={{ color: 'gray' }}>
        <h2 className="social-username">{user.username}</h2>
        {github && <SocialButton icon={faGithub} network="github" link={github} />}
        {discord && <SocialButton icon={faDiscord} network="discord" link={discord} />}
        {instagram && <SocialButton icon={faInstagram} network="instagram" link={instagram} />}
        {youtube && <SocialButton icon={faYoutube} network="youtube" link={youtube} />}
      </div>
    </Card>
  );
};

export default Social;
