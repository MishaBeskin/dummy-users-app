export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: 'male' | 'female';
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: string;
}

export const createEmptyUser = (): User => ({
  id: undefined,
  firstName: '',
  lastName: '',
  maidenName: '',
  age: 18,
  gender: 'male',
  email: '',
  phone: '',
  username: '',
  password: '',
  birthDate: '',
  image: 'https://static-00.iconduck.com/assets.00/avatar-default-icon-1975x2048-2mpk4u9k.png',
  bloodGroup: '',
  height: 0,
  weight: 0,
  eyeColor: '',
  hair: {
    color: '',
    type: ''
  },
  ip: '',
  address: {
    address: '',
    city: '',
    state: '',
    stateCode: '',
    postalCode: '',
    coordinates: {
      lat: 0,
      lng: 0
    },
    country: ''
  },
  macAddress: '',
  university: '',
  bank: {
    cardExpire: '',
    cardNumber: '',
    cardType: '',
    currency: '',
    iban: ''
  },
  company: {
    department: '',
    name: '',
    title: '',
    address: {
      address: '',
      city: '',
      state: '',
      stateCode: '',
      postalCode: '',
      coordinates: {
        lat: 0,
        lng: 0
      },
      country: ''
    }
  },
  ein: '',
  ssn: '',
  userAgent: '',
  crypto: {
    coin: '',
    wallet: '',
    network: ''
  },
  role: ''
});
