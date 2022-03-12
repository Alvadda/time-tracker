import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import React, { VFC } from 'react'
import { ProjectStats } from '../../types'

interface TimesheetPdfProps {
  projectStats: ProjectStats
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

// Create Document Component
export const TimesheetPdf: VFC<TimesheetPdfProps> = ({ projectStats }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{projectStats.totalEarning}</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
)
