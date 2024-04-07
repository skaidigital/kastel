type SuccessResponse<T> = {
  success: true;
  data?: T;
};

type ErrorResponse = {
  success: false;
  error: any;
};

export type Response<T> = SuccessResponse<T> | ErrorResponse;

export type SearchParams = { [key: string]: string };

export interface ConfiguratorImageProps {
  src: string;
  altText: string;
  type: 'product' | 'mood';
}

export type ConsentType = 'accept' | 'reject';

export interface TrackEventOptions {
  [key: string]: string | number | boolean;
}

export interface TrackEventProps {
  eventName: string;
  options?: TrackEventOptions;
}
