<template>
    <v-container>
        <v-app>
            <v-data-table
                :headers="headers"
                :items="customers"
                sort-by="calories"
                class="elevation-1"
            >
                <template v-slot:top>
                <v-toolbar
                    flat
                >
                    <v-toolbar-title>{{ userName }}'s Customers</v-toolbar-title>
                    <v-divider
                    class="mx-4"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog
                    v-model="dialog"
                    max-width="500px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                        >
                        New Customer
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                        <v-container>
                            <v-row>
                            <v-col
                                cols="12"
                                sm="6"
                                md="6"
                            >
                                <v-text-field
                                v-model="editedItem.firstname"
                                label="First Name"
                                ></v-text-field>
                                <span class="red--text" v-if="errors.firstname">{{ errors.firstname[0] }}</span>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="6"
                            >
                                <v-text-field
                                v-model="editedItem.lastname"
                                label="Last Name"
                                ></v-text-field>
                                <span class="red--text" v-if="errors.lastname">{{ errors.lastname[0] }}</span>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="12"
                                md="12"
                            >
                                    <v-menu
                                        ref="menu"
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="editedItem.birth_date"
                                            label="Birthday date"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        ref="picker"
                                        v-model="editedItem.birth_date"
                                        :max="new Date().toISOString().substr(0, 10)"
                                        min="1950-01-01"
                                        @change="saveDate"
                                        ></v-date-picker>
                                    </v-menu>
                                    <span class="red--text" v-if="errors.birth_date">{{ errors.birth_date[0] }}</span>

                            </v-col>
                            </v-row>
                        </v-container>
                        </v-card-text>

                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="close"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="save"
                        >
                            Save
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="headline">Are you sure you want to delete this customer?</v-card-title>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-toolbar>
                </template>

                <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
                </template>

                <template v-slot:no-data>
                <v-btn
                    color="primary"
                    @click="initialize"
                >
                    Reset
                </v-btn>
                </template>

            </v-data-table>
        </v-app>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      menu: false,
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'First Name', value: 'firstname', },
        { text: 'Last Name', value: 'lastname' },
        { text: 'Birth Date', value: 'birthday' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      customers: [],
      editedIndex: -1,
      editedItem: {
        firstname: '',
        lastname: '',
        birth_date: '',
      },
      defaultItem: {
        firstname: '',
        lastname: '',
        birth_date: '',
      },
      errors: {}
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Customer' : 'Edit Customer'
      },
      userName () {
        return User.name()
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },

    created () {
      if(!User.loggedIn()) this.$router.push({name: 'login'});
      this.initialize()
    },

    methods: {
      initialize () {

        if (!User.loggedIn()) {
          this.$router.push({name: 'login'})
        }

        axios.get('/api/customer')
        .then(res => this.customers = res.data)
        .catch(res => console.warn(res));
      },

      editItem (item) {
        this.errors = {}
        item.birth_date = new Date(item.birth_date).toISOString().slice(0,10)
        this.editedIndex = this.customers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.customers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        axios.delete(`/api/customer/${this.customers[this.editedIndex].id}`)
        .then(res => {
            this.customers.splice(this.editedIndex, 1)
            this.closeDelete()
        })
        .catch(res => console.warn(res));
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      saveDate (date) {
        this.$refs.menu.save(date)
      },

      save () {
        if (this.editedIndex > -1) {
            let customerindex = this.editedIndex;
            axios.put(`/api/customer/${this.editedItem.id}`, this.editedItem)
            .then(res => {
              Object.assign(this.customers[customerindex], res.data)
              this.close()
            })
            .catch(res => this.errors = res.response.data.errors);

        } else {

            axios.post('/api/customer', this.editedItem)
            .then(res => {
              this.customers.push(res.data)
              this.close()
            })
            .catch(res => this.errors = res.response.data.errors);

        }
      },
    },
  }
</script>

</style>