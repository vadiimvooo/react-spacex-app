import React, { useState, useEffect, useRef } from 'react';
import { RocketType } from '../../types/RocketType';
import { Filter } from '../Filter';
import s from './AccordionComponent.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  rockets: RocketType[],
  setRocket: React.Dispatch<React.SetStateAction<string | null>>,
  rocket: string | null,
  setSuccess: React.Dispatch<React.SetStateAction<boolean | null>>,
  success: boolean | null,
  setUpcoming: React.Dispatch<React.SetStateAction<boolean | null>>,
  upcoming: boolean | null,
  filterChange: () => void,
}


export const AccordionComponent: React.FC<Props> = ({
  rockets,
  setRocket,
  setSuccess,
  setUpcoming,
  success, 
  upcoming,
  rocket,
  filterChange,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const acc = document.querySelector('.accordion');

    acc?.classList.toggle('active'); 

    const panel = panelRef.current;

    if (isOpen && panel) {
      document.body.style.overflow = 'hidden';
    } else if (panel) {
      document.body.style.overflow = 'unset';
    }

    console.log(isOpen);

  }, [isOpen]);

  return (
    <>
      <button className={s.accordion} onClick={() => setIsOpen(prev => !prev)}>{!isOpen ? <MenuIcon /> : <CloseIcon />}</button>
      {isOpen && (
        <AnimatePresence >
          <motion.div 
            className={s.panel} 
            ref={panelRef}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{ duration: 0.5 }}
          >
            <Filter 
              rockets={rockets} 
              setRocket={setRocket} 
              rocket={rocket}
              setSuccess={setSuccess}
              setUpcoming={setUpcoming}
              success={success}
              upcoming={upcoming}
              filterChange={filterChange} 
            />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};
