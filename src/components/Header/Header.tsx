import React from 'react';
import s from './Header.module.scss';
import logo from '../../photos/SpaceX-Logo.png';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  return (
    <motion.header
      initial={{y: -500}}
      animate={{y: 0}}
      transition={{ duration: 0.5 }}
      className={s.header}
    >
      <div className={s.headerLogo}>
        <a href="https://vadiimvooo.github.io/react-spacex-app/">
          <img src={logo} alt="SpaceX" className={s.logo}/>
        </a>
      </div>
    </motion.header>
  );
};
