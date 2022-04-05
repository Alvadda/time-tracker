import { Box, Stack, TextField } from '@mui/material'
import { useLayoutEffect, VFC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { TimesheetInfos } from '../../types'
import { selectTimesheetInfos, updateTimesheetInfoSettings } from '../settings/settingsSlice'

const TimeSheetInfos: VFC = ({}) => {
  const { register, getValues, setValue } = useForm<TimesheetInfos>()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const timeSheetinfos = useSelector(selectTimesheetInfos)

  useLayoutEffect(() => {
    setValue('fullName', timeSheetinfos?.fullName)
    setValue('street', timeSheetinfos?.street)
    setValue('zipCode', timeSheetinfos?.zipCode)
    setValue('city', timeSheetinfos?.city)

    return () => {
      dispatch(updateTimesheetInfoSettings(getValues()))
    }
  }, [dispatch, getValues, setValue, timeSheetinfos])

  return (
    <Box height={'100%'} overflow={'auto'} padding={2}>
      <Stack spacing={2} padding={2}>
        <TextField
          inputProps={{ 'data-testid': 'timesheetInfo_name' }}
          label={t('timesheetInfo.name')}
          variant="standard"
          {...register('fullName')}
        />
        <TextField
          inputProps={{ 'data-testid': 'timesheetInfo_street' }}
          label={t('timesheetInfo.street')}
          variant="standard"
          {...register('street')}
        />
        <TextField
          inputProps={{ 'data-testid': 'timesheetInfo_zipCode' }}
          label={t('timesheetInfo.zipCode')}
          variant="standard"
          {...register('zipCode')}
        />
        <TextField
          inputProps={{ 'data-testid': 'timesheetInfo_city' }}
          label={t('timesheetInfo.city')}
          variant="standard"
          {...register('city')}
        />
      </Stack>
    </Box>
  )
}

export default TimeSheetInfos
