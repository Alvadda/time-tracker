import { Box, Card, CardContent, ListItem, ListItemButton, Typography } from '@mui/material'
import React, { VFC } from 'react'

interface SessionItemProps {
  displayDate: string
  project: string
  projectColor: string
  duration: string
  erning: number
}

const SessionItem: VFC<SessionItemProps> = ({ displayDate, project, projectColor, duration, erning }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <Card sx={{ width: '100%', padding: 1 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {displayDate}
            </Typography>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant="h6" component="div" align="right" color={projectColor}>
                {project}
              </Typography>
              <Typography variant="h6" component="div" align="right">
                {duration}H {erning}€
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </ListItemButton>
    </ListItem>
  )
}

export default SessionItem
