import { InputLabel, Select, MenuItem, SelectChangeEvent, Card, Typography, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { lazy, FC, Suspense, useEffect } from 'react';
import styles from './CauseViewer.module.scss';
import { CauseViewerProps } from './props';
import Loading from '../Loading/Loading';

const Plot = lazy(() => import('react-plotly.js'));

const createData = (
  year: number,
  month: number,
  deaths: number,
) => {
  return { year, month, deaths };
}

const CauseViewer: FC<CauseViewerProps> = ({ causeOfDeath, favourite, deathData }) => {
  const [selectedYear, setSelectedYear] = React.useState<number | null>(deathData[0] ? deathData[0].year : null);
  const [availableYears, setAvailableYears] = React.useState<number[]>([]);

  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(parseInt(event.target.value));
  };

  useEffect(() => {
    if (availableYears.length > 0) {
      setSelectedYear(availableYears[0]);
    } else {
      setAvailableYears(Array.from(new Set(deathData.map((death) => death.year))));
      setSelectedYear(availableYears[0]);
    }
  }, [availableYears, deathData]);

  let rows = deathData.map((death) => createData(death.year, death.month, death.deaths)).sort((a, b) => a.year > b.year ? 1 : -1);
  if (favourite) {
    rows = rows.filter((row) => row.year === selectedYear);
  }

  return (
    <div className={styles.CauseViewer} data-testid="CauseViewer">
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Typography variant="h5" component="div">{causeOfDeath.name}</Typography>
          {favourite && (<div><InputLabel id='year-label'>Año</InputLabel><Select
            labelId="year-label"
            id="year"
            value={`${selectedYear}`}
            label="Año"
            onChange={handleYearChange}
          >
            {availableYears.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select></div>)}
          {favourite &&
            <Suspense fallback={<Loading />}>
            <Plot
            data={
              [
                {
                  x: rows.map((row) => new Date(row.year, row.month)),
                  y: rows.map((row) => row.deaths),
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: 'red' },
                }
              ]
            }
            layout={{ title: 'Muertes por mes' }}
              />
          </Suspense>
          }
          <TableContainer sx={{ width: '100%' }} component={Paper}>
            <Table size="small" aria-label="deaths table">
              <TableHead>
                <TableRow>
                  <TableCell>Año</TableCell>
                  <TableCell>Mes</TableCell>
                  <TableCell align="right">Muertes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={`${row.year}-${row.month}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">{row.year}</TableCell>
                    <TableCell align="right">{row.month}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.deaths}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  )
};

export default CauseViewer;
