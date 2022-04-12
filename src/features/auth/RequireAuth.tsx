import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { selectAuth } from './authSlice'

export const RequireAuth: FC = ({ children }) => {
  const auth = useSelector(selectAuth)
  const location = useLocation()

  if (!auth.uid) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
