/*
 * @link https://stackoverflow.com/questions/60347361/jest-projects-in-a-monorepo-unable-to-find-config-files-in-projects
 */
import type { Config } from 'jest'

const config: Config = {
  projects: ['<rootDir>/apps/client', '<rootDir>/apps/server'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules'],
}

export default config
