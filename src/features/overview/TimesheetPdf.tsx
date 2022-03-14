import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import moment from 'moment'
import React, { VFC } from 'react'
import { ProjectStats } from '../../types'
import { getDurationWithBreak } from '../sessions/sessionUtils'

interface TimesheetPdfProps {
  projectStats: ProjectStats
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

// Create Document Component
export const TimesheetPdf: VFC<TimesheetPdfProps> = ({ projectStats }) => (
  <Document>
    <Page size="A4" style={styles.body}>
      {/* Header area */}
      <View style={styles.header}>
        <View style={styles.column}>
          <Text style={styles.fontSizeBig}>Zeitnachweis</Text>
          <Text style={styles.fontSizeBigMedium}>November 2021</Text>
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
          <Text style={styles.fontSizeBoldMedium}>Zeitraum:</Text>
          <Text style={styles.fontSizeBoldMedium}>Ort:</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.fontSizeMedium}>Fielmann AG</Text>
          <Text style={styles.fontSizeMedium}>01.11.21 - 31.11.21</Text>
          <Text style={styles.fontSizeMedium}>Hamburg</Text>
        </View>
      </View>

      {/* Time table area */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.fontSizeMedium}>Datum</Text>
          <Text style={styles.fontSizeMedium}>Beschreibung</Text>
          <Text style={styles.fontSizeMedium}>Stunden</Text>
        </View>
        {projectStats.sessions.map((session) => {
          const duration = getDurationWithBreak(session)
          return (
            <View style={styles.tableContent} key={session.id}>
              <View style={styles.tableCell}>
                <Text style={styles.fontSizeSmall}>{moment(session.start).format('DD MMM YYYY')}</Text>
              </View>
              <View style={styles.tableCenterCell}>
                <Text style={[styles.fontSizeSmall, { textAlign: 'left' }]}>{session.note}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={[styles.fontSizeSmall, { textAlign: 'right' }]}>{(duration / 60).toFixed(0)}</Text>
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
