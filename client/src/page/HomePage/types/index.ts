/* eslint-disable @typescript-eslint/no-explicit-any */
export interface homePageStates {
  isPostModelOpen: boolean;
}

export enum homePageActions {
  ON_POST = 'ON_POST'
}

export interface reducerActionProps {
  type: homePageActions.ON_POST;
  payload: any;
}

export interface actionsCreatorProps {
  onPost: (isPostModelOpen: boolean) => void;
}
