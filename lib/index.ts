import Koa from 'koa'
import Parameter, { ParameterTranslateFunction, ParameterRules } from 'parameter'

declare module 'koa' {
  interface Request {
    body?: any
  }
}

class Verifier {
  private static parameter: Parameter

  public static register(translate?: ParameterTranslateFunction): Koa.Middleware {
    if (typeof translate === 'function') {
      this.parameter = new Parameter({ translate })
    } else {
      this.parameter = new Parameter()
    }

    return async function (ctx, next) {
      try {
        await next()
      } catch (error) {
        if (error.code === 'INVALID_PARAM') {
          ctx.status = 422
          ctx.body = {
            message: error.message,
            errors: error.errors,
            params: error.params
          }
          return
        }
        throw error
      }
    }
  }

  public static validate(ctx: Koa.Context, rules: ParameterRules<any>, params?: unknown): void {
    if (!rules) {
      return
    }

    if (!params) {
      params = ['GET', 'HEAD'].includes(ctx.method.toUpperCase())
        ? ctx.request.query
        : ctx.request.body
      // copy
      params = Object.assign({}, params, ctx.params)
    }

    if (!this.parameter) {
      console.warn(
        "It seems that the koa-verifier hasn't been registerd as a middleware, " +
          'Please use Verifier.register() to register first, and then verify the parameters'
      )
      return
    }
    const errors = this.parameter.validate(rules, params)
    if (!errors) {
      return
    }
    ctx.throw(422, 'Validation Failed', {
      code: 'INVALID_PARAM',
      errors,
      params
    })
  }
}

module.exports = Verifier
export default Verifier
