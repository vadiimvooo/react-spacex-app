import { RocketType } from './RocketType';

export interface LaunchesType {
  id: string,
  flight_number: number
  name: string
  date_utc: string
  date_unix: number
  date_local: string
  date_precision: 'half' | 'quarter' | 'year' | 'month' | 'day' | 'hour',
  static_fire_date_utc: string | null
  static_fire_date_unix: number | null
  tbd: boolean
  net: boolean
  window: number | null
  rocket: string
  success: boolean | null
  failures: [
    {
      time: number,
      altitude: number,
      reason: number,
    },
  ],
  upcoming: boolean
  details: string | null
  fairings: {
    reused: boolean | null,
    recovery_attempt: boolean | null,
    recovered: boolean | null,
    ships: string[]
  },
  crew: {
    crew: string | null
    role: string | null
  }[],
  ships: string[],
  capsules: string[],
  payloads: string[],
  launchpad: string,
  cores: {
    core: string,
    flight: number | null,
    gridfins: boolean | null,
    legs: boolean | null,
    reused: boolean | null,
    landing_attempt: boolean | null,
    landing_success: boolean | null,
    landing_type: string | null,
    landpad: string | null,
  }[],
  links: {
    patch: {
      small: string | null,
      large: string | null,
    },
    reddit: {
      campaign: string | null,
      launch: string | null,
      media: string | null,
      recovery: string | null,
    },
    flickr: {
      small: string[],
      original: string[],
    },
    presskit: string | null,
    webcast: string | null,
    youtube_id: string | null,
    article: string | null,
    wikipedia: string | null,
  },
  auto_update: boolean,
  launch_library_id: string | null,
}

export interface LaunchesWithRocket extends LaunchesType {
  rocketObj?: RocketType;
}