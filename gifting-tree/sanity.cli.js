import dotenv from 'dotenv'
dotenv.config()

export default {
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET,
  useCdn: true,
  apiVersion: process.env.VITE_SANITY_API_VERSION
}
