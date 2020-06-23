import { PlatformEnum } from 'types/PlatformEnum';
import { Player } from 'types/Player';

/* --- STATE --- */
export interface SearchFormState {
  playerIdSearched: string;
  platform: PlatformEnum;
  loading: boolean;
  error?: PlayerErrorType;
  playerFounds: Player[];
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
  platformSlug: PlatformEnum;
  platformUserHandle: string;
  platformUserId: string;
  platformUserIdentifier: string;
}

export type ContainerState = SearchFormState;
