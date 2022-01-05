import { Card, CardContent, ListItem, ListItemButton, Typography } from '@mui/material'
import React, { VFC } from 'react'

interface SessionItemProps {
  displayDate: string
  project: string
  procectColor: string
  duration: string
  erning: number
}

const SessionItem: VFC<SessionItemProps> = ({ displayDate, project, procectColor, duration, erning }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <Card sx={{ width: '100%', color: procectColor }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {displayDate}
            </Typography>
            <Typography variant="h6" component="div" align="right">
              {project} {duration}H {erning}€
            </Typography>
          </CardContent>
        </Card>
      </ListItemButton>
    </ListItem>
  )
}

export default SessionItem
