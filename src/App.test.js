import { render, cleanup, fireEvent } from '@testing-library/react'
import App from './App'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}))

afterEach(cleanup)

describe('App', () => {
    it('Checks header exists', () => {
      const { queryByTitle } = render(<App />);
      expect(queryByTitle('header')).toBeTruthy()
    })
    it('Checks logo link exists', () => {
      const { queryByTitle } = render(<App />);
      expect(queryByTitle('logoLink')).toBeTruthy()
    })
    it('Checks "Support" link exists', () => {
      const { queryByTitle } = render(<App />);
      expect(queryByTitle('supportLink')).toBeTruthy()
    })
    it('Checks logo exists', () => {
        const { queryByTitle } = render(<App />)
        expect(queryByTitle('supportLink').innerHTML).toBe('Support')
    })
    it('Redirects from logo link to correct URL on click', () => {
        const { queryByTitle } = render(<App />)
        fireEvent.click(queryByTitle('logoLink'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/')
    })
    it('Redirects from "Support" link to correct URL on click', () => {
      const { queryByTitle } = render(<App />)
      fireEvent.click(queryByTitle('supportLink'))
      expect(mockHistoryPush).toHaveBeenCalledWith('/support')
  })
})