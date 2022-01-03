import { ActionType } from '../root';

interface DatabaseState {
  connecting: boolean,
  ipfs: any,
  keystore: any,
  id: any,
  orbitdb: any
}

function getInitialState(): DatabaseState {
  return {
    connecting: false,
    ipfs: null,
    keystore: null,
    id: null,
    orbitdb: null
  };
}

const databaseReducer = (state: DatabaseState = getInitialState(), action: ActionType) => {
  return action.payload && action.type.startsWith('DATABASE_') ? { ...state, ...action.payload.data } : state;
};

export default databaseReducer;