import Ajv2019 from "ajv/dist/2019"
import extrafield_json from "../../data/extrafieldjson.json"

export const ajv = new Ajv2019({ allErrors: true })

const validate = ajv.compile(extrafield_json)

export default validate;

