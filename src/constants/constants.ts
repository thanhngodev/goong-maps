export const goongApiKey = {
  maps: import.meta.env.VITE_GOONG_KEY_MAP,
  distanceMatrix: import.meta.env.VITE_GOONG_API_KEY,
  googApiKey3: "84HpwEr9FSs9EURBGcBuOaK9bTFMrKzPQI7d1pdh",
};

// const url = `https://rsapi.goong.io/Direction?origin=${locations[0].latitude},${locations[0].longitude}&destination=${locations[1].latitude},${locations[1].longitude}&vehicle=car&api_key=${goongApiKey.distanceMatrix}`;

// const url = "https://rsapi.goong.io/DistanceMatrix?origins=20.981971,105.864323&destinations=21.031011,105.783206%7C21.022328,105.790480%7C21.016665,105.788774&vehicle=car&api_key=gFtdtgZ3aa8HApOxuO42NskNMcDenLfnee3aMyIb";

export const urlFetchDirection =
  "https://rsapi.goong.io/Direction?origin=21.046623224000029,105.790168203000060&destination=21.046666732000062,105.790169569000060&vehicle=car&api_key=gFtdtgZ3aa8HApOxuO42NskNMcDenLfnee3aMyIb";

export const goongMapStyleDefault =
  "https://tiles.goong.io/assets/goong_map_web.json";
export const goongMapStyleLight =
  "https://tiles.goong.io/assets/goong_light.json";
export const goongMapStyleDark =
  "https://tiles.goong.io/assets/goong_dark.json";
export const goongMapStyleCustom = "URL_to_your_custom_style";

export const goongMapStyle = {
  default: goongMapStyleDefault,
  light: goongMapStyleLight,
  dark: goongMapStyleDark,
  custom: goongMapStyleCustom,
};

export const logoUrl =
  "https://play-lh.googleusercontent.com/Lmtsg994YBE-LsUKL5hp1zXN_RGSVVxT1vHwrUPrdgKNy1XT6IdaLLPoDTHGGJGh_WIb";

export const locationIcon =
  "https://png.pngtree.com/png-clipart/20230619/original/pngtree-red-location-icon-vector-design-png-image_9190459.png";

export const locations = [
  {
    latitude: 10.79228547224416,
    longitude: 106.64420138571607,
    name: "The Pizza Company bàu cát",
    address: "207-209 Bàu Cát, Phường 13, Tân Bình, Hồ Chí Minh 700000, Việt Nam",
  },
  {
    latitude: 10.783158472117934,
    longitude: 106.66159932840834,
    name: "The Pizza Company cửu long",
    address: "74 Cửu Long, Phường 15, Quận 10, Hồ Chí Minh 700000, Việt Nam",
  },
  {
    latitude: 10.788006552060663,
    longitude: 106.67734925977726,
    name: "The Pizza Company lê văn sĩ",
    address: "333 Đ. Lê Văn Sỹ, Phường 13, Quận 3, Hồ Chí Minh, Việt Nam",
  },
  {
    latitude: 10.770890373107207,
    longitude: 106.66996782062316,
    name: "The Pizza Company vạn hạnh",
    address: "11 Đ. Sư Vạn Hạnh, Phường 12, Quận 10, Hồ Chí Minh 700000, Việt Nam",
  },
  {
    latitude: 10.76659009638089,
    longitude: 106.6818553708888,
    name: "The Pizza Company nguyen thị minh khai",
    address: "508 Đ. Nguyễn Thị Minh Khai, Phường 2, Quận 3, Hồ Chí Minh 700000, Việt Nam",
  },
  {
    latitude: 10.804900476669795,
    longitude: 106.69164064890428,
    name: "The Pizza Company phan văn trị",
    address: "527J Đ. Phan Văn Trị, Phường 5, Gò Vấp, Hồ Chí Minh, Việt Nam",
  },
  {
    latitude: 10.769245781577785,
    longitude: 106.63883674607506,
    name: "The Pizza Company hòa bình",
    address: "80 Hòa Bình, Phường 5, Quận 11, Hồ Chí Minh 700000, Việt Nam",
  },
  {
    latitude: 10.750494190938264,
    longitude: 106.64557339674285,
    name: "The Pizza Company hậu giang",
    address: "167 Đ. Hậu Giang, Phường 5, Quận 6, Hồ Chí Minh 700000, Việt Nam",
  },
  {
    latitude: 10.740867253124646,
    longitude: 106.66966202640336,
    name: "The Pizza Company phạm hùng",
    address: "322B Đ. Phạm Hùng, Phường 5, Quận 8, Hồ Chí Minh 700000, Việt Nam",
  },
  {
    latitude: 10.776064252523142,
    longitude: 106.61474811641457,
    name: "The Pizza Company lê văn quới",
    address: "239 Đ. Lê Văn Quới, Bình Trị Đông, Bình Tân, Hồ Chí Minh 700000, Việt Nam",
  }
];
