/* eslint-disable @typescript-eslint/no-explicit-any */

export interface BlogItemProps {
  _id: string;
  author: string;
  createdAt: string;
  attachment: string;
  title: string;
  content: string;
  likeCount: number;
}

export enum ModeModel {
  CREATE = 'create',
  EDIT = 'edit'
}
export interface homePageStates {
  isModelOpen: boolean;
  modeModel: ModeModel;
  blogDataUpdate?: BlogItemProps | null;
}

export enum homePageActions {
  ON_OPEN_MODEL = 'ON_OPEN_MODEL',
  ON_CHANGE_MODE_MODEL = 'ON_CHANGE_MODE_MODEL',
  ON_SELECT_BLOG_UPDATE = 'ON_SELECT_BLOG_UPDATE'
}

export interface reducerActionProps {
  type:
    | homePageActions.ON_OPEN_MODEL
    | homePageActions.ON_CHANGE_MODE_MODEL
    | homePageActions.ON_SELECT_BLOG_UPDATE;
  payload: any;
}

export interface actionsCreatorProps {
  onOpenModel: (isModelOpen: boolean) => void;
  onChangeModeModel: (mode: ModeModel) => void;
  onSelectBlogUpdate: (blog: BlogItemProps | null) => void;
}
