/* eslint-disable @typescript-eslint/no-explicit-any */

export enum ModeModel {
  CREATE = 'create',
  EDIT = 'edit'
}
export interface homePageStates {
  isModelOpen: boolean;
  modeModel: ModeModel;
}

export enum homePageActions {
  ON_OPEN_MODEL = 'ON_OPEN_MODEL',
  ON_CHANGE_MODE_MODEL = 'ON_CHANGE_MODE_MODEL'
}

export interface reducerActionProps {
  type: homePageActions.ON_OPEN_MODEL | homePageActions.ON_CHANGE_MODE_MODEL;
  payload: any;
}

export interface actionsCreatorProps {
  onOpenModel: (isModelOpen: boolean) => void;
  onChangeModeModel: (mode: ModeModel) => void;
}
