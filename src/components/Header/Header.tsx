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
        <a href="http://localhost:3000/">
          <img src={logo} alt="SpaceX" className={s.logo}/>
        </a>
      </div>
    </motion.header>
  );
};
