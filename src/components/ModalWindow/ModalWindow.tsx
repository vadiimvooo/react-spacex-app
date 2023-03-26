import React from 'react';
import s from './ModalWindow.module.scss';

type Props = {
  id: string,
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>,
}

export const ModalWindow: React.FC<Props> = ({
  id,
  setSelectedId,
}) => {

  console.log(id);
  return (
    <div 
      className={s.modalWindowBackground}
      onClick={e => {
        if (e.target === e.currentTarget) {
          setSelectedId(null);
        }
      }}
    >
      <section className={s.modalWindowBlock}>

      </section>
    </div>
  );
};
