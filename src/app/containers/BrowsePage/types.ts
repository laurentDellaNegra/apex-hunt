/* --- STATE --- */
export interface BrowsePageState {
  playerIdSearched: string;
  loading: boolean;
  error?: string;
  playerFounds: Player[];
  players: Player[];
}

export interface Player {
  id: string;
  platform: PlatformType;
}

export enum PlatformType {
  ORIGIN = 1,
  PSN = 2,
  XBL = 3,
}

export type ContainerState = BrowsePageState;
