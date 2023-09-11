// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { ResponsiveLine } from '@nivo/line'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const LineChart = ({ data }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 0,
      max: 'auto',
      stacked: false,
      reverse: false
    }}
    yFormat=" >"
    curve="linear"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Transaction Id',
      legendOffset: 35,
      legendPosition: 'middle'
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'QOH',
      legendOffset: -50,
      legendPosition: 'middle'
    }}
    colors={{ scheme: 'category10'}}
    pointSize={3}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={3}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    crosshairType="cross"
    useMesh={true}
    legends={[]}
    motionConfig={{
      mass: 1,
      tension: 140,
      friction: 25,
      clamp: false,
      precision: 0.01,
      velocity: 0
    }}
    animate={true}
  />
)

export default LineChart