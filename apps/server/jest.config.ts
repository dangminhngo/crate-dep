/*
 * @link https://stackoverflow.com/questions/60347361/jest-projects-in-a-monorepo-unable-to-find-config-files-in-projects
 */
import type { Config } from 'jest'

const config: Config = {
  displayName: 'client',
  rootDir: './',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
}

export default config
