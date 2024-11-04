<template>
  <client-only>
    <div>
      <div class="chart-wrap">
        <div id="chart">
          <apexchart
            type="donut"
            width="400"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  props: {
    pieData: { type: Object, default: () => {} }
  },
  data() {
    return {
      series: this.pieData.series,
      chartOptions: {
        labels: this.pieData.labels,
        chart: {
          width: 380,
          type: 'donut'
        },

        plotOptions: {
          pie: {
            donut: {
              size: '85%'
            },
            strokeWidth: 1,
            startAngle: -120,
            endAngle: 120,
            offsetY: 0,
            offsetX: 0,
            customScale: 1
          }
        },
        dataLabels: {
          enabled: false
        },
        grid: {
          padding: {
            bottom: -70
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                show: false
              }
            }
          }
        ],
        legend: {
          formatter: function (val, opts) {
            return val + ' : ' + opts.w.globals.series[opts.seriesIndex]
          },
          position: 'bottom',
          offsetY: 0,
          height: 20
        }
      }
    }
  }
}
</script>

<style>
</style>