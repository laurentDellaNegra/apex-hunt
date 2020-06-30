import { PlayerOverview } from 'types/PlayerOverview';
import { Stat } from 'types/Stat';
import { Player } from 'types/Player';

/* --- STATE --- */
export interface DetailsPageState {
  loading: boolean;
  player?: Player;
  playerDetails?: PlayerDetails;
  error?: string;
}

export interface PlayerDetails extends PlayerOverview {
  countryCode: string;
  activeLegend: LegendEnum;
  segments: Segment[];
}

export interface Segment {
  legend: LegendEnum;
  imageUrl: string;
  tallImageUrl: string;
  bgImageUrl: string;
  stats: Stat[];
}

export interface LegendEnum {
  BENGALORE: 'Bengalore';
  BLOODHOUND: 'Bloodhound';
  CAUSTIC: 'Caustic';
  CRYPTO: 'Crypto';
  GIBRALTAR: 'Gibraltar';
  LIFELINE: 'Lifeline';
  LOBA: 'Loba';
  MIRAGE: 'Mirage';
  OCTANE: 'Octane';
  PATHFINDER: 'Pathfinder';
  REVENANT: 'Revenant';
  WATTSON: 'Wattson';
  WRAITH: 'Wraith';
}

export type ContainerState = DetailsPageState;
