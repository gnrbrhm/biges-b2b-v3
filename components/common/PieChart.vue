<template>
  <client-only>
    <div>
      <div class="chart-wrap">
        <div id="chart">
          <apexchart
            type="donut"
            :width="300"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
var curr = ''
import { mixinNumberFormatTr } from '@/utils'
export default {
  props: {
    pieData: { type: Object, default: () => {} },
    currency: { type: String, default: '' }
  },
  data() {
    return {
      series: this.pieData.series,
      chartOptions: {
        labels: this.pieData.labels,
        chart: {
          width: 120,
          type: 'donut'
        },
        tooltip: {
          enabled: true,
          x: {
            show: true,
            formatter: (val) =>
              mixinNumberFormatTr(val).split(',')[0] + ' ' + curr
          },
          y: {
            show: true,
            formatter: (val) =>
              mixinNumberFormatTr(val).split(',')[0] + ' ' + curr
          }
        },
        plotOptions: {
          pie: {
            donut: {
              size: '45%',
              labels: {
                // show: true,
                // name: {
                //   show: false,
                //   fontSize: '22px',
                //   fontFamily: 'Roboto,sans-serif',
                //   color: '#dfsda',
                //   offsetY: -10
                // },
                // value: {
                //   show: true,
                //   fontSize: '24px',
                //   fontFamily: 'Roboto,sans-serif',
                //   fontWeight: 'bold',
                //   color: undefined,
                //   offsetY: 4,
                //   formatter: function(val, w) {
                //     let total = null
                //     w.globals.seriesTotals.forEach(el => {
                //       total += el
                //     })
                //     return ((100 / total) * val).toFixed(2) + '%'
                //   }
                // },
                // total: {
                //   show: true,
                //   label: '',
                //   color: '#373d3f',
                //   formatter: function(w) {
                //     if (
                //       w.globals.seriesTotals[0] > 0 ||
                //       w.globals.seriesTotals[1] > 0
                //     ) {
                //       let total = null
                //       w.globals.seriesTotals.forEach(el => {
                //         total += el
                //       })
                //       return (
                //         ((100 / total) * w.globals.seriesTotals[0]).toFixed(2) +
                //         '%'
                //       )
                //     }
                //   }
                // }
              }
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              // chart: {
              //   width: 200
              // },
              legend: {
                position: 'right',
                offsetY: 0,
                height: 50,
                formatter: function (val, opts) {
                  let replaced = opts.w.globals.series[opts.seriesIndex]
                    ?.toString()
                    ?.replace('.', ',')

                  return (
                    val +
                    ' : ' +
                    (replaced
                      ?.toString()
                      ?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') || replaced) +
                    ' ' +
                    curr
                  )
                }
              }
            }
          }
        ],
        legend: {
          formatter: (val, opts) => {
            let replaced = opts.w.globals.series[opts.seriesIndex]
              ?.toString()
              ?.replace('.', ',')

            return (
              val +
              ' : ' +
              (replaced
                ?.toString()
                ?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') || replaced) +
              ' ' +
              curr
            )
          },
          position: 'right',
          offsetY: 0,
          height: 70
        }
      }
    }
  },
  created() {
    curr = this.currency
  }
}
</script>
