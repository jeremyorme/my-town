import {
  selectOrbitDBInstance,
  selectLoadedDirectoryId,
  selectDirectoryDb,
  selectCategoriesDb,
  selectCategories,
  selectBusinessEntriesDb,
  selectBusinessEntries,
  selectRequestsDb,
  selectRequests,
  Category,
  BusinessEntry,
  BusinessEntryId,
  businessEntryIdEquals,
  BusinessEntryRequest
} from '../root';

export enum DirectoryActions {
  LoadBegin = 'DIRECTORY_LOAD_BEGIN',
  LoadEnd = 'DIRECTORY_LOAD_END',
  LoadSkipped = 'DIRECTORY_LOAD_SKIPPED',
  Change = 'DIRECTORY_CHANGE',
  SetField = 'DIRECTORY_SET_FIELD',
  SetHome = 'DIRECTORY_SET_HOME',
  UpdateCategories = 'DIRECTORY_UPDATE_CATEGORIES',
  UpdateBusinessEntries = 'DIRECTORY_UPDATE_BUSINESS_ENTRIES',
  UpdateRequests = 'DIRECTORY_UPDATE_REQUESTS'
}

const makeDirectoryAction = (action: DirectoryActions, data: any) => async (dispatch, _getState) => {
  return dispatch({
    type: action,
    payload: { data }
  });
};

const maxRequests = 100;

const fieldDefaults = {
  townName: 'Town Name',
  headline: 'Shop local. Help *Town Name* thrive!',
  introText: 'The high-street is the beating heart of our local community and vibrant small business underpins our freedom and democracy.\n\n*Support our local businesses* for a stronger community and brighter future.',
  categories: [
    {_id: 'shopping', headline: 'Shopping'},
    {_id: 'food', headline: 'Food'},
    {_id: 'services', headline: 'Services'}
  ]
};

const homeDirectoryIdKey = 'my-town-home-directory-id';

const getRequests = (requestsDb: any, businessEntries: BusinessEntry[]) => {
  // Fetch the first 'maxRequests' requests, remove future requests and order by timestamp descending
  const allRequests = requestsDb.iterator({ limit: maxRequests, reverse: true })
    .collect().map(e => e.payload.value as BusinessEntryRequest)
    .filter(x => x.timestamp <= Date.now())
    .sort(x => x.timestamp)
    .reverse();

  // De-duplicate by business ID
  const reqToKey = r => r._id.businessesId + '/' + r._id.businessIdx;
  const acceptedRequests = new Set(businessEntries.map(reqToKey));
  const requestById = allRequests.reduce((a,r) => (acceptedRequests.has(reqToKey(r)) ? a : {...a, [reqToKey(r)]: r}), {});
  return Object.values(requestById);
}

export function loadDirectory(directoryId: string) {
  return async (dispatch, getState) => {
    // Check requested directory is not already loaded
    const state = getState();
    let directoryDb = selectDirectoryDb(state);
    let loadedDirectoryId = selectLoadedDirectoryId(state);
    if (directoryDb && directoryId == loadedDirectoryId) {
      dispatch(makeDirectoryAction(DirectoryActions.LoadSkipped, {}));
      return;
    }

    dispatch(makeDirectoryAction(DirectoryActions.LoadBegin, {
      loading: true,
      townName: fieldDefaults.townName,
      headline: fieldDefaults.headline,
      introText: fieldDefaults.introText,
      categories: fieldDefaults.categories
    }));

    // Make sure we're connected
    const orbitdb = await selectOrbitDBInstance(state);

    // Load the directory root DB
    directoryDb = await orbitdb.keyvalue(directoryId && directoryId != 'self' ? ('/orbitdb/' + directoryId + '/directory') : 'directory');
    await directoryDb.load();
    loadedDirectoryId = directoryDb.address.toString().split('/')[2];

    // Determine if the user has write access
    const access = new Set(directoryDb.access.write);
    const canWrite = access.has(orbitdb.identity.id);

    // Load the directory's stores
    const loadStore = async (dbName, store) => {
      const dbAddress = directoryDb.get(dbName);
      const db = await store(dbAddress || dbName);

      if (!dbAddress && canWrite)
        directoryDb.put(dbName, db.address.toString());

      await db.load();
      return db;
    }
    const businessEntriesDb = await loadStore('businesses', x => orbitdb.docstore(x));
    const categoriesDb = await loadStore('categories', x => orbitdb.docstore(x));
    const requestsDb = await loadStore('requests', x => orbitdb.log(x, {accessController: {write: ['*']}}));

    const loadData = () => {
      const homeDirectoryId = localStorage.getItem(homeDirectoryIdKey) || loadedDirectoryId;

      const getField = name => {
        return directoryDb.get(name) || fieldDefaults[name];
      }
      const townName = getField('townName');
      const headline = getField('headline');
      const introText = getField('introText');

      const businessEntries = businessEntriesDb.query(_ => true);
      const categoriesOrEmpty = categoriesDb.query(_ => true);
      const categories = categoriesOrEmpty.length > 0 ? categoriesOrEmpty : fieldDefaults.categories;
      const requests = getRequests(requestsDb, businessEntries);
      
      return {
        // Meta-data
        loading: false,
        canWrite,
        loadedDirectoryId,
        homeDirectoryId,

        // Databases
        directoryDb,
        businessEntriesDb,
        categoriesDb,
        requestsDb,

        // Fields
        townName,
        headline,
        introText,

        // Sub-documents
        businessEntries,
        categories,
        requests
      };
    };

    dispatch(makeDirectoryAction(DirectoryActions.LoadEnd, loadData()));

    // Listen for changes in any of the stores
    const handleChange = () => dispatch(makeDirectoryAction(DirectoryActions.Change, loadData()));
    directoryDb.events.on('replicated', handleChange);
    businessEntriesDb.events.on('replicated', handleChange);
    categoriesDb.events.on('replicated', handleChange);
    requestsDb.events.on('replicated', handleChange);
  };
}

export function setDirectoryField(name: string, value: string) {
  return async (dispatch, getState) => {
    dispatch(makeDirectoryAction(DirectoryActions.SetField, { [name]: value }));
    const state = getState();
    const directoryDb = selectDirectoryDb(state);
    directoryDb.set(name, value);
  };
}

export function setHome() {
  return async (dispatch, getState) => {
    const state = getState();
    const homeDirectoryId = selectLoadedDirectoryId(state);
    localStorage.setItem(homeDirectoryIdKey, homeDirectoryId);
    dispatch(makeDirectoryAction(DirectoryActions.SetHome, { homeDirectoryId }));
  };
}

export function setHomeDirectoryId(homeDirectoryId: string) {
  return async (dispatch, _getState) => {
    localStorage.setItem(homeDirectoryIdKey, homeDirectoryId);
    dispatch(makeDirectoryAction(DirectoryActions.SetHome, { homeDirectoryId }));
  };
}

export function putCategory(category: Category) {
  return async (dispatch, getState) => {
    const state = getState();
    const categoriesDb = selectCategoriesDb(state);
    await categoriesDb.put(category);
    const categories = [...selectCategories(state).filter(x => x._id != category._id), category];
    dispatch(makeDirectoryAction(DirectoryActions.UpdateCategories, {categories}));
  };
}

export function putBusinessEntry(businessEntry: BusinessEntry) {
  return async (dispatch, getState) => {
    const state = getState();
    const businessEntriesDb = selectBusinessEntriesDb(state);
    await businessEntriesDb.put(businessEntry);
    const businessEntries = [...selectBusinessEntries(state).filter(x => !businessEntryIdEquals(x._id, businessEntry._id)), businessEntry];
    const requests = getRequests(selectRequestsDb(state), businessEntries);
    dispatch(makeDirectoryAction(DirectoryActions.UpdateBusinessEntries, {businessEntries, requests}));
  };
}

export function delBusinessEntry(businessEntryId: BusinessEntryId) {
  return async (dispatch, getState) => {
    const state = getState();
    const businessEntriesDb = selectBusinessEntriesDb(state);
    await businessEntriesDb.del(businessEntryId);
    const businessEntries = [...selectBusinessEntries(state).filter(x => !businessEntryIdEquals(x._id, businessEntryId))];
    const requests = getRequests(selectRequestsDb(state), businessEntries);
    dispatch(makeDirectoryAction(DirectoryActions.UpdateBusinessEntries, {businessEntries, requests}));
  };
}

export function addRequest(request: Request) {
  return async (dispatch, getState) => {
    const state = getState();
    const requestsDb = selectRequestsDb(state);
    await requestsDb.add(request);
    const requests = [...selectRequests(state), request];
    dispatch(makeDirectoryAction(DirectoryActions.UpdateRequests, {requests}));
  };
}
