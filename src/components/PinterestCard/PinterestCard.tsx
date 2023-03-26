import React, { useMemo, useEffect } from 'react';
import { generateSize } from '../../helpers/randomCardSize';
import { randomInteger } from '../../helpers/randomNumber';
import { LaunchesWithRocket } from '../../types/LaunchesType';
import s from './PinterestCard.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { ModalWindow } from '../ModalWindow';

type Props = {
  launch: LaunchesWithRocket,
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>,
  selectedId: string | null,
}

export const PintrestCard: React.FC<Props> = ({
  launch,
  setSelectedId,
  selectedId,
}) => {
  const size = useMemo(() => generateSize(), [launch, generateSize]);
  const min = 0;
  const max = Number(launch.rocketObj?.flickr_images.length) - 1;
  const randomNumber = useMemo(() => randomInteger(min, max), [launch, min, max, randomInteger]);

  const dropIn = {
    hidden: {
      opacity: 0,
      scale: 0.7,
    },
    visible: {
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        delay: 0,
        ease: [0.25, 0.5, 0.75, 1]
      }
    },
    exit: {
      opacity: 0,
    },
  };

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedId]);

  return (
    <>
      <motion.div
        className={`${s.card} ${s[size]}`}
        layoutId={launch.id}
        onClick={() => setSelectedId(launch.id)}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <img src={launch.rocketObj?.flickr_images[randomNumber]} alt={launch.id} key={launch.id} className={s.cardImg}/>
      </motion.div>

      {selectedId && (
        <AnimatePresence>
          <motion.div 
            layoutId={selectedId} 
            key={selectedId} 
          >
            <ModalWindow id={launch.id} setSelectedId={setSelectedId} />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};