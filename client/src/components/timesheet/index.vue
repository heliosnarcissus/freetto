<template>
  <div>

    <q-table
      :data="tableData"
      :columns="columns"
      :pagination.sync="pagination"
      row-key="day">
      <template slot="header" slot-scope="props" >
        <q-tr :props="props">
          <template v-for="col in props.cols">
            <q-th :key="col.name" :props="props" :width="col.width" :align="col.align">
              {{ col.label }}
            </q-th>
          </template>
        </q-tr>
      </template>
      <template slot="top-right" slot-scope="props">
        <q-select
          :options="monthsOptions"
          v-model="monthSelected"
          @input="contructDates"
        />
      </template>
      <template slot="body" slot-scope="props">
        <q-tr :props="props" :class="{ 'selected': isToday(props.row)}">
          <q-td key="date" :props="props">
            {{ getDayOfWeek(props.row.date) }} {{ getDay(props.row.date) }}
          </q-td>
          <q-td key="status" class="text-center">
            <q-btn no-caps flat :label="statusBtns[props.row.status].label" >
              <q-popover v-if="isToday(props.row)">
                <q-list link>
                    <q-item :disabled="checkTimeCardStatus(s.value, props.row)" v-for="s in statusBtns" :key="s.value" @click.native="selectStatus(s.value, props.row)">
                        {{s.label}}
                    </q-item>
                </q-list>
              </q-popover>
            </q-btn>
          </q-td>
          <q-td key="timein" :props="props" class="text-right">
            {{ props.row.timein }}
          </q-td>
          <q-td key="timeout" :props="props" class="text-right">
            {{ props.row.timeout }}
          </q-td>
          <q-td key="elapsed" :props="props" align="center" class="text-center">
            {{ computeTimeElapsed(props.row) }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      timecards: [
        // { id: 1, UserId: 1, date: this.$moment().format('YYYY-MM-DD'), status: 1, timein: null, timeout: null }
        // { id: 2, UserId: 1, date: this.$moment().format('YYYY-MM-DD'), status: 1, timein: this.$moment(), timeout: this.$moment().add(8, 'hours') }
      ],
      pagination: {
        sortBy: null, // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 7// cu
      },
      dateData: [],
      columns: [
        { name: 'date', field: 'date', label: `${this.$moment().format('MMM')}`, align: 'center', width: '5%' },
        { name: 'status', field: 'status', label: 'Status', align: 'center', width: '10%' },
        { name: 'timein', field: 'timein', label: 'Timein', width: '15%' },
        { name: 'timeout', field: 'timeout', label: 'Timeout', width: '15%' },
        { name: 'elapsed', field: 'elapsed', label: 'Elapsed', align: 'center' }
      ],
      selected: 0,
      monthSelected: 1,
      // monthsOptions: [ { 'label': 'January', 'value': 1 }, { 'label': 'February', 'value': 2 }, { 'label': 'March', 'value': 3 }, { 'label': 'April', 'value': 4 }, { 'label': 'May', 'value': 5 }, { 'label': 'June', 'value': 6 }, { 'label': 'July', 'value': 7 }, { 'label': 'August', 'value': 8 }, { 'label': 'September', 'value': 9 }, { 'label': 'October', 'value': 10 }, { 'label': 'November', 'value': 11 }, { 'label': 'December', 'value': 12 } ],
      statusOptions: [
        { label: 'out for the day', value: 0 },
        { label: 'time in', value: 1 },
        { label: 'time out', value: 2 }
      ],
      // 0 our for the day neither time in or time out
      // 1 time in have timein dateTime
      // 2 time out have timein && timeout dateTime
      statusBtns: [
        { label: 'out for the day', value: 0 },
        { label: 'time in', value: 1 },
        { label: 'time out', value: 2 }
      ]
    }
  },
  computed: {
    m: {
      get () { return this.$moment },
      set (val) { this.$moment = val }
    },
    monthsOptions () {
      return this.$moment.months().map((e, i) => {
        return { label: e, value: i + 1 }
      })
    },
    tableData: {
      get () {
        return this.dateData
      },
      set (val) { this.dateData = val }
    }
  },
  methods: {
    isToday (timecard) {
      if (this.$moment().format('YYYY-MM-DD') === this.$moment(timecard.date).format('YYYY-MM-DD')) {
        return true
      } else {
        return false
      }
    },
    getDayOfWeek (d) {
      return this.$moment(d).format('ddd')
    },
    getDay (d) {
      return this.$moment(d).format('DD')
    },
    getYear (d) {
      return this.$moment(d).format('YYYY')
    },
    getMonth (d) {
      return this.$moment(d).format('MM')
    },
    contructDates () {
      this.dateData = []
      this.generateDates()
      this.addTimeCards() // for this month
    },
    generateDates () {
      let m = this.m(`${this.$moment().format('YYYY')}-${this.monthSelected}`, 'YYYY-MM-DD') // .month()
      for (let i = 0; i < m.daysInMonth(); i++) {
        // console.log(i + 1)
        let d = this.$moment([m.year(), m.month(), i + 1])
        let dateRow = {
          day: d.format('DD'),
          dayOfWeek: d.format('ddd'),
          date: d.format('YYYY-MM-DD'),
          status: 0 // default
        }
        this.dateData.push(dateRow)
      }
      return this.dateData
    },
    addTimeCards () {
      this.timecards.forEach(t => {
        this.dateData.map((e, index) => {
          if (e.date === t.date) {
            this.dateData[index] = t
          }
        })
      })
    },
    execTimeIn (timecard) {
      timecard.status = 1
      timecard.timein = this.$moment().format('YYYY-MM-DD HH:mm')
    },
    execTimeOut (timecard) {
      timecard.status = 2
      timecard.timeout = this.$moment().format('YYYY-MM-DD HH:mm')
    },
    selectStatus (e, timecard) {
      if (e === 1 && !timecard.hasOwnProperty('timein')) {
        this.execTimeIn(timecard)
      } else if (e === 2 && !timecard.hasOwnProperty('timeout') && timecard.status === 1) {
        this.execTimeOut(timecard)
      } else {
        console.log('no mutatation !!')
      }
    },
    checkTimeIn (timecard) {
      if (!timecard.hasOwnProperty('timein') || timecard.timein === null || timecard.timein === undefined || timecard.timein === '') {
        return false
      } else {
        return true
      }
    },
    checkTimeOut (timecard) {
      if (this.checkTimeIn(timecard) && timecard.status === 1) {
        return false
      } else {
        return true
      }
    },
    checkTimeCardStatus (statusType, timecard) {
      if (statusType === 0) {
        return false
      } else if (statusType === 1) {
        return this.checkTimeIn(timecard)
      } else if (statusType === 2) {
        return this.checkTimeOut(timecard)
      } else {
        return false
      }
    },
    computeTimeElapsed (timecard) {
      let t1 = this.$moment(timecard.timein, 'HH:mm:ss'),
        t2 = this.$moment(timecard.timeout, 'HH:mm:ss'),
        te = t2.diff(t1, 'hours')
      te = Number.isInteger(te) ? te : ''
      return te
    }
  },
  mounted () {
    this.monthSelected = parseInt(this.$moment().format('M'))
    this.contructDates()
  }
}
</script>

<style>

</style>
