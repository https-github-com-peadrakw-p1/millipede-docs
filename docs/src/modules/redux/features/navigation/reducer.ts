import pages from '../../../../pages';
import { StoreAction } from '../actionType';
import { CHANGE_NAVIGATION, SETUP_NAVIGATION } from './actionTypes';
import { Page } from './type';

interface ISType {
  activePage: Page;
  pages: Array<Page>;
}

export const initialState: ISType = {
  activePage: {
    pathname: "Test",
    title: ""
  },
  pages: pages
};

const navigationReducer = (state = initialState, action: StoreAction) => {
  switch (action.type) {
    case SETUP_NAVIGATION:
      return {
        ...state,
        pages: action.payload.newPages
      };
    case CHANGE_NAVIGATION:
      return {
        ...state,
        activePage: action.payload.newPage
      };
    default:
      return state;
  }
};

export default navigationReducer;