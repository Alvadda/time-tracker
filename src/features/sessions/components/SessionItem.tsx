/* eslint-disable @typescript-eslint/ban-types */
import { Box, Card, CardContent, Typography } from '@mui/material'
import React, { VFC } from 'react'
import { formatCurrency } from '../../../utils'

interface SessionItemProps {
  displayDate: string
  project: string
  projectColor: string
  duration: number
  erning: number
}

const SessionItem: VFC<SessionItemProps> = ({ displayDate, project, projectColor, duration, erning }) => {
  return (
    <Card sx={{ width: '100%', padding: 1 }} data-testid="session_card">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {displayDate}
        </Typography>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h6" component="div" align="right" color={projectColor}>
            {project}
          </Typography>
          <Typography variant="h6" component="div" align="right">
            {erning > 0 && formatCurrency(erning)} {duration}h
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default SessionItem
