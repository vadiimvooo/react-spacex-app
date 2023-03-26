import React, { useEffect, useState } from 'react';
import s from './App.module.scss';
import { Header } from './components/Header';
import { ListOfCards } from './components/ListOfCards';
import { getAllRockets } from './helpers/fetchRockets';
import { RocketType } from './types/RocketType';

function App() {
  const [rockets, setRockets] = useState<RocketType[]>([]);

  const getRockets = async () => {
    const rocketsData = await getAllRockets();

    setRockets(rocketsData.data.docs);
  };

  useEffect(() => {
    getRockets();
  }, []);

  return (
    <div className={s.app}>
      <Header />
      {rockets.length > 0 && <ListOfCards rockets={rockets} />}
    </div>
  );
  
}

export default App;
