export function response(status:boolean,message:string,data,statusCode:number=200):any {
    return {
        data,
        message,
        status,
        statusCode
    }
}