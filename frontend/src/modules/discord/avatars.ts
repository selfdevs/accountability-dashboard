import { User } from '../../entities/User';

export const generateAvatarUrl = (
  discordId: User['discordId'],
  discordAvatar: User['discordAvatar']
): string => {
  const isMissingAvatarData =
    !discordAvatar ||
    discordAvatar.length === 0 ||
    !discordId ||
    discordId.length === 0;

  if (isMissingAvatarData)
    return 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg';

  return `${process.env.REACT_APP_DISCORD_CDN}/avatars/${discordId}/${discordAvatar}.png`;
};
