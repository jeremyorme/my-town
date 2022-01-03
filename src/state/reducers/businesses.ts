import { ActionType, Business } from '../root';

interface BusinessesState {
  loading: boolean;
  canWrite: boolean;
  loadedBusinessesId: string;

  businessesDb: any;

  businesses: Business[];
}

function getInitialState(): BusinessesState {
  return {
    loading: false,
    canWrite: false,
    loadedBusinessesId: null,

    businessesDb: null,

    businesses: [],
  };
}

const businessesReducer = (state: BusinessesState = getInitialState(), action: ActionType) => {
  return action.payload && action.type.startsWith('BUSINESSES_') ? { ...state, ...action.payload.data } : state;
};

export default businessesReducer;