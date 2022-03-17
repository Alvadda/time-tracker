import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Typography } from '@mui/material'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { VFC } from 'react'
import { ProjectStats } from '../../types'
import { APP_WIDTH } from '../../utils/constants '
import TimesheetPdf from './TimesheetPdf'

interface TimesheetProps {
  projectStats: ProjectStats
  period: string
  onClose: () => void
}

const Timesheet: VFC<TimesheetProps> = ({ onClose, projectStats, period }) => {
  return (
    <Box
      sx={{
        width: APP_WIDTH,
        height: '100vh',
        position: 'absolute',
        inset: '0',
        zIndex: 100,
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ flex: '0 0 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} position={'relative'}>
        <Button
          variant="text"
          data-testid="overview_stats_back"
          sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
          onClick={() => onClose()}
        >
          <CloseIcon fontSize="medium" />
        </Button>
        <Typography variant="h6" data-testid="overwiev_project_header">
          Test
        </Typography>
      </Box>
      <Box sx={{ flex: '1' }}>
        <PDFViewer height={'90%'} width={'100%'}>
          <TimesheetPdf period={period} projectStats={projectStats} />
        </PDFViewer>
        <Box sx={{ flex: '0 1 auto', padding: '16px 16px', display: 'flex', justifyContent: 'center' }}>
          <PDFDownloadLink document={<TimesheetPdf period={period} projectStats={projectStats} />} fileName="etest.pdf">
            {({ loading }) => (loading ? 'downloading...' : <Button variant="contained"> Download </Button>)}
          </PDFDownloadLink>
        </Box>
      </Box>
    </Box>
  )
}

export default Timesheet
