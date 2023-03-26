import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { LaunchesSlider } from '../LaunchesSlider';
import s from './ModalWindow.module.scss';
import { LaunchesWithRocket } from '../../types/LaunchesType';
import { getCapsuleById, getPayloadById, getShipById } from '../../helpers/fetchRockets';
import { LoaderComponent } from '../Loader';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  selectedId: string,
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>,
  launch: LaunchesWithRocket | null,
}

type OBJ = {
  name: string,
  serial: string,
}

const backdrop = {
  visible: { 
    opacity: 1,
    transition: { delay: 0, duration: 0.5 },
  },
  hidden: { 
    opacity: 0,
  },
};

const infodrop = {
  visible: { 
    opacity: 1,
    transition: { delay: 0, duration: 0.5 },
    scale: 1,
  },
  hidden: { 
    opacity: 0,
    scale: 0
  },
};

export const ModalWindow: React.FC<Props> = ({
  selectedId,
  setSelectedId,
  launch,
}) => {
  const [payloads, setPayloads] = useState<OBJ[]>([]);
  const [ships, setShips] = useState<OBJ[]>([]);
  const [capsules, setCapsules] = useState<OBJ[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  const data = [
    ['Name', launch?.name || 'None'],
    ['Flight number', launch?.flight_number || 'None'],
    ['Date', launch?.date_local || 'None'],
    ['Ships', ships.length ? ships.map(el => el.name).join(' ') : 'None'],
    ['Payloads', payloads.length ? payloads.map(el => el.name).join(' ') : 'None'],
    ['Capsules', capsules.length ? capsules.map(el => el.serial).join(' ') : 'None'],
    ['Details', launch?.details || 'None'],
  ];

  const getData = async () => {
    const shipsPromise = launch?.ships.length ? launch.ships.map(getShipById) : [];
    const capsulesPromise = launch?.capsules.length ? launch.capsules.map(getCapsuleById) : [];
    const payloadsPromise = launch?.payloads.length ? launch.payloads.map(getPayloadById) : [];
  
    const [ships, capsules, payloads] = await Promise.all([
      Promise.all(shipsPromise),
      Promise.all(capsulesPromise),
      Promise.all(payloadsPromise),
    ]);
  
    setShips(ships.map(ship => ship.data));
    setCapsules(capsules.map(capsule => capsule.data));
    setPayloads(payloads.map(payload => payload.data));

    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <AnimatePresence >
      {selectedId && (
        <motion.div 
          className={s.modalWindowBackground}
          onClick={e => {
            if (e.target === e.currentTarget) {
              setSelectedId(null);
            }
          }}
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          id='modal'
        >
          <motion.section 
            className={s.modalWindowBlock}
            variants={infodrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {!isLoading && (
              <>
                <div className={s.sliderContainer}>
                  {launch && launch.rocketObj && <LaunchesSlider rocketImages={launch.rocketObj.flickr_images} name="fdsfdsfds" />}
                </div>
                <div className={s.launchInfo}>
                  <h3 className={s.launchInfoTitle}>
                Launch info
                  </h3>
                  <div className={s.launchData}>
                    {data.map((eachData, i) => (
                      <div key={i} className={s.dataInfoPart}>
                        <h4 className={s.dataInfoPartTitle}>{eachData[0]}:</h4>
                        <p className={s.dataInfoPartDesc}>{eachData[1]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            

            {isLoading && (
              <div className={s.modalLoader}>
                <LoaderComponent />
              </div>
            )}

            <button type="button" onClick={() => setSelectedId(null)} className={s.closeButton}>{<CloseIcon sx={{ color: 'black'}} />}</button>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
