import { Box, Card, CardContent, Typography } from '@mui/material'
import { VFC } from 'react'
import { useTranslation } from 'react-i18next'
import { formatCurrency } from '../../utils'
import { formatMinToHourMin } from '../../utils/timeUtil'

interface ProjectStatsOverviewProps {
  header: string
  headerColor?: string
  time: number
  earning: number
}

const ProjectStatsOverview: VFC<ProjectStatsOverviewProps> = ({ header, time, earning, headerColor = 'text.secondary' }) => {
  const { t } = useTranslation()
  return (
    <Card sx={{ width: '100%' }} data-testid="project_stats_card">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color={headerColor} gutterBottom data-testid="project_stats_header">
          {header}
        </Typography>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
            <Typography variant="h6" component="div" data-testid="project_stats_time">
              {t('common.hour')}
            </Typography>
            <Typography variant="h6" component="div" data-testid="project_stats_hours">
              {formatMinToHourMin(time)}
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
            <Typography variant="h6" component="div" data-testid="project_stats_earning">
              {t('overview.earning')}
            </Typography>
            <Typography variant="h6" component="div" data-testid="project_stats_earning_amount">
              {formatCurrency(earning)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProjectStatsOverview
