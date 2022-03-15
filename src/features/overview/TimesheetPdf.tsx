import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import moment from 'moment'
import React, { useMemo, VFC } from 'react'
import { ProjectStats } from '../../types'
import { mergeDaysTogether } from '../sessions/sessionUtils'

interface TimesheetPdfProps {
  projectStats: ProjectStats
  period: string
}

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingVertical: 60,
    paddingHorizontal: 35,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  table: {
    flexDirection: 'column',
    marginTop: 60,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  tablefooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    border: '1px solid black',
    borderTop: '2px solid black',
  },
  tableContent: {
    alignItems: 'center',
    height: 25,
    flexDirection: 'row',
    border: '1px solid black',
    borderBottom: 'none',
  },
  tableCell: {
    flex: '1',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tableCenterCell: {
    height: '100%',
    flex: '3',
    borderRight: '1px solid black',
    borderLeft: '1px solid black',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  fontSizeSmall: {
    fontSize: 12,
  },
  fontSizeMedium: {
    fontSize: 14,
  },
  fontSizeBoldMedium: {
    fontSize: 14,
    fontWeight: 700,
  },
  fontSizeBig: {
    fontSize: 32,
  },
  fontSizeBigMedium: {
    fontSize: 20,
  },
  marginRight: {
    marginRight: 40,
  },
})

export const TimesheetPdf: VFC<TimesheetPdfProps> = ({ projectStats, period }) => {
  const margedDays = useMemo(() => mergeDaysTogether(projectStats.sessions), [projectStats.sessions])

  const getPariod = () => {
    const firstDay = moment(margedDays[0].start)
    const lastDay = moment(margedDays.at(-1)?.start)

    return firstDay.isSame(lastDay, 'month') ? firstDay.format('MMMM') : `${firstDay.format('MMMM')} - ${lastDay.format('MMMM')}`
  }

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        {/* Header area */}
        <View style={styles.header}>
          <View style={styles.column}>
            <Text style={styles.fontSizeBig}>Zeitnachweis</Text>
            <Text style={styles.fontSizeBigMedium}>{getPariod()}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.fontSizeMedium}>Christian Pansch</Text>
            <Text style={styles.fontSizeMedium}>Mustermann str. 9b</Text>
            <Text style={styles.fontSizeMedium}>21217 Hamburg</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.column, styles.marginRight]}>
            <Text style={styles.fontSizeBoldMedium}>Kunde:</Text>
            <Text style={styles.fontSizeBoldMedium}>Projekt:</Text>
            <Text style={styles.fontSizeBoldMedium}>Zeitraum:</Text>
            <Text style={styles.fontSizeBoldMedium}>Ort:</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.fontSizeMedium}>{projectStats.customer?.name || ' '}</Text>
            <Text style={styles.fontSizeMedium}>{projectStats.project.name || ' '}</Text>
            <Text style={styles.fontSizeMedium}>{period}</Text>
            <Text style={styles.fontSizeMedium}>{projectStats.customer?.address}</Text>
          </View>
        </View>

        {/* Time table area */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.fontSizeMedium}>Datum</Text>
            <Text style={styles.fontSizeMedium}>Beschreibung</Text>
            <Text style={styles.fontSizeMedium}>Stunden</Text>
          </View>
          {margedDays.map((session) => {
            return (
              <View style={styles.tableContent} key={session.start}>
                <View style={styles.tableCell}>
                  <Text style={styles.fontSizeSmall}>{moment(session.start).format('DD.MM.YYYY')}</Text>
                </View>
                <View style={styles.tableCenterCell}>
                  <Text style={[styles.fontSizeSmall, { textAlign: 'left' }]}>{session.notes}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={[styles.fontSizeSmall, { textAlign: 'right' }]}>{(session.duration / 60).toFixed(0)}</Text>
                </View>
              </View>
            )
          })}
          <View style={styles.tablefooter}>
            <Text style={styles.fontSizeMedium}>Stunden Gesamt</Text>
            <Text style={styles.fontSizeMedium}>{(projectStats.totalMinutesWorked / 60).toFixed(0)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
