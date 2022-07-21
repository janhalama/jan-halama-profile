type ProfileImageProps = {
  imageId: number;
};

export const ProfileImage = ({ imageId }: ProfileImageProps): JSX.Element => {
  return <img alt="Jan Halama" src={`/img/janhalama-profile-${imageId}.jpg`} />;
};

export default ProfileImage;
