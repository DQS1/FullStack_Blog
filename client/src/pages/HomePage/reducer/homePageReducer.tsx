/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from 'react';
import {
  actionsCreatorProps,
  BlogItemProps,
  homePageActions,
  homePageStates,
  ModeModel,
  reducerActionProps
} from '~/pages/HomePage/types';

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
    case homePageActions.ON_SELECT_BLOG_UPDATE: {
      return {
        ...state,
        blogDataUpdate: action?.payload
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
    },
    onSelectBlogUpdate: (blog: BlogItemProps) => {
      dispatch({
        type: homePageActions.ON_SELECT_BLOG_UPDATE,
        payload: blog
      });
    }
  };
};

const initialState: homePageStates = {
  isModelOpen: false,
  modeModel: ModeModel.CREATE,
  blogDataUpdate: null
};

const useHomePageReducer: () => [homePageStates, actionsCreatorProps] = () => {
  const [state, dispatch] = useReducer(homePageReducer, initialState);

  const actions = actionCreators(dispatch);

  return [state, actions];
};

export { useHomePageReducer };
