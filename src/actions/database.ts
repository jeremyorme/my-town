import { DownloadableKeystore } from '../helpers/downloadable-keystore';
import { selectKeystore, selectId } from '../reducers/index';

export enum DatabaseActions {
  ConnectBegin = 'DATABASE_CONNECT_BEGIN',
  ConnectEnd = 'DATABASE_CONNECT_END',
  BackupIdentity = 'DATABASE_BACKUP_IDENTITY',
  RestoreIdentity = 'DATABASE_RESTORE_IDENTITY'
}

const makeDatabaseAction = (action, data) => async (dispatch, _getState) => {
  return dispatch({
    type: action,
    payload: { data }
  });
};

export function connectDatabase(Ipfs: any, OrbitDB: any, ipfsId: string) {
  return async dispatch => {
    const createOrbitDb = async () => {
      const ipfs = await Ipfs.create({
        repo : './ipfs',
        start: true,
        preload: { 
          enabled: false
        },
        EXPERIMENTAL: {
          pubsub: true,
        },
        config: {
          Addresses: {
            Swarm: [
              '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
              '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
              '/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/',
            ]
          },
        }
      })

      const keystore = new DownloadableKeystore();
      const id = ipfsId || (await ipfs.id()).id;
      const orbitdb = await OrbitDB.createInstance(ipfs, {keystore, id});
      dispatch(makeDatabaseAction(DatabaseActions.ConnectEnd, { keystore, id }));

      return orbitdb;
    };

    const orbitdb = createOrbitDb();
    dispatch(makeDatabaseAction(DatabaseActions.ConnectBegin, { orbitdb }));
  };
}

export function backupIdentity(passPhrase: string) {
  return async (dispatch, getState) => {
    const state = getState();
    const keystore = selectKeystore(state);
    const id = selectId(state);
    const keyData = await keystore.getKeyData(id, passPhrase);
    dispatch(makeDatabaseAction(DatabaseActions.BackupIdentity, { keyData }));
  }
}

export function restoreIdentity(newKeyData: string, passPhrase: string) {
  return async (dispatch, getState) => {
    const state = getState();
    const keystore = selectKeystore(state);
    const id = selectId(state);
    await keystore.setKeyData(newKeyData, passPhrase);    
    const keyData = await keystore.getKeyData(id, passPhrase);
    dispatch(makeDatabaseAction(DatabaseActions.RestoreIdentity, { keyData }));
  }
}