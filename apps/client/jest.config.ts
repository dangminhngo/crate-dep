/*
 * @link https://stackoverflow.com/questions/60347361/jest-projects-in-a-monorepo-unable-to-find-config-files-in-projects
 */
import type { Config } from 'jest'

const config: Config = {
  displayName: 'client',
  rootDir: './',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['./setup-test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
}

export default config
