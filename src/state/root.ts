import { combineReducers } from 'redux';
import databaseReducer from './reducers/database';
import directoryReducer from './reducers/directory';
import businessesReducer from './reducers/businesses';
import { DownloadableKeystore } from '../helpers/downloadable-keystore';

export interface ActionType {
  type: string;
  payload: any;
}

export interface Business {
  _id: number;
  name: string;
  description: string;
  url: string;
  tel: string;
  address: string;
  longitude: number;
  latitude: number;
  icon: string;
}

export interface Category {
  _id: string;
  headline: string;
}

export interface BusinessEntryId {
  businessesId: string;
  businessIdx: number;
}

export function businessEntryIdEquals(a: BusinessEntryId, b: BusinessEntryId): boolean {
  return a.businessesId == b.businessesId && a.businessIdx == b.businessIdx;
}

export interface BusinessEntry {
  _id: BusinessEntryId;
  category: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface Request {
  _id: string;
  idx: number;
}

const rootReducer = (combineReducers as any)({
  database: databaseReducer,
  directory: directoryReducer,
  businesses: businessesReducer
});

// Database

export function selectOrbitDBInstance(state): any {
  return state.database.orbitdb;
}

export function selectKeystore(state): DownloadableKeystore {
  return state.database.keystore;
}

export function selectId(state): string {
  return state.database.id;
}

// Directory

export function selectLoadedDirectoryId(state): string {
  return state.directory.loadedDirectoryId;
}

export function selectDirectoryDb(state): any {
  return state.directory.directoryDb;
}

export function selectCategoriesDb(state): any {
  return state.directory.categoriesDb;
}

export function selectBusinessEntriesDb(state): any {
  return state.directory.businessEntriesDb;
}

export function selectRequestsDb(state): any {
  return state.directory.requestsDb;
}

export function selectCategories(state): Category[] {
  return state.directory.categories;
}

export function selectBusinessEntries(state): BusinessEntry[] {
  return state.directory.businessEntries;
}

export function selectRequests(state): Request[] {
  return state.directory.requests;
}

// Businesses

export function selectLoadedBusinessesId(state): string {
  return state.businesses.loadedBusinessesId;
}

export function selectBusinessesDb(state): any {
  return state.businesses.businessesDb;
}

export function selectBusinesses(state): Business[] {
  return state.businesses.businesses;
}

export default rootReducer;