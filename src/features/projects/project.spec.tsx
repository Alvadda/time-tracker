import { Project } from '../../types/types'
import projectReducer, { addProject } from './projectsSlice'

describe('feature/project', () => {
  describe('reducer', () => {
    test('addProject', () => {
      const project: Project = {
        id: '123',
        name: 'project',
        color: '#fff',
      }

      const reducer = projectReducer(undefined, addProject(project))

      expect(reducer.projects.length).toEqual(1)
      expect(reducer.projects[0]).toEqual(project)
    })

    test('unknown action', () => {
      const reducer = projectReducer(undefined, { type: 'UNKNOWN' })

      expect(reducer).toEqual({ projects: [] })
    })
  })
})
