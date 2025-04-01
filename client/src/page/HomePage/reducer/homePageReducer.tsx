/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from 'react';
import {
  actionsCreatorProps,
  homePageActions,
  homePageStates,
  ModeModel,
  reducerActionProps
} from '~/page/HomePage/types';

const homePageReducer = (state: homePageStates, action: reducerActionProps) => {
  switch (action.type) {
    case homePageActions.ON_OPEN_MODEL: {
      return {
        ...state,
        isModelOpen: action?.payload?.isModelOpen
      };
    }
    case homePageActions.ON_CHANGE_MODE_MODEL: {
      return {
        ...state,
        modeModel: action?.payload?.mode
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
    onOpenModel: (isModelOpen) => {
      dispatch({
        type: homePageActions.ON_OPEN_MODEL,
        payload: { isModelOpen }
      });
    },
    onChangeModeModel: (mode: ModeModel) => {
      dispatch({
        type: homePageActions.ON_CHANGE_MODE_MODEL,
        payload: { mode }
      });
    }
  };
};

const initialState: homePageStates = {
  isModelOpen: false,
  modeModel: ModeModel.CREATE
};

const useHomePageReducer: () => [homePageStates, actionsCreatorProps] = () => {
  const [state, dispatch] = useReducer(homePageReducer, initialState);

  const actions = actionCreators(dispatch);

  return [state, actions];
};

export { useHomePageReducer };
