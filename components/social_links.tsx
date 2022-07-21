import {
  faGithub,
  faHackerrank,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { SocialLink } from './social_link';

export const SocialLinks = (): JSX.Element => {
  return (
    <ul className="social_links">
      <SocialLink
        href="https://twitter.com/jan_halama"
        className="twitter"
        transitionDelay={0.2}
        icon={faTwitter}
      ></SocialLink>
      <SocialLink
        href="https://github.com/janhalama"
        className="github"
        transitionDelay={0.3}
        icon={faGithub}
      ></SocialLink>
      <SocialLink
        href="https://www.linkedin.com/in/jan-halama-a92a5247/"
        className="linkedin"
        transitionDelay={0.4}
        icon={faLinkedin}
      ></SocialLink>
      <SocialLink
        href="https://www.hackerrank.com/jan_halama"
        className="hackerrank"
        transitionDelay={0.5}
        icon={faHackerrank}
      ></SocialLink>
    </ul>
  );
};
