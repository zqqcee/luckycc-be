interface ISuccessParams {
    msg?: string
    data?: unknown
}
interface IErrorParams {
    code?: number
    msg?: string
}
interface IResponse {
    code: number,
    msg: string,
    data?: unknown,
}

export const SuccessResp = ({ msg, data }: ISuccessParams = {}): IResponse => ({
    code: 0,
    msg: msg ?? 'success',
    data
})
export const ErrorResp = ({ msg, code = -1 }: IErrorParams = { code: -1 }): IResponse => ({
    code,
    msg: msg ?? 'error',
})
