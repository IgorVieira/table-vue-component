<template>
  <div id="app" class="wrapper-app">
    <div>
      <div class="form-filter">
        <form>
          <label>Filter:</label>
          <input
            type="text"
            class="form-input"
            v-model="search"
            placeholder="Filter columns"/>
        </form>
        <select v-model="selected">
          <option disabled value="">Select a column</option>
          <option>name</option>
          <option>ammount</option>
          <option>description</option>
        </select>
      </div>
      <hr>
      <table>
        <thead>
          <tr>
            <th >Id</th>
            <th @click="sort('name')">Name</th>
            <th @click="sort('ammount')">Ammount</th>
            <th @click="sort('date')">Date</th>
            <th class="table-columnLeft" @click="sort('description')">Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="personPayment in sortColumns" v-bind:key="personPayment['.key']">
            <td class="table-columnLeft">{{personPayment['.key']}}</td>
            <td>{{personPayment.payment.name}}</td>
            <td>{{personPayment.payment.ammount}}</td>
            <td>{{personPayment.payment.date}}</td>
            <td class="table-columnLeft">{{personPayment.payment.description}}</td>
            <td  v-if="personPayment.edit">
              <th>
                <td>
                  <form class="form-container">
                    <div class="form-group">
                      <label>Name:</label>
                      <input type="text" v-model="personPayment.payment.name"/>
                    </div>
                    <div class="form-group">
                      <label>Description:</label>
                      <input type="text" v-model="personPayment.payment.description"/>
                    </div>
                    <div class="form-group">
                      <button @click.prevent="saveEdit(personPayment)">Save</button>
                      <button @click.prevent="cancelEdit(personPayment['.key'])">Cancel</button>
                    </div>
                  </form>
                </td>
              </th>
            </td>
            <td>
              <div v-if="!personPayment.edit">
                <button @click="editValues(personPayment['.key'])">Edit</button>
              </div>
            </td>
          </tr>
        </tbody>

      </table>
      <hr>
      <div class="pagination-content">
        <div>
          <button @click="prevPage">Previous</button>
          <button v-show="!showNextPage" @click="nextPage">Next</button>
        </div>

        <div>
          {{currentPage}}/
          {{calcTotalPages}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import moment from 'moment'
import { paymentRef } from './firebase';

export default {
  data () {
    return {
      formData: {
        name: '',
        description: '',
        date: new Date().toISOString(),
        ammount: 0,
        edit: false
      },
      currentSort:'name',
      currentSortDir:'asc',
      pageSize: 9,
      currentPage: 1,
      search : '',
      selected: 'name'
    }
  },
  firebase: {
    payments: paymentRef
  },
  computed:{
    sortColumns() {
      return this.payments.sort((a,b) => {
      let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a.payment[this.currentSort] < b.payment[this.currentSort]) return -1 * modifier;
        if(a.payment[this.currentSort] > b.payment[this.currentSort]) return 1 * modifier;
        return 0;


      }).filter((row, index) => {

          let exp = new RegExp(this.search.trim(), 'i')

          if (this.search) {
            let exp = new RegExp(this.search.trim(), 'i')

            if(this.selected === 'name') {
              return exp.test(row.payment.name)
            } if (this.selected === 'ammount') {
              return exp.test(row.payment.ammount)
            } if (this.selected === 'description') {
              return exp.test(row.payment.description)
            }

          } else {
            return row
          }

      }).filter((row, index) => {

        let start = (this.currentPage-1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if(index >= start && index < end) return true;

      })
    },
    calcTotalPages() {
      return parseInt(this.payments.length/this.pageSize) + 1
    },
    showNextPage() {
      return this.calcTotalPages === this.currentPage
    }

  },
  methods: {
    submitValues() {
      paymentRef.push({payment: this.formData, edit: false })
      this.formData = {}
    },
    removeValues(key) {
      paymentRef.child(key).remove()
    },
    editValues(key) {
      paymentRef.child(key).update({ edit: true })
    },
    cancelEdit(key) {
      paymentRef.child(key).update({ edit: false })
    },
    saveEdit(formData) {
      const key = formData['.key']
      paymentRef.child(key).set({ payment: formData.payment, edit: false })
    },
    sort(ref) {
      if(ref === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = ref;
    },
    nextPage:function() {
      if((this.currentPage * this.pageSize) < this.payments.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    }
  }
}
</script>

<style lang="scss">
.pagination-content {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  align-content: center;
}


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button,
select {
  background-color: transparent;
  border: 2px solid black;
  font-size: 16px;
  cursor: pointer;
  outline: none;
}

input {
  border: 1px solid black;
  margin: 12px 0 0 0;
  padding: 0;
  outline: none;
  font-size: 16px;
  width: 100%;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}

table {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}

td, th {
  padding: 5px;
}

.table-columnLeft {
  text-align: left;
}

.wrapper {
  &-app {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    @media screen and (max-width: 992px) {
      flex-direction: column;
    }
  }

  &-form {
    @media screen and (max-width: 992px) {
      margin-bottom: 50px;
    }
  }
}

.form {
  &-container {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  &-group {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  &-input {
    border: 1px solid black;
    margin: 10px 0 10px 0;
    padding: 0;
    width: 30%;
    outline: none;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
  }

  &-action {
    margin-top: 20px;
    text-transform: uppercase;
  }

  &-select {
    display: absolute;
    margin-top: -10px;
  }
}

</style>
