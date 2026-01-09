var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}

// node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

// node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = /* @__PURE__ */ Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: ((arg) => ZodString.create({ ...arg, coerce: true })),
  number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
  boolean: ((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })),
  bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
  date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
};
var NEVER = INVALID;

// src/index.ts
import { exec } from "child_process";
var server = new McpServer({
  name: "android-gemini-extension",
  version: "1.1.0"
  // Version from package.json
});
function executeShellCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Command failed: ${command}`);
        console.error(`Error: ${error.message}`);
        reject(JSON.stringify({ error: "CommandExecutionError", message: stderr || error.message }));
        return;
      }
      if (stderr) {
        console.warn(`Command produced stderr: ${stderr}`);
      }
      resolve(stdout);
    });
  });
}
async function registerPythonTool(command) {
  try {
    const output = await executeShellCommand(command);
    return {
      content: [
        {
          type: "text",
          text: output
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: typeof error === "string" ? error : JSON.stringify(error)
        }
      ]
    };
  }
}
server.tool(
  "get_screen",
  "L\u1EA5y tr\u1EA1ng th\xE1i m\xE0n h\xECnh hi\u1EC7n t\u1EA1i c\u1EE7a thi\u1EBFt b\u1ECB Android d\u01B0\u1EDBi d\u1EA1ng JSON.",
  external_exports.object({}).shape,
  () => registerPythonTool(`python ${process.env.EXTENSION_PATH}/utils/get_screen.py`)
);
server.tool(
  "execute_action",
  "Th\u1EF1c hi\u1EC7n m\u1ED9t h\xE0nh \u0111\u1ED9ng tr\xEAn thi\u1EBFt b\u1ECB Android (tap, type, swipe, v.v.) d\u1EF1a tr\xEAn \u0111\u1ED1i t\u01B0\u1EE3ng JSON.",
  external_exports.object({
    action_json: external_exports.string().describe('\u0110\u1ED1i t\u01B0\u1EE3ng JSON m\xF4 t\u1EA3 h\xE0nh \u0111\u1ED9ng c\u1EA7n th\u1EF1c hi\u1EC7n, v\xED d\u1EE5: `{"action":"tap", "coordinates":[x,y], "reason":"..."}`')
  }).shape,
  ({ action_json }) => registerPythonTool(`python ${process.env.EXTENSION_PATH}/utils/execute_action.py --json '${action_json.replace(/'/g, `'`)}'`)
);
server.tool(
  "check_env",
  "Ki\u1EC3m tra m\xF4i tr\u01B0\u1EDDng ADB v\xE0 k\u1EBFt n\u1ED1i thi\u1EBFt b\u1ECB Android.",
  external_exports.object({}).shape,
  () => registerPythonTool(`python ${process.env.EXTENSION_PATH}/utils/check_env.py`)
);
server.tool(
  "find_element",
  "T\xECm ki\u1EBFm ph\u1EA7n t\u1EED UI tr\xEAn m\xE0n h\xECnh Android theo v\u0103n b\u1EA3n.",
  external_exports.object({
    text: external_exports.string().describe("V\u0103n b\u1EA3n c\u1EE7a ph\u1EA7n t\u1EED UI c\u1EA7n t\xECm.")
  }).shape,
  ({ text }) => registerPythonTool(`python ${process.env.EXTENSION_PATH}/utils/find_element.py --text '${text}'`)
);
server.tool(
  "manage_app",
  "Qu\u1EA3n l\xFD \u1EE9ng d\u1EE5ng Android (c\xE0i \u0111\u1EB7t, g\u1EE1 b\u1ECF, li\u1EC7t k\xEA).",
  external_exports.object({
    action: external_exports.enum(["install", "uninstall", "list"]).describe("H\xE0nh \u0111\u1ED9ng qu\u1EA3n l\xFD \u1EE9ng d\u1EE5ng."),
    package_name: external_exports.string().optional().describe("T\xEAn g\xF3i \u1EE9ng d\u1EE5ng (cho uninstall, list)."),
    file_path: external_exports.string().optional().describe("\u0110\u01B0\u1EDDng d\u1EABn \u0111\u1EBFn t\u1EC7p APK (cho install).")
  }).shape,
  ({ action, package_name, file_path }) => {
    let command = `python ${process.env.EXTENSION_PATH}/utils/manage_app.py --action ${action}`;
    if (package_name) {
      command += ` --package_name '${package_name}'`;
    }
    if (file_path) {
      command += ` --file_path '${file_path}'`;
    }
    return registerPythonTool(command);
  }
);
server.tool(
  "abi",
  "L\u1EA5y th\xF4ng tin ABI c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell getprop ro.product.cpu.abi.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell getprop ro.product.cpu.abi`)
);
server.tool(
  "airplane_off",
  "T\u1EAFt ch\u1EBF \u0111\u1ED9 m\xE1y bay tr\xEAn thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell settings put global airplane_mode_on 0; adb shell am broadcast -a android.intent.action.AIRPLANE_MODE --ez state false.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell settings put global airplane_mode_on 0; adb shell am broadcast -a android.intent.action.AIRPLANE_MODE --ez state false`)
);
server.tool(
  "airplane_on",
  "B\u1EADt ch\u1EBF \u0111\u1ED9 m\xE1y bay tr\xEAn thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell settings put global airplane_mode_on 1; adb shell am broadcast -a android.intent.action.AIRPLANE_MODE --ez state true.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell settings put global airplane_mode_on 1; adb shell am broadcast -a android.intent.action.AIRPLANE_MODE --ez state true`)
);
server.tool(
  "android_version",
  "L\u1EA5y phi\xEAn b\u1EA3n Android c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell getprop ro.build.version.release.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell getprop ro.build.version.release`)
);
server.tool(
  "anr_traces",
  "Hi\u1EC3n th\u1ECB c\xE1c d\u1EA5u v\u1EBFt ANR (Application Not Responding).\nV\xED d\u1EE5 th\u1EF1c thi: adb shell cat /data/anr/traces.txt.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell cat /data/anr/traces.txt`)
);
server.tool(
  "app_info",
  "Hi\u1EC3n th\u1ECB th\xF4ng tin chi ti\u1EBFt v\u1EC1 \u1EE9ng d\u1EE5ng (dumpsys).\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <package_name>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell dumpsys package <package_name>.",
  external_exports.object({
    package_name: external_exports.string().describe("T\xEAn g\xF3i \u1EE9ng d\u1EE5ng.")
  }).shape,
  ({ package_name }) => registerPythonTool(`adb shell dumpsys package ${package_name}`)
);
server.tool(
  "app_path",
  "L\u1EA5y \u0111\u01B0\u1EDDng d\u1EABn c\xE0i \u0111\u1EB7t c\u1EE7a \u1EE9ng d\u1EE5ng.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <package_name>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell pm path <package_name>.",
  external_exports.object({
    package_name: external_exports.string().describe("T\xEAn g\xF3i \u1EE9ng d\u1EE5ng.")
  }).shape,
  ({ package_name }) => registerPythonTool(`adb shell pm path ${package_name}`)
);
server.tool(
  "app_permissions",
  "Li\u1EC7t k\xEA c\xE1c quy\u1EC1n c\u1EE7a \u1EE9ng d\u1EE5ng.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <package_name>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell dumpsys package <package_name> | grep perm.",
  external_exports.object({
    package_name: external_exports.string().describe("T\xEAn g\xF3i \u1EE9ng d\u1EE5ng.")
  }).shape,
  ({ package_name }) => registerPythonTool(`adb shell dumpsys package ${package_name} | grep perm`)
);
server.tool(
  "back",
  "Nh\u1EA5n n\xFAt Back.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell input keyevent KEYCODE_BACK.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell input keyevent KEYCODE_BACK`)
);
server.tool(
  "battery_level",
  "Hi\u1EC3n th\u1ECB m\u1EE9c pin hi\u1EC7n t\u1EA1i c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell dumpsys battery | grep level.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell dumpsys battery | grep level`)
);
server.tool(
  "battery_reset",
  "\u0110\u1EB7t l\u1EA1i tr\u1EA1ng th\xE1i pin v\u1EC1 m\u1EB7c \u0111\u1ECBnh (y\xEAu c\u1EA7u quy\u1EC1n root).\nV\xED d\u1EE5 th\u1EF1c thi: adb shell dumpsys battery reset.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell dumpsys battery reset`)
);
server.tool(
  "battery_set_level",
  "\u0110\u1EB7t m\u1EE9c pin m\xF4 ph\u1ECFng (0-100, y\xEAu c\u1EA7u quy\u1EC1n root).\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <level>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell dumpsys battery set level <level>.",
  external_exports.object({
    level: external_exports.number().describe("M\u1EE9c pin (0-100).")
  }).shape,
  ({ level }) => registerPythonTool(`adb shell dumpsys battery set level ${level}`)
);
server.tool(
  "battery_status",
  "Hi\u1EC3n th\u1ECB tr\u1EA1ng th\xE1i pin c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell dumpsys battery | grep status.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell dumpsys battery | grep status`)
);
server.tool(
  "brand",
  "L\u1EA5y t\xEAn th\u01B0\u01A1ng hi\u1EC7u c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell getprop ro.product.brand.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell getprop ro.product.brand`)
);
server.tool(
  "brightness_auto",
  "Chuy\u1EC3n sang ch\u1EBF \u0111\u1ED9 \u0111\u1ED9 s\xE1ng t\u1EF1 \u0111\u1ED9ng.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell settings put system screen_brightness_mode 1.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell settings put system screen_brightness_mode 1`)
);
server.tool(
  "brightness_set",
  "\u0110\u1EB7t \u0111\u1ED9 s\xE1ng m\xE0n h\xECnh (0-255).\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <m\u1EE9c \u0111\u1ED9 s\xE1ng>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell settings put system screen_brightness <m\u1EE9c \u0111\u1ED9 s\xE1ng>.",
  external_exports.object({
    brightness_level: external_exports.number().describe("M\u1EE9c \u0111\u1ED9 s\xE1ng (0-255).")
  }).shape,
  ({ brightness_level }) => registerPythonTool(`adb shell settings put system screen_brightness ${brightness_level}`)
);
server.tool(
  "bugreport",
  "T\u1EA1o m\u1ED9t b\xE1o c\xE1o l\u1ED7i \u0111\u1EA7y \u0111\u1EE7.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb bugreport <path>.",
  external_exports.object({
    path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn l\u01B0u b\xE1o c\xE1o l\u1ED7i.")
  }).shape,
  ({ path }) => registerPythonTool(`adb bugreport ${path}`)
);
server.tool(
  "cat",
  "Hi\u1EC3n th\u1ECB n\u1ED9i dung c\u1EE7a t\u1EC7p.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <file_path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell cat /sdcard/file.txt.",
  external_exports.object({
    file_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn \u0111\u1EBFn t\u1EC7p.")
  }).shape,
  ({ file_path }) => registerPythonTool(`adb shell cat ${file_path}`)
);
server.tool(
  "charging_off",
  "T\u1EAFt m\xF4 ph\u1ECFng s\u1EA1c pin (y\xEAu c\u1EA7u quy\u1EC1n root).\nV\xED d\u1EE5 th\u1EF1c thi: adb shell dumpsys battery set ac 0; adb shell dumpsys battery set usb 0.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell dumpsys battery set ac 0; adb shell dumpsys battery set usb 0`)
);
server.tool(
  "charging_on",
  "B\u1EADt m\xF4 ph\u1ECFng s\u1EA1c pin (y\xEAu c\u1EA7u quy\u1EC1n root).\nV\xED d\u1EE5 th\u1EF1c thi: adb shell dumpsys battery set ac 1; adb shell dumpsys battery set usb 1.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell dumpsys battery set ac 1; adb shell dumpsys battery set usb 1`)
);
server.tool(
  "chmod",
  "Thay \u0111\u1ED5i quy\u1EC1n c\u1EE7a t\u1EC7p ho\u1EB7c th\u01B0 m\u1EE5c.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <permissions>, <path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell chmod 777 /sdcard/file.txt.",
  external_exports.object({
    permissions: external_exports.string().describe("Quy\u1EC1n (v\xED d\u1EE5: 777)."),
    path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn \u0111\u1EBFn t\u1EC7p ho\u1EB7c th\u01B0 m\u1EE5c.")
  }).shape,
  ({ permissions, path }) => registerPythonTool(`adb shell chmod ${permissions} ${path}`)
);
server.tool(
  "chown",
  "Thay \u0111\u1ED5i ch\u1EE7 s\u1EDF h\u1EEFu c\u1EE7a t\u1EC7p ho\u1EB7c th\u01B0 m\u1EE5c.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <owner:group>, <path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell chown root:root /sdcard/file.txt.",
  external_exports.object({
    owner_group: external_exports.string().describe("Ch\u1EE7 s\u1EDF h\u1EEFu v\xE0 nh\xF3m (v\xED d\u1EE5: root:root)."),
    path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn \u0111\u1EBFn t\u1EC7p ho\u1EB7c th\u01B0 m\u1EE5c.")
  }).shape,
  ({ owner_group, path }) => registerPythonTool(`adb shell chown ${owner_group} ${path}`)
);
server.tool(
  "clear_data",
  "X\xF3a d\u1EEF li\u1EC7u c\u1EE7a m\u1ED9t \u1EE9ng d\u1EE5ng.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <package_name>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell pm clear <package_name>.",
  external_exports.object({
    package_name: external_exports.string().describe("T\xEAn g\xF3i \u1EE9ng d\u1EE5ng.")
  }).shape,
  ({ package_name }) => registerPythonTool(`adb shell pm clear ${package_name}`)
);
server.tool(
  "connect",
  "K\u1EBFt n\u1ED1i thi\u1EBFt b\u1ECB Android v\u1EDBi m\xE1y t\xEDnh qua TCP/IP, cho ph\xE9p \u0111i\u1EC1u khi\u1EC3n thi\u1EBFt b\u1ECB kh\xF4ng d\xE2y. C\u1EA7n IP v\xE0 c\u1ED5ng c\u1EE7a thi\u1EBFt b\u1ECB. V\xED d\u1EE5: `adb connect 192.168.1.100:5555`.",
  external_exports.object({
    ip_port: external_exports.string().describe("\u0110\u1ECBa ch\u1EC9 IP v\xE0 c\u1ED5ng (v\xED d\u1EE5: 192.168.1.100:5555).")
  }).shape,
  ({ ip_port }) => registerPythonTool(`adb connect ${ip_port}`)
);
server.tool(
  "cp",
  "Sao ch\xE9p t\u1EC7p ho\u1EB7c th\u01B0 m\u1EE5c tr\xEAn thi\u1EBFt b\u1ECB.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <source_path>, <destination_path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell cp /sdcard/file.txt /sdcard/file_copy.txt.",
  external_exports.object({
    source_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn ngu\u1ED3n."),
    destination_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn \u0111\xEDch.")
  }).shape,
  ({ source_path, destination_path }) => registerPythonTool(`adb shell cp ${source_path} ${destination_path}`)
);
server.tool(
  "cpuinfo",
  "Hi\u1EC3n th\u1ECB th\xF4ng tin CPU c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell cat /proc/cpuinfo.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell cat /proc/cpuinfo`)
);
server.tool(
  "data_off",
  "T\u1EAFt d\u1EEF li\u1EC7u di \u0111\u1ED9ng tr\xEAn thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell svc data disable.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell svc data disable`)
);
server.tool(
  "data_on",
  "B\u1EADt d\u1EEF li\u1EC7u di \u0111\u1ED9ng tr\xEAn thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell svc data enable.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell svc data enable`)
);
server.tool(
  "developer_options_off",
  "T\u1EAFt t\xF9y ch\u1ECDn nh\xE0 ph\xE1t tri\u1EC3n.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell settings put global development_settings_enabled 0.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell settings put global development_settings_enabled 0`)
);
server.tool(
  "developer_options_on",
  "B\u1EADt t\xF9y ch\u1ECDn nh\xE0 ph\xE1t tri\u1EC3n (n\u1EBFu ch\u01B0a b\u1EADt).\nV\xED d\u1EE5 th\u1EF1c thi: adb shell settings put global development_settings_enabled 1.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell settings put global development_settings_enabled 1`)
);
server.tool(
  "devices",
  "Li\u1EC7t k\xEA t\u1EA5t c\u1EA3 c\xE1c thi\u1EBFt b\u1ECB Android (\u0111i\u1EC7n tho\u1EA1i, m\xE1y t\xEDnh b\u1EA3ng, gi\u1EA3 l\u1EADp) \u0111ang k\u1EBFt n\u1ED1i v\u1EDBi m\xE1y t\xEDnh qua USB ho\u1EB7c TCP/IP, hi\u1EC3n th\u1ECB tr\u1EA1ng th\xE1i k\u1EBFt n\u1ED1i. V\xED d\u1EE5: `adb devices`.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb devices`)
);
server.tool(
  "devices_long",
  "Li\u1EC7t k\xEA t\u1EA5t c\u1EA3 c\xE1c thi\u1EBFt b\u1ECB Android \u0111ang k\u1EBFt n\u1ED1i, bao g\u1ED3m th\xF4ng tin chi ti\u1EBFt nh\u01B0 model, s\u1EA3n ph\u1EA9m, v\xE0 transport ID. H\u1EEFu \xEDch \u0111\u1EC3 ph\xE2n bi\u1EC7t c\xE1c thi\u1EBFt b\u1ECB t\u01B0\u01A1ng t\u1EF1. V\xED d\u1EE5: `adb devices -l`.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb devices -l`)
);
server.tool(
  "disable_app",
  "V\xF4 hi\u1EC7u h\xF3a m\u1ED9t \u1EE9ng d\u1EE5ng.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <package_name>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell pm disable-user <package_name>.",
  external_exports.object({
    package_name: external_exports.string().describe("T\xEAn g\xF3i \u1EE9ng d\u1EE5ng.")
  }).shape,
  ({ package_name }) => registerPythonTool(`adb shell pm disable-user ${package_name}`)
);
server.tool(
  "disconnect",
  "Ng\u1EAFt k\u1EBFt n\u1ED1i v\u1EDBi thi\u1EBFt b\u1ECB Android qua TCP/IP.\nV\xED d\u1EE5 th\u1EF1c thi: adb disconnect.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb disconnect`)
);
server.tool(
  "disk_usage",
  "Hi\u1EC3n th\u1ECB th\xF4ng tin s\u1EED d\u1EE5ng b\u1ED9 nh\u1EDB trong c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell df -h.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell df -h`)
);
server.tool(
  "dns",
  "Hi\u1EC3n th\u1ECB c\u1EA5u h\xECnh DNS c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell getprop | grep dns.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell getprop | grep dns`)
);
server.tool(
  "du",
  "Hi\u1EC3n th\u1ECB dung l\u01B0\u1EE3ng s\u1EED d\u1EE5ng c\u1EE7a t\u1EC7p ho\u1EB7c th\u01B0 m\u1EE5c.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell du -h /sdcard.",
  external_exports.object({
    path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn \u0111\u1EBFn t\u1EC7p ho\u1EB7c th\u01B0 m\u1EE5c.")
  }).shape,
  ({ path }) => registerPythonTool(`adb shell du -h ${path}`)
);
server.tool(
  "dumpsys",
  "Hi\u1EC3n th\u1ECB th\xF4ng tin ch\u1EA9n \u0111o\xE1n h\u1EC7 th\u1ED1ng.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <service_name (t\xF9y ch\u1ECDn)>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell dumpsys activity.",
  external_exports.object({
    service_name: external_exports.string().optional().describe("T\xEAn d\u1ECBch v\u1EE5 (t\xF9y ch\u1ECDn).")
  }).shape,
  ({ service_name }) => {
    const command = `adb shell dumpsys ${service_name || ""}`;
    return registerPythonTool(command.trim());
  }
);
server.tool(
  "dumpsys_activity",
  "Hi\u1EC3n th\u1ECB th\xF4ng tin v\u1EC1 Activity Manager.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell dumpsys activity.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell dumpsys activity`)
);
server.tool(
  "dumpsys_package",
  "Hi\u1EC3n th\u1ECB th\xF4ng tin v\u1EC1 Package Manager.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell dumpsys package.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell dumpsys package`)
);
server.tool(
  "dumpsys_window",
  "Hi\u1EC3n th\u1ECB th\xF4ng tin v\u1EC1 Window Manager.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell dumpsys window.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell dumpsys window`)
);
server.tool(
  "enable_app",
  "B\u1EADt m\u1ED9t \u1EE9ng d\u1EE5ng \u0111\xE3 b\u1ECB v\xF4 hi\u1EC7u h\xF3a.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <package_name>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell pm enable <package_name>.",
  external_exports.object({
    package_name: external_exports.string().describe("T\xEAn g\xF3i \u1EE9ng d\u1EE5ng.")
  }).shape,
  ({ package_name }) => registerPythonTool(`adb shell pm enable ${package_name}`)
);
server.tool(
  "env",
  "Hi\u1EC3n th\u1ECB c\xE1c bi\u1EBFn m\xF4i tr\u01B0\u1EDDng c\u1EE7a shell.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell env.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell env`)
);
server.tool(
  "erase_partition",
  "X\xF3a m\u1ED9t ph\xE2n v\xF9ng tr\xEAn thi\u1EBFt b\u1ECB (y\xEAu c\u1EA7u fastboot).\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <partition>.\nV\xED d\u1EE5 th\u1EF1c thi: fastboot erase <partition> (L\u01B0u \xFD: L\u1EC7nh n\xE0y kh\xF4ng ph\u1EA3i adb, m\xE0 l\xE0 fastboot v\xE0 c\u1EA7n thi\u1EBFt b\u1ECB \u1EDF ch\u1EBF \u0111\u1ED9 bootloader).",
  external_exports.object({
    partition: external_exports.string().describe("T\xEAn ph\xE2n v\xF9ng.")
  }).shape,
  ({ partition }) => registerPythonTool(`fastboot erase ${partition}`)
);
server.tool(
  "find",
  'T\xECm ki\u1EBFm t\u1EC7p tr\xEAn thi\u1EBFt b\u1ECB.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <directory>, <t\xEAn t\u1EC7p/pattern>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell find /sdcard -name "*.jpg".',
  external_exports.object({
    directory: external_exports.string().describe("Th\u01B0 m\u1EE5c \u0111\u1EC3 t\xECm ki\u1EBFm."),
    file_pattern: external_exports.string().describe("T\xEAn t\u1EC7p ho\u1EB7c pattern.")
  }).shape,
  ({ directory, file_pattern }) => registerPythonTool(`adb shell find ${directory} -name "${file_pattern}"`)
  // Corrected escaping for file_pattern
);
server.tool(
  "flash_image",
  "Flash m\u1ED9t image v\xE0o thi\u1EBFt b\u1ECB (y\xEAu c\u1EA7u fastboot).\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <partition>, <image_file>.\nV\xED d\u1EE5 th\u1EF1c thi: fastboot flash <partition> <image_file> (L\u01B0u \xFD: L\u1EC7nh n\xE0y kh\xF4ng ph\u1EA3i adb, m\xE0 l\xE0 fastboot v\xE0 c\u1EA7n thi\u1EBFt b\u1ECB \u1EDF ch\u1EBF \u0111\u1ED9 bootloader).",
  external_exports.object({
    partition: external_exports.string().describe("T\xEAn ph\xE2n v\xF9ng."),
    image_file: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn \u0111\u1EBFn t\u1EC7p image.")
  }).shape,
  ({ partition, image_file }) => registerPythonTool(`fastboot flash ${partition} ${image_file}`)
);
server.tool(
  "force_stop",
  "Bu\u1ED9c d\u1EEBng m\u1ED9t \u1EE9ng d\u1EE5ng.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <package_name>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell am force-stop <package_name>.",
  external_exports.object({
    package_name: external_exports.string().describe("T\xEAn g\xF3i \u1EE9ng d\u1EE5ng.")
  }).shape,
  ({ package_name }) => registerPythonTool(`adb shell am force-stop ${package_name}`)
);
server.tool(
  "get_serial",
  "L\u1EA5y s\u1ED1 serial c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb get-serialno.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb get-serialno`)
);
server.tool(
  "get_state",
  "L\u1EA5y tr\u1EA1ng th\xE1i k\u1EBFt n\u1ED1i c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb get-state.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb get-state`)
);
server.tool(
  "getprop",
  "L\u1EA5y th\xF4ng tin thu\u1ED9c t\xEDnh h\u1EC7 th\u1ED1ng c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell getprop.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell getprop`)
);
server.tool(
  "grant_permission",
  "C\u1EA5p quy\u1EC1n cho \u1EE9ng d\u1EE5ng.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <package_name>, <permission>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell pm grant <package_name> android.permission.READ_CONTACTS.",
  external_exports.object({
    package_name: external_exports.string().describe("T\xEAn g\xF3i \u1EE9ng d\u1EE5ng."),
    permission: external_exports.string().describe("Quy\u1EC1n c\u1EA7n c\u1EA5p.")
  }).shape,
  ({ package_name, permission }) => registerPythonTool(`adb shell pm grant ${package_name} ${permission}`)
);
server.tool(
  "hardware",
  "L\u1EA5y th\xF4ng tin ph\u1EA7n c\u1EE9ng c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell getprop ro.hardware.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell getprop ro.hardware`)
);
server.tool(
  "head",
  "Hi\u1EC3n th\u1ECB nh\u1EEFng d\xF2ng \u0111\u1EA7u c\u1EE7a t\u1EC7p.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <file_path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell head /sdcard/file.txt.",
  external_exports.object({
    file_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn \u0111\u1EBFn t\u1EC7p.")
  }).shape,
  ({ file_path }) => registerPythonTool(`adb shell head ${file_path}`)
);
server.tool(
  "home",
  "Nh\u1EA5n n\xFAt Home.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell input keyevent KEYCODE_HOME.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell input keyevent KEYCODE_HOME`)
);
server.tool(
  "id",
  "Hi\u1EC3n th\u1ECB th\xF4ng tin ng\u01B0\u1EDDi d\xF9ng v\xE0 nh\xF3m.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell id.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell id`)
);
server.tool(
  "ifconfig",
  "Hi\u1EC3n th\u1ECB c\u1EA5u h\xECnh giao di\u1EC7n m\u1EA1ng.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell ifconfig.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell ifconfig`)
);
server.tool(
  "immersive_mode",
  "\u0110\u1EB7t \u1EE9ng d\u1EE5ng v\xE0o ch\u1EBF \u0111\u1ED9 nh\u1EADp vai to\xE0n m\xE0n h\xECnh.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <package_name>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell settings put global policy_control immersive.full=<package_name>.",
  external_exports.object({
    package_name: external_exports.string().describe("T\xEAn g\xF3i \u1EE9ng d\u1EE5ng.")
  }).shape,
  ({ package_name }) => registerPythonTool(`adb shell settings put global policy_control immersive.full=${package_name}`)
);
server.tool(
  "input_keyevent",
  "G\u1EEDi m\u1ED9t s\u1EF1 ki\u1EC7n ph\xEDm.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <m\xE3 ph\xEDm (KEY_CODE)>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell input keyevent KEYCODE_BACK.",
  external_exports.object({
    key_code: external_exports.string().describe("M\xE3 ph\xEDm (KEY_CODE).")
  }).shape,
  ({ key_code }) => registerPythonTool(`adb shell input keyevent ${key_code}`)
);
server.tool(
  "input_longpress",
  "Nh\u1EA5n gi\u1EEF m\u1ED9t v\u1ECB tr\xED tr\xEAn m\xE0n h\xECnh.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <x>, <y>, <th\u1EDDi gian (ms)>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell input swipe 500 1000 500 1000 1500.",
  external_exports.object({
    x: external_exports.number().describe("T\u1ECDa \u0111\u1ED9 X."),
    y: external_exports.number().describe("T\u1ECDa \u0111\u1ED9 Y."),
    duration_ms: external_exports.number().describe("Th\u1EDDi gian nh\u1EA5n gi\u1EEF (ms).")
  }).shape,
  ({ x, y, duration_ms }) => registerPythonTool(`adb shell input swipe ${x} ${y} ${x} ${y} ${duration_ms}`)
);
server.tool(
  "input_swipe",
  "Vu\u1ED1t tr\xEAn m\xE0n h\xECnh.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <x1>, <y1>, <x2>, <y2>, <th\u1EDDi gian (ms) (t\xF9y ch\u1ECDn)>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell input swipe 100 500 900 500 200.",
  external_exports.object({
    x1: external_exports.number().describe("T\u1ECDa \u0111\u1ED9 X b\u1EAFt \u0111\u1EA7u."),
    y1: external_exports.number().describe("T\u1ECDa \u0111\u1ED9 Y b\u1EAFt \u0111\u1EA7u."),
    x2: external_exports.number().describe("T\u1ECDa \u0111\u1ED9 X k\u1EBFt th\xFAc."),
    y2: external_exports.number().describe("T\u1ECDa \u0111\u1ED9 Y k\u1EBFt th\xFAc."),
    duration_ms: external_exports.number().optional().describe("Th\u1EDDi gian vu\u1ED1t (ms) (t\xF9y ch\u1ECDn).")
  }).shape,
  ({ x1, y1, x2, y2, duration_ms }) => {
    const duration_arg = duration_ms ? ` ${duration_ms}` : "";
    return registerPythonTool(`adb shell input swipe ${x1} ${y1} ${x2} ${y2}${duration_arg}`);
  }
);
server.tool(
  "input_tap",
  "Ch\u1EA1m v\xE0o m\u1ED9t v\u1ECB tr\xED tr\xEAn m\xE0n h\xECnh.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <x>, <y>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell input tap 500 1000.",
  external_exports.object({
    x: external_exports.number().describe("T\u1ECDa \u0111\u1ED9 X."),
    y: external_exports.number().describe("T\u1ECDa \u0111\u1ED9 Y.")
  }).shape,
  ({ x, y }) => registerPythonTool(`adb shell input tap ${x} ${y}`)
);
server.tool(
  "input_text",
  "Nh\u1EADp v\u0103n b\u1EA3n v\xE0o thi\u1EBFt b\u1ECB.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <v\u0103n b\u1EA3n>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell input text 'hello world'.",
  external_exports.object({
    text: external_exports.string().describe("V\u0103n b\u1EA3n c\u1EA7n nh\u1EADp.")
  }).shape,
  ({ text }) => registerPythonTool(`adb shell input text '${text}'`)
);
server.tool(
  "install",
  "C\xE0i \u0111\u1EB7t \u1EE9ng d\u1EE5ng t\u1EEB t\u1EC7p APK.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <\u0111\u01B0\u1EDDng d\u1EABn APK tr\xEAn m\xE1y t\xEDnh>.\nV\xED d\u1EE5 th\u1EF1c thi: adb install <\u0111\u01B0\u1EDDng d\u1EABn APK>.",
  external_exports.object({
    apk_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn APK tr\xEAn m\xE1y t\xEDnh.")
  }).shape,
  ({ apk_path }) => registerPythonTool(`adb install ${apk_path}`)
);
server.tool(
  "install_multiple",
  "C\xE0i \u0111\u1EB7t nhi\u1EC1u APK cho m\u1ED9t \u1EE9ng d\u1EE5ng.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <\u0111\u01B0\u1EDDng d\u1EABn \u0111\u1EBFn c\xE1c APK tr\xEAn m\xE1y t\xEDnh>.\nV\xED d\u1EE5 th\u1EF1c thi: adb install-multiple <path1.apk> <path2.apk>.",
  external_exports.object({
    apk_paths: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn \u0111\u1EBFn c\xE1c APK tr\xEAn m\xE1y t\xEDnh (c\xE1ch nhau b\u1EDFi d\u1EA5u c\xE1ch).")
  }).shape,
  ({ apk_paths }) => registerPythonTool(`adb install-multiple ${apk_paths}`)
);
server.tool(
  "install_replace",
  "C\xE0i \u0111\u1EB7t l\u1EA1i \u1EE9ng d\u1EE5ng, gi\u1EEF nguy\xEAn d\u1EEF li\u1EC7u.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <\u0111\u01B0\u1EDDng d\u1EABn APK tr\xEAn m\xE1y t\xEDnh>.\nV\xED d\u1EE5 th\u1EF1c thi: adb install -r <\u0111\u01B0\u1EDDng d\u1EABn APK>.",
  external_exports.object({
    apk_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn APK tr\xEAn m\xE1y t\xEDnh.")
  }).shape,
  ({ apk_path }) => registerPythonTool(`adb install -r ${apk_path}`)
);
server.tool(
  "ip_addr",
  "Hi\u1EC3n th\u1ECB \u0111\u1ECBa ch\u1EC9 IP c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell ip addr show wlan0.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell ip addr show wlan0`)
);
server.tool(
  "jobs",
  "Li\u1EC7t k\xEA c\xE1c c\xF4ng vi\u1EC7c trong shell.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell jobs.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell jobs`)
);
server.tool(
  "kill",
  "K\u1EBFt th\xFAc m\u1ED9t ti\u1EBFn tr\xECnh b\u1EB1ng PID.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <PID>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell kill <PID>.",
  external_exports.object({
    pid: external_exports.number().describe("PID c\u1EE7a ti\u1EBFn tr\xECnh.")
  }).shape,
  ({ pid }) => registerPythonTool(`adb shell kill ${pid}`)
);
server.tool(
  "kill_server",
  "D\u1EEBng ho\xE0n to\xE0n m\xE1y ch\u1EE7 ADB \u0111ang ch\u1EA1y tr\xEAn m\xE1y t\xEDnh. Th\u01B0\u1EDDng d\xF9ng \u0111\u1EC3 kh\u1EDFi \u0111\u1ED9ng l\u1EA1i m\xE1y ch\u1EE7 khi g\u1EB7p s\u1EF1 c\u1ED1 k\u1EBFt n\u1ED1i. V\xED d\u1EE5: `adb kill-server`.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb kill-server`)
);
server.tool(
  "killall",
  "K\u1EBFt th\xFAc t\u1EA5t c\u1EA3 c\xE1c ti\u1EBFn tr\xECnh c\xF3 t\xEAn c\u1EE5 th\u1EC3.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <t\xEAn ti\u1EBFn tr\xECnh>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell killall <t\xEAn ti\u1EBFn tr\xECnh>.",
  external_exports.object({
    process_name: external_exports.string().describe("T\xEAn ti\u1EBFn tr\xECnh.")
  }).shape,
  ({ process_name }) => registerPythonTool(`adb shell killall ${process_name}`)
);
server.tool(
  "layout_bounds",
  "Hi\u1EC3n th\u1ECB ranh gi\u1EDBi b\u1ED1 c\u1EE5c c\u1EE7a c\xE1c th\xE0nh ph\u1EA7n UI.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <0 (t\u1EAFt) ho\u1EB7c 1 (b\u1EADt)>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell setprop debug.layout true.",
  external_exports.object({
    state: external_exports.number().int().min(0).max(1).describe("Tr\u1EA1ng th\xE1i (0: t\u1EAFt, 1: b\u1EADt).")
  }).shape,
  ({ state }) => registerPythonTool(`adb shell setprop debug.layout ${state === 1 ? "true" : "false"}`)
);
server.tool(
  "less",
  "Xem n\u1ED9i dung c\u1EE7a t\u1EC7p theo t\u1EEBng trang (n\u1EBFu c\xF3 s\u1EB5n).\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <file_path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell less /sdcard/log.txt.",
  external_exports.object({
    file_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn \u0111\u1EBFn t\u1EC7p.")
  }).shape,
  ({ file_path }) => registerPythonTool(`adb shell less ${file_path}`)
);
server.tool(
  "list_packages",
  "Li\u1EC7t k\xEA t\u1EA5t c\u1EA3 c\xE1c g\xF3i \u1EE9ng d\u1EE5ng \u0111\xE3 c\xE0i \u0111\u1EB7t.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell pm list packages.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell pm list packages`)
);
server.tool(
  "list_packages_system",
  "Li\u1EC7t k\xEA c\xE1c g\xF3i \u1EE9ng d\u1EE5ng h\u1EC7 th\u1ED1ng \u0111\xE3 c\xE0i \u0111\u1EB7t.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell pm list packages -s.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell pm list packages -s`)
);
server.tool(
  "list_packages_user",
  "Li\u1EC7t k\xEA c\xE1c g\xF3i \u1EE9ng d\u1EE5ng \u0111\xE3 c\xE0i \u0111\u1EB7t cho ng\u01B0\u1EDDi d\xF9ng.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell pm list packages -3.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell pm list packages -3`)
);
server.tool(
  "locale",
  "L\u1EA5y ng\xF4n ng\u1EEF v\xE0 khu v\u1EF1c hi\u1EC7n t\u1EA1i c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell getprop persist.sys.locale.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell getprop persist.sys.locale`)
);
server.tool(
  "logcat",
  "Hi\u1EC3n th\u1ECB nh\u1EADt k\xFD logcat c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb logcat.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb logcat`)
);
server.tool(
  "logcat_clear",
  "X\xF3a nh\u1EADt k\xFD logcat hi\u1EC7n c\xF3.\nV\xED d\u1EE5 th\u1EF1c thi: adb logcat -c.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb logcat -c`)
);
server.tool(
  "logcat_file",
  "Ghi nh\u1EADt k\xFD logcat ra t\u1EC7p tr\xEAn m\xE1y t\xEDnh.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <local_file_path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb logcat -d > <local_file_path>.",
  external_exports.object({
    local_file_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn t\u1EC7p c\u1EE5c b\u1ED9 \u0111\u1EC3 l\u01B0u nh\u1EADt k\xFD.")
  }).shape,
  ({ local_file_path }) => registerPythonTool(`adb logcat -d > ${local_file_path}`)
);
server.tool(
  "logcat_tag",
  "L\u1ECDc nh\u1EADt k\xFD logcat theo tag.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <tag>.\nV\xED d\u1EE5 th\u1EF1c thi: adb logcat -s <tag>.",
  external_exports.object({
    tag: external_exports.string().describe("Tag \u0111\u1EC3 l\u1ECDc nh\u1EADt k\xFD.")
  }).shape,
  ({ tag }) => registerPythonTool(`adb logcat -s ${tag}`)
);
server.tool(
  "ls",
  "Li\u1EC7t k\xEA n\u1ED9i dung c\u1EE7a m\u1ED9t th\u01B0 m\u1EE5c.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <path (t\xF9y ch\u1ECDn)>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell ls /sdcard.",
  external_exports.object({
    path: external_exports.string().optional().describe("\u0110\u01B0\u1EDDng d\u1EABn \u0111\u1EBFn th\u01B0 m\u1EE5c (t\xF9y ch\u1ECDn).")
  }).shape,
  ({ path }) => {
    const command = `adb shell ls ${path || ""}`;
    return registerPythonTool(command.trim());
  }
);
server.tool(
  "manufacturer",
  "L\u1EA5y t\xEAn nh\xE0 s\u1EA3n xu\u1EA5t c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell getprop ro.product.manufacturer.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell getprop ro.product.manufacturer`)
);
server.tool(
  "media_scan",
  "Y\xEAu c\u1EA7u MediaScanner qu\xE9t l\u1EA1i th\u01B0 m\u1EE5c.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell am broadcast -a android.intent.action.MEDIA_MOUNTED -d file://<path>.",
  external_exports.object({
    path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn c\u1EA7n qu\xE9t.")
  }).shape,
  ({ path }) => registerPythonTool(`adb shell am broadcast -a android.intent.action.MEDIA_MOUNTED -d file://${path}`)
);
server.tool(
  "meminfo",
  "Hi\u1EC3n th\u1ECB th\xF4ng tin b\u1ED9 nh\u1EDB c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell cat /proc/meminfo.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell cat /proc/meminfo`)
);
server.tool(
  "mkdir",
  "T\u1EA1o th\u01B0 m\u1EE5c tr\xEAn thi\u1EBFt b\u1ECB.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <directory_path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell mkdir /sdcard/new_dir.",
  external_exports.object({
    directory_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn th\u01B0 m\u1EE5c.")
  }).shape,
  ({ directory_path }) => registerPythonTool(`adb shell mkdir ${directory_path}`)
);
server.tool(
  "model",
  "L\u1EA5y t\xEAn model c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell getprop ro.product.model.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell getprop ro.product.model`)
);
server.tool(
  "mount_ro",
  "Mount l\u1EA1i ph\xE2n v\xF9ng h\u1EC7 th\u1ED1ng \u1EDF ch\u1EBF \u0111\u1ED9 ch\u1EC9 \u0111\u1ECDc.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <partition_path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell mount -o ro,remount /system.",
  external_exports.object({
    partition_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn ph\xE2n v\xF9ng.")
  }).shape,
  ({ partition_path }) => registerPythonTool(`adb shell mount -o ro,remount ${partition_path}`)
);
server.tool(
  "mount_rw",
  "Mount l\u1EA1i ph\xE2n v\xF9ng h\u1EC7 th\u1ED1ng \u1EDF ch\u1EBF \u0111\u1ED9 \u0111\u1ECDc-ghi (y\xEAu c\u1EA7u quy\u1EC1n root).\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <partition_path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell mount -o rw,remount /system.",
  external_exports.object({
    partition_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn ph\xE2n v\xF9ng.")
  }).shape,
  ({ partition_path }) => registerPythonTool(`adb shell mount -o rw,remount ${partition_path}`)
);
server.tool(
  "mv",
  "Di chuy\u1EC3n ho\u1EB7c \u0111\u1ED5i t\xEAn t\u1EC7p/th\u01B0 m\u1EE5c tr\xEAn thi\u1EBFt b\u1ECB.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <source_path>, <destination_path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell mv /sdcard/old.txt /sdcard/new.txt.",
  external_exports.object({
    source_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn ngu\u1ED3n."),
    destination_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn \u0111\xEDch.")
  }).shape,
  ({ source_path, destination_path }) => registerPythonTool(`adb shell mv ${source_path} ${destination_path}`)
);
server.tool(
  "netstat",
  "Hi\u1EC3n th\u1ECB c\xE1c k\u1EBFt n\u1ED1i m\u1EA1ng v\xE0 th\u1ED1ng k\xEA.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell netstat.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell netstat`)
);
server.tool(
  "pair",
  "Gh\xE9p n\u1ED1i v\u1EDBi thi\u1EBFt b\u1ECB Android qua Wi-Fi.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <IP:PORT>, <m\xE3 gh\xE9p n\u1ED1i>.\nV\xED d\u1EE5 th\u1EF1c thi: adb pair <IP:PORT> <m\xE3 gh\xE9p n\u1ED1i>.",
  external_exports.object({
    ip_port: external_exports.string().describe("\u0110\u1ECBa ch\u1EC9 IP v\xE0 c\u1ED5ng."),
    pairing_code: external_exports.string().describe("M\xE3 gh\xE9p n\u1ED1i.")
  }).shape,
  ({ ip_port, pairing_code }) => registerPythonTool(`adb pair ${ip_port} ${pairing_code}`)
);
server.tool(
  "ping",
  "Ki\u1EC3m tra k\u1EBFt n\u1ED1i m\u1EA1ng \u0111\u1EBFn m\u1ED9t host.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <host>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell ping <host>.",
  external_exports.object({
    host: external_exports.string().describe("Host \u0111\u1EC3 ki\u1EC3m tra.")
  }).shape,
  ({ host }) => registerPythonTool(`adb shell ping ${host}`)
);
server.tool(
  "pointer_location",
  "Hi\u1EC3n th\u1ECB th\xF4ng tin v\u1ECB tr\xED con tr\u1ECF tr\xEAn m\xE0n h\xECnh.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <0 (t\u1EAFt) ho\u1EB7c 1 (b\u1EADt)>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell settings put system pointer_location 1.",
  external_exports.object({
    state: external_exports.number().int().min(0).max(1).describe("Tr\u1EA1ng th\xE1i (0: t\u1EAFt, 1: b\u1EADt).")
  }).shape,
  ({ state }) => registerPythonTool(`adb shell settings put system pointer_location ${state}`)
);
server.tool(
  "power",
  "Nh\u1EA5n n\xFAt ngu\u1ED3n (t\u1EAFt/m\u1EDF m\xE0n h\xECnh).\nV\xED d\u1EE5 th\u1EF1c thi: adb shell input keyevent KEYCODE_POWER.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell input keyevent KEYCODE_POWER`)
);
server.tool(
  "proxy_clear",
  "X\xF3a proxy HTTP to\xE0n c\u1EA7u.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell settings put global http_proxy :0.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell settings put global http_proxy :0`)
);
server.tool(
  "proxy_set",
  "\u0110\u1EB7t proxy HTTP to\xE0n c\u1EA7u.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <host>, <port>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell settings put global http_proxy <host>:<port>.",
  external_exports.object({
    host: external_exports.string().describe("\u0110\u1ECBa ch\u1EC9 host c\u1EE7a proxy."),
    port: external_exports.number().describe("C\u1ED5ng c\u1EE7a proxy.")
  }).shape,
  ({ host, port }) => registerPythonTool(`adb shell settings put global http_proxy ${host}:${port}`)
);
server.tool(
  "ps",
  "Li\u1EC7t k\xEA c\xE1c ti\u1EBFn tr\xECnh \u0111ang ch\u1EA1y tr\xEAn thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell ps.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell ps`)
);
server.tool(
  "pull",
  "Sao ch\xE9p t\u1EC7p ho\u1EB7c th\u01B0 m\u1EE5c t\u1EEB thi\u1EBFt b\u1ECB v\u1EC1 m\xE1y t\xEDnh.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <remote_path>, <local_path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb pull <remote_path> <local_path>.",
  external_exports.object({
    remote_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn t\u1EC7p/th\u01B0 m\u1EE5c tr\xEAn thi\u1EBFt b\u1ECB."),
    local_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn l\u01B0u tr\xEAn m\xE1y t\xEDnh.")
  }).shape,
  ({ remote_path, local_path }) => registerPythonTool(`adb pull ${remote_path} ${local_path}`)
);
server.tool(
  "pull_record",
  "K\xE9o t\u1EC7p ghi m\xE0n h\xECnh t\u1EEB thi\u1EBFt b\u1ECB v\u1EC1 m\xE1y t\xEDnh.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <remote_path>, <local_file_path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb pull /sdcard/demo.mp4 <local_file_path>.",
  external_exports.object({
    remote_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn t\u1EC7p ghi m\xE0n h\xECnh tr\xEAn thi\u1EBFt b\u1ECB."),
    local_file_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn l\u01B0u tr\xEAn m\xE1y t\xEDnh.")
  }).shape,
  ({ remote_path, local_file_path }) => registerPythonTool(`adb pull ${remote_path} ${local_file_path}`)
);
server.tool(
  "push",
  "Sao ch\xE9p t\u1EC7p ho\u1EB7c th\u01B0 m\u1EE5c t\u1EEB m\xE1y t\xEDnh l\xEAn thi\u1EBFt b\u1ECB.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <local_path>, <remote_path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb push <local_path> <remote_path>.",
  external_exports.object({
    local_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn t\u1EC7p/th\u01B0 m\u1EE5c tr\xEAn m\xE1y t\xEDnh."),
    remote_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn \u0111\xEDch tr\xEAn thi\u1EBFt b\u1ECB.")
  }).shape,
  ({ local_path, remote_path }) => registerPythonTool(`adb push ${local_path} ${remote_path}`)
);
server.tool(
  "reboot",
  "Kh\u1EDFi \u0111\u1ED9ng l\u1EA1i thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb reboot.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb reboot`)
);
server.tool(
  "reboot_bootloader",
  "Kh\u1EDFi \u0111\u1ED9ng l\u1EA1i thi\u1EBFt b\u1ECB v\xE0o ch\u1EBF \u0111\u1ED9 Bootloader.\nV\xED d\u1EE5 th\u1EF1c thi: adb reboot bootloader.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb reboot bootloader`)
);
server.tool(
  "reboot_recovery",
  "Kh\u1EDFi \u0111\u1ED9ng l\u1EA1i thi\u1EBFt b\u1ECB v\xE0o ch\u1EBF \u0111\u1ED9 Recovery.\nV\xED d\u1EE5 th\u1EF1c thi: adb reboot recovery.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb reboot recovery`)
);
server.tool(
  "recents",
  "M\u1EDF m\xE0n h\xECnh \u1EE9ng d\u1EE5ng g\u1EA7n \u0111\xE2y.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell input keyevent KEYCODE_APP_SWITCH.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell input keyevent KEYCODE_APP_SWITCH`)
);
server.tool(
  "remount",
  "Remount ph\xE2n v\xF9ng h\u1EC7 th\u1ED1ng \u0111\u1EC3 c\xF3 th\u1EC3 ghi (y\xEAu c\u1EA7u quy\u1EC1n root).\nV\xED d\u1EE5 th\u1EF1c thi: adb remount.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb remount`)
);
server.tool(
  "revoke_permission",
  "Thu h\u1ED3i quy\u1EC1n c\u1EE7a \u1EE9ng d\u1EE5ng.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <package_name>, <permission>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell pm revoke <package_name> android.permission.READ_CONTACTS.",
  external_exports.object({
    package_name: external_exports.string().describe("T\xEAn g\xF3i \u1EE9ng d\u1EE5ng."),
    permission: external_exports.string().describe("Quy\u1EC1n c\u1EA7n thu h\u1ED3i.")
  }).shape,
  ({ package_name, permission }) => registerPythonTool(`adb shell pm revoke ${package_name} ${permission}`)
);
server.tool(
  "rm",
  "X\xF3a t\u1EC7p tr\xEAn thi\u1EBFt b\u1ECB.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <file_path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell rm /sdcard/file.txt.",
  external_exports.object({
    file_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn \u0111\u1EBFn t\u1EC7p.")
  }).shape,
  ({ file_path }) => registerPythonTool(`adb shell rm ${file_path}`)
);
server.tool(
  "rmdir",
  "X\xF3a th\u01B0 m\u1EE5c r\u1ED7ng tr\xEAn thi\u1EBFt b\u1ECB.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <directory_path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell rmdir /sdcard/empty_dir.",
  external_exports.object({
    directory_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn th\u01B0 m\u1EE5c.")
  }).shape,
  ({ directory_path }) => registerPythonTool(`adb shell rmdir ${directory_path}`)
);
server.tool(
  "root",
  "Kh\u1EDFi \u0111\u1ED9ng l\u1EA1i ADB v\u1EDBi quy\u1EC1n root.\nV\xED d\u1EE5 th\u1EF1c thi: adb root.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb root`)
);
server.tool(
  "rotation_lock",
  "Kh\xF3a xoay m\xE0n h\xECnh \u1EDF ch\u1EBF \u0111\u1ED9 hi\u1EC7n t\u1EA1i.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell settings put system accelerometer_rotation 0.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell settings put system accelerometer_rotation 0`)
);
server.tool(
  "rotation_unlock",
  "M\u1EDF kh\xF3a xoay m\xE0n h\xECnh (cho ph\xE9p t\u1EF1 \u0111\u1ED9ng xoay).\nV\xED d\u1EE5 th\u1EF1c thi: adb shell settings put system accelerometer_rotation 1.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell settings put system accelerometer_rotation 1`)
);
server.tool(
  "route",
  "Hi\u1EC3n th\u1ECB b\u1EA3ng \u0111\u1ECBnh tuy\u1EBFn.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell route.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell route`)
);
server.tool(
  "screenrecord",
  "Quay video m\xE0n h\xECnh c\u1EE7a thi\u1EBFt b\u1ECB.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <th\u1EDDi gian (gi\xE2y)>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell screenrecord --time-limit <th\u1EDDi gian> /sdcard/demo.mp4.",
  external_exports.object({
    time_limit_seconds: external_exports.number().describe("Th\u1EDDi gian quay (gi\xE2y).")
  }).shape,
  ({ time_limit_seconds }) => registerPythonTool(`adb shell screenrecord --time-limit ${time_limit_seconds} /sdcard/demo.mp4`)
);
server.tool(
  "screenrecord_bitrate",
  "Quay video m\xE0n h\xECnh v\u1EDBi t\u1ED1c \u0111\u1ED9 bit c\u1EE5 th\u1EC3.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <bitrate (Mbps)>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell screenrecord --bit-rate <bitrate> /sdcard/demo.mp4.",
  external_exports.object({
    bitrate_mbps: external_exports.number().describe("T\u1ED1c \u0111\u1ED9 bit (Mbps).")
  }).shape,
  ({ bitrate_mbps }) => registerPythonTool(`adb shell screenrecord --bit-rate ${bitrate_mbps} /sdcard/demo.mp4`)
);
server.tool(
  "screenrecord_size",
  "Quay video m\xE0n h\xECnh v\u1EDBi k\xEDch th\u01B0\u1EDBc c\u1EE5 th\u1EC3.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <width x height>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell screenrecord --size <width>x<height> /sdcard/demo.mp4.",
  external_exports.object({
    width: external_exports.number().describe("Chi\u1EC1u r\u1ED9ng."),
    height: external_exports.number().describe("Chi\u1EC1u cao.")
  }).shape,
  ({ width, height }) => registerPythonTool(`adb shell screenrecord --size ${width}x${height} /sdcard/demo.mp4`)
);
server.tool(
  "screenshot",
  "Ch\u1EE5p \u1EA3nh m\xE0n h\xECnh c\u1EE7a thi\u1EBFt b\u1ECB v\xE0 l\u01B0u c\u1EE5c b\u1ED9.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <local_file_path (t\xF9y ch\u1ECDn)>.\nV\xED d\u1EE5 th\u1EF1c thi: adb exec-out screencap -p > <local_file_path>.",
  external_exports.object({
    local_file_path: external_exports.string().optional().describe("\u0110\u01B0\u1EDDng d\u1EABn t\u1EC7p c\u1EE5c b\u1ED9 \u0111\u1EC3 l\u01B0u \u1EA3nh (t\xF9y ch\u1ECDn).")
  }).shape,
  ({ local_file_path }) => {
    const output_redirect = local_file_path ? ` > ${local_file_path}` : "";
    return registerPythonTool(`adb exec-out screencap -p${output_redirect}`);
  }
);
server.tool(
  "sdk_version",
  "L\u1EA5y phi\xEAn b\u1EA3n SDK c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell getprop ro.build.version.sdk.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell getprop ro.build.version.sdk`)
);
server.tool(
  "selinux_enforcing",
  "\u0110\u1EB7t SELinux \u1EDF ch\u1EBF \u0111\u1ED9 Enforcing (ch\u1EB7n v\xE0 ghi log).\nV\xED d\u1EE5 th\u1EF1c thi: adb shell setenforce 1.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell setenforce 1`)
);
server.tool(
  "selinux_permissive",
  "\u0110\u1EB7t SELinux \u1EDF ch\u1EBF \u0111\u1ED9 Permissive (c\u1EA3nh b\xE1o nh\u01B0ng kh\xF4ng ch\u1EB7n).\nV\xED d\u1EE5 th\u1EF1c thi: adb shell setenforce 0.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell setenforce 0`)
);
server.tool(
  "selinux_status",
  "Hi\u1EC3n th\u1ECB tr\u1EA1ng th\xE1i SELinux.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell getenforce.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell getenforce`)
);
server.tool(
  "set_app_debuggable",
  "\u0110\u1EB7t \u1EE9ng d\u1EE5ng l\xE0 debuggable.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <package_name>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell am set-debug-app -w <package_name>.",
  external_exports.object({
    package_name: external_exports.string().describe("T\xEAn g\xF3i \u1EE9ng d\u1EE5ng.")
  }).shape,
  ({ package_name }) => registerPythonTool(`adb shell am set-debug-app -w ${package_name}`)
);
server.tool(
  "shell",
  "M\u1EDF m\u1ED9t shell t\u01B0\u01A1ng t\xE1c tr\xEAn thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell`)
);
server.tool(
  "show_touches",
  "Hi\u1EC3n th\u1ECB c\xE1c t\u01B0\u01A1ng t\xE1c ch\u1EA1m tr\xEAn m\xE0n h\xECnh (\u0111\u1EC3 g\u1EE1 l\u1ED7i UI).\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <0 (t\u1EAFt) ho\u1EB7c 1 (b\u1EADt)>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell settings put system show_touches 1.",
  external_exports.object({
    state: external_exports.number().int().min(0).max(1).describe("Tr\u1EA1ng th\xE1i (0: t\u1EAFt, 1: b\u1EADt).")
  }).shape,
  ({ state }) => registerPythonTool(`adb shell settings put system show_touches ${state}`)
);
server.tool(
  "shutdown",
  "T\u1EAFt thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell reboot -p.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell reboot -p`)
);
server.tool(
  "start_server",
  "Kh\u1EDFi \u0111\u1ED9ng m\xE1y ch\u1EE7 ADB tr\xEAn m\xE1y t\xEDnh. M\xE1y ch\u1EE7 n\xE0y l\xE0 th\xE0nh ph\u1EA7n n\u1EC1n c\u1EA7n thi\u1EBFt \u0111\u1EC3 giao ti\u1EBFp v\u1EDBi c\xE1c thi\u1EBFt b\u1ECB Android. V\xED d\u1EE5: `adb start-server`.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb start-server`)
);
server.tool(
  "stat",
  "Hi\u1EC3n th\u1ECB th\xF4ng tin tr\u1EA1ng th\xE1i t\u1EC7p ho\u1EB7c th\u01B0 m\u1EE5c.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell stat /sdcard/file.txt.",
  external_exports.object({
    path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn \u0111\u1EBFn t\u1EC7p ho\u1EB7c th\u01B0 m\u1EE5c.")
  }).shape,
  ({ path }) => registerPythonTool(`adb shell stat ${path}`)
);
server.tool(
  "stay_awake_off",
  "T\u1EAFt ch\u1EBF \u0111\u1ED9 m\xE0n h\xECnh lu\xF4n s\xE1ng.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell settings put global stay_on_while_plugged_in 0.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell settings put global stay_on_while_plugged_in 0`)
);
server.tool(
  "stay_awake_on",
  "Gi\u1EEF m\xE0n h\xECnh lu\xF4n s\xE1ng khi s\u1EA1c.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell settings put global stay_on_while_plugged_in 7.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell settings put global stay_on_while_plugged_in 7`)
);
server.tool(
  "su",
  "Ch\u1EA1y l\u1EC7nh v\u1EDBi quy\u1EC1n superuser (ch\u1EC9 tr\xEAn thi\u1EBFt b\u1ECB \u0111\xE3 root).\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <l\u1EC7nh>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell su -c '<l\u1EC7nh>'.",
  external_exports.object({
    command_to_execute: external_exports.string().describe("L\u1EC7nh c\u1EA7n ch\u1EA1y v\u1EDBi quy\u1EC1n superuser.")
  }).shape,
  ({ command_to_execute }) => registerPythonTool(`adb shell su -c '${command_to_execute}'`)
);
server.tool(
  "tail",
  "Hi\u1EC3n th\u1ECB nh\u1EEFng d\xF2ng cu\u1ED1i c\u1EE7a t\u1EC7p.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <file_path>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell tail -n 10 /sdcard/log.txt.",
  external_exports.object({
    file_path: external_exports.string().describe("\u0110\u01B0\u1EDDng d\u1EABn \u0111\u1EBFn t\u1EC7p.")
  }).shape,
  ({ file_path }) => registerPythonTool(`adb shell tail ${file_path}`)
);
server.tool(
  "tcpip",
  "Kh\u1EDFi \u0111\u1ED9ng l\u1EA1i ADB \u1EDF ch\u1EBF \u0111\u1ED9 TCP/IP tr\xEAn m\u1ED9t c\u1ED5ng c\u1EE5 th\u1EC3.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <port>.\nV\xED d\u1EE5 th\u1EF1c thi: adb tcpip <port>.",
  external_exports.object({
    port: external_exports.number().describe("C\u1ED5ng \u0111\u1EC3 kh\u1EDFi \u0111\u1ED9ng l\u1EA1i ADB.")
  }).shape,
  ({ port }) => registerPythonTool(`adb tcpip ${port}`)
);
server.tool(
  "thermal",
  "Hi\u1EC3n th\u1ECB th\xF4ng tin nhi\u1EC7t \u0111\u1ED9 c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell dumpsys thermalservice.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell dumpsys thermalservice`)
);
server.tool(
  "timezone",
  "L\u1EA5y m\xFAi gi\u1EDD hi\u1EC7n t\u1EA1i c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell getprop persist.sys.timezone.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell getprop persist.sys.timezone`)
);
server.tool(
  "tombstones",
  "Li\u1EC7t k\xEA c\xE1c t\u1EC7p tombstones (th\xF4ng tin l\u1ED7i \u1EE9ng d\u1EE5ng).\nV\xED d\u1EE5 th\u1EF1c thi: adb shell ls /data/tombstones.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell ls /data/tombstones`)
);
server.tool(
  "top",
  "Hi\u1EC3n th\u1ECB c\xE1c ti\u1EBFn tr\xECnh \u0111ang s\u1EED d\u1EE5ng nhi\u1EC1u t\xE0i nguy\xEAn nh\u1EA5t.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell top -n 1.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell top -n 1`)
);
server.tool(
  "tree",
  "Hi\u1EC3n th\u1ECB c\u1EA5u tr\xFAc c\xE2y th\u01B0 m\u1EE5c (n\u1EBFu c\xF3 s\u1EB5n).\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <path (t\xF9y ch\u1ECDn)>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell tree /sdcard.",
  external_exports.object({
    path: external_exports.string().optional().describe("\u0110\u01B0\u1EDDng d\u1EABn \u0111\u1EBFn th\u01B0 m\u1EE5c (t\xF9y ch\u1ECDn).")
  }).shape,
  ({ path }) => {
    const command = `adb shell tree ${path || ""}`;
    return registerPythonTool(command.trim());
  }
);
server.tool(
  "uninstall",
  "G\u1EE1 c\xE0i \u0111\u1EB7t m\u1ED9t \u1EE9ng d\u1EE5ng.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <package_name>.\nV\xED d\u1EE5 th\u1EF1c thi: adb uninstall <package_name>.",
  external_exports.object({
    package_name: external_exports.string().describe("T\xEAn g\xF3i \u1EE9ng d\u1EE5ng.")
  }).shape,
  ({ package_name }) => registerPythonTool(`adb uninstall ${package_name}`)
);
server.tool(
  "unroot",
  "Kh\u1EDFi \u0111\u1ED9ng l\u1EA1i ADB kh\xF4ng c\xF3 quy\u1EC1n root.\nV\xED d\u1EE5 th\u1EF1c thi: adb unroot.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb unroot`)
);
server.tool(
  "uptime",
  "Hi\u1EC3n th\u1ECB th\u1EDDi gian ho\u1EA1t \u0111\u1ED9ng c\u1EE7a thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell uptime.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell uptime`)
);
server.tool(
  "usb",
  "Chuy\u1EC3n ADB sang ch\u1EBF \u0111\u1ED9 USB.\nV\xED d\u1EE5 th\u1EF1c thi: adb usb.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb usb`)
);
server.tool(
  "verify_apps_off",
  "T\u1EAFt x\xE1c minh \u1EE9ng d\u1EE5ng qua ADB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell settings put global verify_apps_over_adb 0.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell settings put global verify_apps_over_adb 0`)
);
server.tool(
  "verify_apps_on",
  "B\u1EADt x\xE1c minh \u1EE9ng d\u1EE5ng qua ADB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell settings put global verify_apps_over_adb 1.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell settings put global verify_apps_over_adb 1`)
);
server.tool(
  "volume_down",
  "Gi\u1EA3m \xE2m l\u01B0\u1EE3ng.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell input keyevent KEYCODE_VOLUME_DOWN.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell input keyevent KEYCODE_VOLUME_DOWN`)
);
server.tool(
  "volume_mute",
  "T\u1EAFt/b\u1EADt ti\u1EBFng.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell input keyevent KEYCODE_VOLUME_MUTE.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell input keyevent KEYCODE_VOLUME_MUTE`)
);
server.tool(
  "volume_up",
  "T\u0103ng \xE2m l\u01B0\u1EE3ng.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell input keyevent KEYCODE_VOLUME_UP.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell input keyevent KEYCODE_VOLUME_UP`)
);
server.tool(
  "wait_device",
  "Ch\u1EDD \u0111\u1EE3i thi\u1EBFt b\u1ECB \u0111\u01B0\u1EE3c k\u1EBFt n\u1ED1i.\nV\xED d\u1EE5 th\u1EF1c thi: adb wait-for-device.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb wait-for-device`)
);
server.tool(
  "whoami",
  "Hi\u1EC3n th\u1ECB t\xEAn ng\u01B0\u1EDDi d\xF9ng hi\u1EC7n t\u1EA1i.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell whoami.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell whoami`)
);
server.tool(
  "wifi_off",
  "T\u1EAFt Wi-Fi tr\xEAn thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell svc wifi disable.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell svc wifi disable`)
);
server.tool(
  "wifi_on",
  "B\u1EADt Wi-Fi tr\xEAn thi\u1EBFt b\u1ECB.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell svc wifi enable.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell svc wifi enable`)
);
server.tool(
  "wm_density",
  "Hi\u1EC3n th\u1ECB ho\u1EB7c \u0111\u1EB7t m\u1EADt \u0111\u1ED9 DPI m\xE0n h\xECnh.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <density (dpi) (t\xF9y ch\u1ECDn)>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell wm density 480.",
  external_exports.object({
    density_dpi: external_exports.number().optional().describe("M\u1EADt \u0111\u1ED9 DPI (t\xF9y ch\u1ECDn).")
  }).shape,
  ({ density_dpi }) => {
    const density_arg = density_dpi !== void 0 ? ` ${density_dpi}` : "";
    return registerPythonTool(`adb shell wm density${density_arg}`);
  }
);
server.tool(
  "wm_reset",
  "\u0110\u1EB7t l\u1EA1i k\xEDch th\u01B0\u1EDBc v\xE0 m\u1EADt \u0111\u1ED9 m\xE0n h\xECnh v\u1EC1 m\u1EB7c \u0111\u1ECBnh.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell wm size reset; adb shell wm density reset.",
  external_exports.object({}).shape,
  () => registerPythonTool(`adb shell wm size reset; adb shell wm density reset`)
);
server.tool(
  "wm_size",
  "Hi\u1EC3n th\u1ECB ho\u1EB7c \u0111\u1EB7t k\xEDch th\u01B0\u1EDBc m\xE0n h\xECnh.\nNh\u1EADp c\xE1c tham s\u1ED1 sau: <width x height (t\xF9y ch\u1ECDn)>.\nV\xED d\u1EE5 th\u1EF1c thi: adb shell wm size 1080x1920.",
  external_exports.object({
    width: external_exports.number().optional().describe("Chi\u1EC1u r\u1ED9ng."),
    height: external_exports.number().optional().describe("Chi\u1EC1u cao.")
  }).shape,
  ({ width, height }) => {
    const size_arg = width !== void 0 && height !== void 0 ? ` ${width}x${height}` : "";
    return registerPythonTool(`adb shell wm size${size_arg}`);
  }
);
async function startServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
startServer();
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
