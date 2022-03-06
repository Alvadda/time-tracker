import { Box, Card, CardContent, Typography } from '@mui/material'
import { VFC } from 'react'
import { formatMinToHourMin } from '../../utils/timeUtil'

interface ProjectStatsOverviewProps {
  header: string
  headerColor?: string
  time: number
  earning: number
}

const ProjectStatsOverview: VFC<ProjectStatsOverviewProps> = ({ header, time, earning, headerColor = 'text.secondary' }) => {
  return (
    <Card sx={{ width: '100%' }} data-testid="project_stats_card">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color={headerColor} gutterBottom data-testid="project_stats_header">
          {header}
        </Typography>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
            <Typography variant="h6" component="div" data-testid="project_stats_time">
              Working Time
            </Typography>
            <Typography variant="h6" component="div" data-testid="project_stats_hours">
              {formatMinToHourMin(time)} Hours
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
            <Typography variant="h6" component="div" data-testid="project_stats_earning">
              Earning
            </Typography>
            <Typography variant="h6" component="div" data-testid="project_stats_earning_amount">
              {earning.toFixed(2)}€
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProjectStatsOverview
