/* --- STATE --- */
export interface BrowsePageState {
  playerIdSearched: string;
  platform: PlatformType;
  loading: boolean;
  error?: PlayerErrorType;
  playerFounds: Player[];
  players: Player[];
}

export interface Player {
  id: string;
  platform: PlatformType;
}

export enum PlatformType {
  ORIGIN = 'origin',
  PSN = 'psn',
  XBL = 'xbl',
}

export enum PlayerErrorType {
  RESPONSE_ERROR = 1,
  PLAYERS_NOT_FOUND = 2,
  PLAYER_ID_EMPTY = 3,
  APEX_API_RATE_LIMIT = 4,
}

// DTO from api
export interface PlayerSearchDto {
  additionalParameters: string;
  avatarUrl: string;
  platformId: number;
  platformSlug: PlatformType;
  platformUserHandle: string;
  platformUserId: string;
  platformUserIdentifier: string;
}

export type ContainerState = BrowsePageState;
