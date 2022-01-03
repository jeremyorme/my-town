import { ActionType } from '../actions/index';
import { Category, BusinessEntry, Request } from './index';

interface DirectoryState {
  loading: boolean;
  loadedDirectoryId: string;
  homeDirectoryId: string;
  canWrite: boolean;

  directoryDb: any;
  businessEntriesDb: any;
  categoriesDb: any;
  requestsDb: any;

  townName: string;
  headline: string;
  introText: string;

  businessEntries: BusinessEntry[];
  categories: Category[];
  requests: Request[];
}

function getInitialState(): DirectoryState {
  return {
    loading: false,
    canWrite: false,
    loadedDirectoryId: null,
    homeDirectoryId: null,

    directoryDb: null,
    businessEntriesDb: null,
    categoriesDb: null,
    requestsDb: null,

    townName: '',
    headline: '',
    introText: '',

    businessEntries: [],
    categories: [],
    requests: []
  };
}

const directoryReducer = (state: DirectoryState = getInitialState(), action: ActionType) => {
  return action.payload && action.type.startsWith('DIRECTORY_') ? { ...state, ...action.payload.data } : state;
};

export default directoryReducer;