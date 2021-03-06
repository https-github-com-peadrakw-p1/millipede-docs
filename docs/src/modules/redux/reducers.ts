import { StateType } from 'typesafe-actions';

import animation from './features/animation/reducer';
import language from './features/language/reducer';
import navigation from './features/navigation/reducer';
import scroll from './features/scroll/reducer';
import theme from './features/theme/reducer';
import timeline from './features/timeline/reducer';
import view from './features/view/reducer';

const reducers = {
  animation,
  language,
  navigation,
  scroll,
  theme,
  timeline,
  view
};

export type RootState = StateType<typeof reducers>;

export type AnimationState = StateType<typeof animation>;
export type LanguageState = StateType<typeof language>;
export type NavigationState = StateType<typeof navigation>;
export type ScrollState = StateType<typeof scroll>;
export type ThemeState = StateType<typeof theme>;
export type TimelineState = StateType<typeof timeline>;
export type ViewState = StateType<typeof view>;

export type StoreState =
  | AnimationState
  | LanguageState
  | NavigationState
  | ScrollState
  | ThemeState
  | TimelineState
  | ViewState;

export default reducers;
