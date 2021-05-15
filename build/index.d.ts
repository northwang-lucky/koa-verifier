import Koa from 'koa';
import { ParameterTranslateFunction, ParameterRules } from 'parameter';
declare module 'koa' {
    interface Request {
        body?: any;
    }
}
declare class Verifier {
    private static parameter;
    static register(translate?: ParameterTranslateFunction): Koa.Middleware;
    static validate(ctx: Koa.Context, rules: ParameterRules<any>, params?: unknown): void;
}
export default Verifier;
