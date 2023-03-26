import axios from 'axios';

type QueryObj ={
  rocket?: string | null,
  success?: boolean | null,
  upcoming?: boolean | null,
}

const instance = axios.create({
  baseURL: 'https://api.spacexdata.com/v4/',
  timeout: 10000,
});

export const getAllLaunches = (p: number, l: number) => {
  return instance.post('launches/query', {
    query: {},
    options: {
      page: p,
      sort: {
        date_local: 'desc'
      },
      limit: l,
    }
  });
};

export const getAllRockets = () => {
  return instance.post('rockets/query', {
    query: {},
    options: {
      page: 1,
      select: ['name', 'id', 'flickr_images'],
    }
  });
};

export const getRocketById = (rocketId: string) => {
  return instance.get(`rockets/${rocketId}`);
};

export const getAllFilteredLaunches = (
  p: number, 
  l: number, 
  filterByRocket: string | null,
  filterBySuccess: boolean | null,
  filterByUpcoming: boolean | null,
) => {
  const isQueryByRocketsExists = filterByRocket ? filterByRocket : false;
  const isQueryBySuccessExists = filterBySuccess ? filterBySuccess : false;
  const isQueryByUpcomingExists = filterByUpcoming ? filterByUpcoming : false;


  const queryObj: QueryObj = {};

  if (isQueryByRocketsExists) {
    queryObj.rocket = filterByRocket;
  }

  if (isQueryBySuccessExists) {
    queryObj.success = filterBySuccess;
  }

  if (isQueryByUpcomingExists) {
    queryObj.upcoming = filterByUpcoming;
  }

  return instance.post('launches/query', {
    query: {
      ...queryObj
    },
    options: {
      page: p,
      sort: {
        date_local: 'desc'
      },
      limit: l,
    }
  });
};

export const getPayloadById = (payloadId: string) => {
  return instance.get(`payloads/${payloadId}`);
};

export const getCapsuleById = (capsuleId: string) => {
  return instance.get(`capsules/${capsuleId}`);
};

export const getShipById = (shipId: string) => {
  return instance.get(`ships/${shipId}`);
};