import React, { useEffect, useState } from 'react';
import { generateAvatarUrl } from '../../modules/discord/avatars';
import './styles.css';

const Avatar = ({ discordId, discordAvatar, ...props }) => {
  const [avatarUrl, setAvatarUrl] = useState<string>(null);

  useEffect(() => {
    generateAvatarUrl(discordId, discordAvatar).then((url) =>
      setAvatarUrl(url)
    );
  });

  return (
    <img src={avatarUrl} alt="Profile" className="social-image" {...props} />
  );
};

export default Avatar;
