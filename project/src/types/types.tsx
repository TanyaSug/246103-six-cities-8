export type City = {
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  }
  name: string
};

export type Point = {
  zoom: number;
  latitude: number;
  longitude: number;
};

export type Host = {
  avatarUrl: string,
    hostId: number,
  isPro: boolean,
  hostName: string,
};

export type AuthData = {
  login: string;
  password: string;
};

