import React, { useState } from 'react';
import { LaunchesWithRocket } from '../../types/LaunchesType';
import { PintrestCard } from '../PinterestCard/PinterestCard';
import s from './PinterestLayout.module.scss';


type Props = {
  launches: LaunchesWithRocket[];
}

export const PinterestLayout: React.FC<Props> = ({
  launches,
}) => {
  const [selectedId, setSelectedId] = useState<null | string>(null);

  return (
    <div
      className={s.pinContainer}
    >
      {launches.map((launch) => {
        return (
          <PintrestCard 
            launch={launch} 
            key={launch.id} 
            setSelectedId={setSelectedId} 
            selectedId={selectedId} 
          />
        );
      })}
    </div>
  );
};