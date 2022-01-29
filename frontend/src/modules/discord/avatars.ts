import { User } from '../../entities/User';

export const generateAvatarUrl = async (
  discordId: User['discordId'],
  discordAvatar: User['discordAvatar']
): Promise<string> => {
  const isMissingAvatarData =
    !discordAvatar ||
    discordAvatar.length === 0 ||
    !discordId ||
    discordId.length === 0;

  if (isMissingAvatarData)
    return 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg';

  try {
    const { status } = await fetch(
      `https://cdn.discordapp.com/avatars/${discordId}/${discordAvatar}.png`
    );
    if (status !== 200) throw new Error('Avatar not found');
    return `${process.env.REACT_APP_DISCORD_CDN}/avatars/${discordId}/${discordAvatar}.png`;
  } catch (e) {
    return 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg';
  }
};
