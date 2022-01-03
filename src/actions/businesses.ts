import {
  selectOrbitDBInstance,
  selectLoadedBusinessesId,
  selectBusinessesDb,
  selectBusinesses,
  Business } from '../reducers/index';

export enum BusinessesActions {
  LoadBegin = 'BUSINESSES_LOAD_BEGIN',
  LoadEnd = 'BUSINESSES_LOAD_END',
  LoadSkipped = 'BUSINESSES_LOAD_SKIPPED',
  Change = 'BUSINESSES_CHANGE',
  PutBusiness = 'BUSINESSES_PUT_BUSINESS'
}

const makeBusinessesAction = (action: BusinessesActions, data: any) => async (dispatch, _getState) => {
  return dispatch({
    type: action,
    payload: { data }
  });
};

export function loadBusinesses(businessesId: string = 'self') {
  return async (dispatch, getState) => {
    // Check requested businesses are not already loaded
    const state = getState();
    let businessesDb = selectBusinessesDb(state);
    let loadedBusinessesId = selectLoadedBusinessesId(state);
    if (businessesDb && businessesId == loadedBusinessesId) {
      dispatch(makeBusinessesAction(BusinessesActions.LoadSkipped, {}));
      return;
    }

    dispatch(makeBusinessesAction(BusinessesActions.LoadBegin, { loading: true }));

    // Make sure we're connected
    const orbitdb = await selectOrbitDBInstance(state);

    // Load the businesses DB
    businessesDb = await orbitdb.docstore(businessesId && businessesId != 'self' ? ('/orbitdb/' + businessesId + '/business') : 'business');
    await businessesDb.load();
    loadedBusinessesId = businessesDb.address.toString().split('/')[2];

    // Determine if the user has write access
    const access = new Set(businessesDb.access.write);
    const canWrite = access.has(orbitdb.identity.id);

    const loadData = () => {
      const businesses = businessesDb.query(_ => true);

      const nextIndex = businesses.length > 0 ?
        businesses.reduce((prev, current) => (prev._id > current._id) ? prev : current)._id + 1 : 1

      return {
        // Meta-data
        loading: false,
        canWrite,
        loadedBusinessesId,
        nextIndex,

        // Databases
        businessesDb,

        // Documents
        businesses
      };
    };

    dispatch(makeBusinessesAction(BusinessesActions.LoadEnd, loadData()));
    businessesDb.events.on('replicated', () => dispatch(makeBusinessesAction(BusinessesActions.Change, loadData())));
  }
}

export function putBusiness(business: Business) {
  return async (dispatch, getState) => {
    const state = getState();
    const businessesDb = selectBusinessesDb(state);
    await businessesDb.put(business);
    const businesses = [...selectBusinesses(state).filter(x => x._id != business._id), business];
    dispatch(makeBusinessesAction(BusinessesActions.PutBusiness, {businesses}));
  };
}
