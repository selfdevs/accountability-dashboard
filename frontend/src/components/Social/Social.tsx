import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiscord, faGithub, faInstagram, faLinkedin, faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import Card from '../Card';
import './styles.css';

const profilePicUrl = 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg';

const SocialButton = ({ icon, network, link }) => (
  <button type="button" className="social-icon-button" data-network={network} onClick={() => window.open(link)}>
    <FontAwesomeIcon icon={icon} className="social-icon" />
  </button>
);

type SocialProps = {
  discord?: string
  github?: string
  instagram?: string
  linkedIn?: string
  name?: string
  youtube?: string
};

const Social = ({
  name, github, linkedIn, discord, instagram, youtube,
}: SocialProps) => {
  const defaultName = 'Anonymous';

  return (
    <Card className="social-card flex-row">
      <img src={profilePicUrl} alt="Profile" className="social-image" />
      <div style={{ color: 'gray' }}>
        <h2 className="social-username">{name || defaultName}</h2>
        {github && <SocialButton icon={faGithub} network="github" link={github} />}
        {linkedIn && <SocialButton icon={faLinkedin} network="linkedin" link={linkedIn} />}
        {discord && <SocialButton icon={faDiscord} network="discord" link={discord} />}
        {instagram && <SocialButton icon={faInstagram} network="instagram" link={instagram} />}
        {youtube && <SocialButton icon={faYoutube} network="youtube" link={youtube} />}
      </div>
    </Card>
  );
};

export default Social;
