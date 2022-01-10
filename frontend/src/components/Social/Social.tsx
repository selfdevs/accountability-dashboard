import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiscord,
  faGithub,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import React, { FC } from 'react';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Card from '../Card';
import './styles.css';
import { User } from '../../entities/User';
import { generateAvatarUrl } from '../../modules/discord/avatars';
import { useLogout } from '../../contexts/Auth';

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

type SocialProps = {
  readonly?: boolean;
  user: User;
};

const Social: FC<SocialProps> = ({ readonly, user }) => {
  const logout = useLogout();

  if (!user) return null;

  const { instagram, github, discord, youtube, discordId, discordAvatar } =
    user;

  return (
    <Card className="social-card flex-row">
      <img
        src={generateAvatarUrl(discordId, discordAvatar)}
        alt="Profile"
        className="social-image"
      />
      <div style={{ color: 'gray' }}>
        {readonly && <span className="social-visiting">Visiting</span>}
        <h2 className="social-username">{user.username}</h2>
        {!readonly && (
          <button type="button" onClick={() => logout()} id="logout-button">
            Logout&nbsp;&nbsp;
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        )}
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
