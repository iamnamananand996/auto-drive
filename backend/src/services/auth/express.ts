import { Request, Response } from 'express'
import { UserWithOrganization } from '../../models/users/index.js'
import { AuthManager } from './index.js'

export const handleAuth = async (
  req: Request,
  res: Response,
): Promise<UserWithOrganization | null> => {
  const accessToken = req.headers.authorization?.split(' ')[1]
  if (!accessToken) {
    res.status(401).json({
      error: 'Missing or invalid access token',
    })
    return null
  }

  const provider = req.headers['x-auth-provider']
  if (typeof provider !== 'string') {
    res.status(401).json({
      error: 'Missing or invalid access token',
    })
    return null
  }

  const user = await AuthManager.getUserFromAccessToken(provider, accessToken)

  if (!user) {
    res.status(401).json({
      error: 'Failed to authenticate user',
    })
    return null
  }

  return user
}
