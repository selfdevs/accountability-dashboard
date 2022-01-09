import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiscord,
  faGithub,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import React, { useCallback, useContext } from 'react';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Card from '../Card';
import './styles.css';
import { AuthContext } from '../../contexts/Auth';

const profilePicUrl =
  'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg';

const SocialButton = ({ icon, network, link }) => (
  <button
    type="button"
    className="social-icon-button"
    data-network={network}
    onClick={() => window.open(link)}
  >
    <FontAwesomeIcon icon={icon} className="social-icon" />
  </button>
);

const Social = () => {
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.clear();
    navigate('/');
  }, [navigate]);

  if (!user) return null;

  const { instagram, github, discord, youtube } = user;

  return (
    <Card className="social-card flex-row">
      <img src={profilePicUrl} alt="Profile" className="social-image" />
      <div style={{ color: 'gray' }}>
        <h2 className="social-username">{user.username}</h2>
        <button type="button" onClick={logout} id="logout-button">
          Logout&nbsp;&nbsp;
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
        {github && (
          <SocialButton icon={faGithub} network="github" link={github} />
        )}
        {discord && (
          <SocialButton icon={faDiscord} network="discord" link={discord} />
        )}
        {instagram && (
          <SocialButton
            icon={faInstagram}
            network="instagram"
            link={instagram}
          />
        )}
        {youtube && (
          <SocialButton icon={faYoutube} network="youtube" link={youtube} />
        )}
      </div>
    </Card>
  );
};

export default Social;
