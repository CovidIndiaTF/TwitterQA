import * as Airtable from 'airtable'

const instance = new Airtable({
    apiKey: process.env.airtable_key
}).base('appzo9fDle7O3x6GE')

export default instance
