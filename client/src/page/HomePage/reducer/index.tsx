/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from 'react';
import {
  actionsCreatorProps,
  homePageActions,
  homePageStates,
  reducerActionProps
} from '~/page/HomePage/types';

const homePageReducer = (state: homePageStates, action: reducerActionProps) => {
  switch (action.type) {
    case homePageActions.ON_POST: {
      return {
        ...state,
        isPostModelOpen: action?.payload?.isPostModelOpen
      };
    }
    default:
      break;
  }
  return state;
};

const actionCreators: (
  dispatch: (obj: reducerActionProps) => void
) => actionsCreatorProps = (dispatch) => {
  return {
    onPost: (isPostModelOpen) => {
      dispatch({
        type: homePageActions.ON_POST,
        payload: { isPostModelOpen }
      });
    }
  };
};

const initialState: homePageStates = {
  isPostModelOpen: false
};

const useHomePageReducer: () => [homePageStates, actionsCreatorProps] = () => {
  const [state, dispatch] = useReducer(homePageReducer, initialState);

  const actions = actionCreators(dispatch);

  return [state, actions];
};

export { useHomePageReducer };
