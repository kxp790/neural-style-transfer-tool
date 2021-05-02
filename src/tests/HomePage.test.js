import { render, cleanup, fireEvent } from '@testing-library/react'
import HomePage from '../components/HomePage'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}))

afterEach(cleanup)

describe('StartNewButton', () => {
    it('Checks "Start New" button exists', () => {
        const { queryByTitle } = render(<HomePage />)
        expect(queryByTitle('startNewButton')).toBeTruthy()
    })
    it('Checks "Start New" button has the correct label', () => {
        const { queryByTitle } = render(<HomePage />)
        expect(queryByTitle('startNewButton').innerHTML).toBe('Start New')
    })
    it('Redirects to correct URL on click', () => {
        const { queryByTitle } = render(<HomePage />)
        fireEvent.click(queryByTitle('startNewButton'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/new_design')
    })
})


describe('ResumePreviousButton', () => {
    it('Checks "Resume Previous" button exists', () => {
        const { queryByTitle } = render(<HomePage />)
        expect(queryByTitle('resumePreviousButton')).toBeTruthy
    })
    it('Checks "Resume Previous" button has the correct label', () => {
        const { queryByTitle } = render(<HomePage />)
        expect(queryByTitle('resumePreviousButton').innerHTML).toBe('Resume Previous')
    })
    it('Redirects to correct URL on click', () => {
        const { queryByTitle } = render(<HomePage />)
        fireEvent.click(queryByTitle('resumePreviousButton'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/resume_design')
    })
})
