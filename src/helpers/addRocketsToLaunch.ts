import { LaunchesType, LaunchesWithRocket } from '../types/LaunchesType';
import { RocketType } from '../types/RocketType';

export const addRocketsToLaunch = (rockets: RocketType[], launches: LaunchesType[]) => {
  const launchWithRockets: LaunchesWithRocket[] = launches.map(launch => ({
    ...launch,
    rocketObj: rockets.find(rocket => rocket.id === launch.rocket),
  }));

  return launchWithRockets;
};