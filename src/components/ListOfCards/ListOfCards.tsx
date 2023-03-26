/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { addRocketsToLaunch } from '../../helpers/addRocketsToLaunch';
import { getAllFilteredLaunches, getAllLaunches, getAllRockets, getRocketById } from '../../helpers/fetchRockets';
import { randomInteger } from '../../helpers/randomNumber';
import { useWindowSize } from '../../hooks/useWindowSize';
import { LaunchesWithRocket, LaunchesType} from '../../types/LaunchesType';
import { RocketType } from '../../types/RocketType';
import { Filter } from '../Filter';
import { PinterestLayout } from '../PinterestLayout/PinterestLayout';
import s from './ListOfCards.module.scss';
import { CSSTransition } from 'react-transition-group';

export type FilterByRocket = string | null;

type Props = {
  rockets: RocketType[],
}

export const ListOfCards: React.FC<Props> = ({ 
  rockets, 
}) => {
  const [launches, setLaunches] = useState<LaunchesWithRocket[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const windowSize = useWindowSize();
  const [limitOfPages, setLimitOfPages] = useState<null | number>(null);
  const [rocket, setRocket] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [upcoming, setUpcoming] = useState<boolean | null>(null);
  const filterByRocket = rocket;
  const filterBySuccess = success;
  const filterByUpcoming = upcoming;

  const isFilterExists = filterByRocket || filterBySuccess || filterByUpcoming;

  const getData = useCallback(async (p: number, l: number) => {
    const launchAll = await getAllLaunches(p, l);
  
    const dataLaunch = launchAll.data.docs as LaunchesType[];
  
    if (limitOfPages !== launchAll.data.totalPages) {
      setLimitOfPages(launchAll.data.totalPages);
    }
  
    const launchWithRockets = addRocketsToLaunch(rockets, dataLaunch);

    setLaunches(prev => {
      const updatedArray = [...prev, ...launchWithRockets];
  
      return updatedArray;
    });
  
    setPage(prev => prev + 1);
    setLoading(false);
  },[rockets, limitOfPages]);

  const getFilteredData = useCallback(
    async (
      p: number, 
      l: number, 
      filterByRocket: string | null,
      filterBySuccess: boolean | null,
      filterByUpcoming: boolean | null,
    ) => {
      const launchAll = await getAllFilteredLaunches(p, l, filterByRocket, filterBySuccess, filterByUpcoming);
  
      const dataLaunch = launchAll.data.docs as LaunchesType[];
  
      if (limitOfPages !== launchAll.data.totalPages) {
        setLimitOfPages(launchAll.data.totalPages);
      }
  
      const launchWithRockets = addRocketsToLaunch(rockets, dataLaunch);

      setLaunches(prev => {
        const updatedArray = [...prev, ...launchWithRockets];
  
        return updatedArray;
      });
  
      setPage(prev => prev + 1);
      setLoading(false);
    }, [rockets, limitOfPages, filterByRocket]);

  const scrollHandler = useCallback(():void => {
    const condition = [
      (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight)) < 300,
      page <= Number(limitOfPages),
    ];
  
    if(condition.every(Boolean)) {
      setLoading(true);
    }
  }, [page, limitOfPages]);

  const filterChange = () => {
    setPage(1);
    setLaunches([]);
    setLimitOfPages(1);
    setLoading(true);
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
  
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  useEffect(() => {
    if (loading && !isFilterExists) {
      if (windowSize.width > 1200) {
        getData(page, 50);
      } else if (windowSize.width < 480) {
        getData(page, 10);
      } else if (windowSize.width <= 1200 && windowSize.width >= 480) {
        getData(page, 25);
      }
    }

    if (isFilterExists && loading) {
      if (windowSize.width > 1200) {
        getFilteredData(page, 50, filterByRocket, filterBySuccess, filterByUpcoming);
      } else if (windowSize.width < 480) {
        getFilteredData(page, 10, filterByRocket, filterBySuccess, filterByUpcoming);
      } else if (windowSize.width <= 1200 && windowSize.width >= 480) {
        getFilteredData(page, 25, filterByRocket, filterBySuccess, filterByUpcoming);
      }
    }
  }, [page, loading, windowSize.width, getData, isFilterExists, filterByRocket]);

  return (
    <div className={s.listofCardsContainer}>
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
      <PinterestLayout launches={launches} />
    </div>
  );
};
