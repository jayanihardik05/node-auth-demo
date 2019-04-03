import { ApiResponseStatus } from '../common/common.enum';

export class Response {
    ResponseStatus: ApiResponseStatus;
    message: string;
    Data: any;
    token: any
}
