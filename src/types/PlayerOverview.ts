import { Player } from './Player';
import { Stat } from './Stat';

export interface PlayerOverview extends Player {
  isLoading: boolean;
  error?: string;
  avatarUrl?: string;
  stats?: Stat[];
}
