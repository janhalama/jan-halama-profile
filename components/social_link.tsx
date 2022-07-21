import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

export type SocialLinkProps = {
  className: string;
  transitionDelay: number;
  href: string;
  icon: IconProp;
};

export const SocialLink = ({
  className,
  transitionDelay,
  href,
  icon,
}: SocialLinkProps): JSX.Element => {
  return (
    <motion.li
      className={className}
      initial={{ scale: 0.1 }}
      transition={{
        type: 'spring',
        bounce: 0.8,
        duration: 2,
        delay: transitionDelay,
      }}
      animate={{ scale: 0.9 }}
    >
      <a href={href}>
        <FontAwesomeIcon icon={icon} transform={{ size: 25 }}></FontAwesomeIcon>
      </a>
    </motion.li>
  );
};
