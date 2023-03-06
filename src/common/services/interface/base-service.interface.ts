interface IMetadata {
  total?: number;
  accessToken?: string;
}

interface BaseOk {
  status: number;
  metadata?: IMetadata;
}

export interface IOkStatus extends BaseOk {
  metadata?: IMetadata;
  message: string;
}

export interface IOkData<T> extends BaseOk {
  data: T;
  metadata: IMetadata;
}

export interface IFail extends BaseOk {
  status: number;
  message: string;
}
