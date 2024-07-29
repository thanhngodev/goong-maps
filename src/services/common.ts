import { goongApiKey } from "../constants/constants";

export const fetchDistanceMatrix = async (
  origins: string,
  destinations: string
) => {
  try {
    const url = `https://rsapi.goong.io/DistanceMatrix?origins=${origins}&destinations=${destinations}&vehicle=car&api_key=${goongApiKey.distanceMatrix}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching distance matrix:", error);
    throw error;
  }
};

export const fetchPlaceDetails = async (placeId: string) => {
  try {
    const domainServer = import.meta.env.VITE_GOONG_API + `Place/Detail`;
    const url = domainServer + `?place_id=${placeId}`;
    const response = await fetch(
      url + `&api_key=${goongApiKey.distanceMatrix}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.result.geometry.location;
  } catch (error) {
    console.error("Error fetching place details:", error);
    throw error;
  }
};

export const fetchPlaceAutoComplete = async (query: string) => {
  try {
    const domainServer = import.meta.env.VITE_GOONG_API + `Place/AutoComplete`;
    const url = domainServer + `?input=${query}`;
    const response = await fetch(
      url + `&api_key=${goongApiKey.distanceMatrix}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching place autocomplete:", error);
    throw error;
  }
};

export const fetchDirectionData = async (
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number
) => {
  try {
    const response = await fetch(
      `https://rsapi.goong.io/Direction?origin=${originLat},${originLng}&destination=${destLat},${destLng}&vehicle=car&api_key=${goongApiKey.distanceMatrix}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching direction data:", error);
    throw error;
  }
};

export const convertToNumberArray = (location: {
  lat: number;
  lng: number;
}) => {
  return [location.lat, location.lng];
};

export interface DistanceDuration {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  status: string;
}

export interface MinDistanceResult {
  index: number;
  minDistanceItem: DistanceDuration;
}

export interface MinDurationResult {
  index: number;
  minDurationItem: DistanceDuration;
}

export interface DistanceDuration {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  status: string;
}

export interface MinResult {
  index: number;
  minItem: DistanceDuration;
}

export const findMin = (
  data: DistanceDuration[]
): { distanceResult: MinResult; durationResult: MinResult } => {
  if (!data || data.length === 0) {
    throw new Error("No data provided");
  }

  let minDistanceIndex = 0;
  let minDurationIndex = 0;

  data.forEach((item, index) => {
    if (item.distance.value < data[minDistanceIndex].distance.value) {
      minDistanceIndex = index;
    }
    if (item.duration.value < data[minDurationIndex].duration.value) {
      minDurationIndex = index;
    }
  });

  return {
    distanceResult: {
      index: minDistanceIndex,
      minItem: data[minDistanceIndex],
    },
    durationResult: {
      index: minDurationIndex,
      minItem: data[minDurationIndex],
    },
  };
};

// Union Type
export type Link = {
  type: "link";
  href: string;
};

export type Title = {
  type: "title";
  title: string;
};

export type FinalType = Link | Title;

type Address = {
  street: string;
  city: string;
  country: string;
};

export type User = {
  userName: string;
  email: string;
  password: string;
  id: string;
  address1: { street: string; country: string };
  address2: Address;
};

export type Person = {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
};

export const newPerson: Person = {
  name: "Nguyễn Văn Tèo",
  age: 24,
  gender: "male",
};

// use type child in type parent
export type Address1 = User["address1"];
export type Address2 = User["address2"];


// use Omit extends type User
export type UserResponse = Omit<User, "password" | "id">;

// let value with keyof
const getValue = (key: keyof Person) => newPerson[key];
const result = getValue("name"); // use "" not  ''
console.log("keyof: ", result);
