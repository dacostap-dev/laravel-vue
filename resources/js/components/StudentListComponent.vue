<template>
  <div>
    <CCard>
      <CCardHeader>Lista Alumnos</CCardHeader>
      <CCardBody>
        <CDataTable
          class="mb-0 table-outline"
          hover
          :items="tableItems"
          :fields="tableFields"
          head-color="light"
          no-sorting
        >
          <td slot="avatar" class="text-center" slot-scope="{item}">
            <div class="c-avatar">
              <img :src="item.avatar.url" class="c-avatar-img" alt />
              <span class="c-avatar-status" :class="`bg-${item.avatar.status || 'secondary'}`"></span>
            </div>
          </td>
          <td slot="user" slot-scope="{item}">
            <div>{{item.user.name}}</div>
            <div class="small text-muted">
              <span>
                <template v-if="item.user.new">New</template>
                <template v-else>Recurring</template>
              </span>
              | Registered: {{item.user.registered}}
            </div>
          </td>
          <td slot="country" slot-scope="{item}" class="text-center">
            <CIcon :name="item.country.flag" height="25" />
          </td>
          <td slot="usage" slot-scope="{item}">
            <div class="clearfix">
              <div class="float-left">
                <strong>{{item.usage.value}}%</strong>
              </div>
              <div class="float-right">
                <small class="text-muted">{{item.usage.period}}</small>
              </div>
            </div>
            <CProgress
              class="progress-xs"
              v-model="item.usage.value"
              :color="color(item.usage.value)"
            />
          </td>
          <td slot="payment" slot-scope="{item}" class="text-center">
            <CIcon :name="item.payment.icon" height="25" />
          </td>
          <td slot="activity" slot-scope="{item}">
            <div class="small text-muted">Last login</div>
            <strong>{{item.activity}}</strong>
          </td>
        </CDataTable>



          <CDataTable
          class="mb-0 table-outline"
          hover
          :items="students"
          :fields="cabeceras"
          head-color="light"
          no-sorting
        >
       
          <td slot="name" slot-scope="{item}">
            <div>{{item.name}}</div>
          </td>
          
        </CDataTable>
      </CCardBody>
    </CCard>
    <!--  -->
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      cabeceras: [
          { key: "avatar", label: "", _classes: "text-center" },
          { key: "name", label: "Nombre", _classes: "text-center" },
          { key: "promotion", label: "Promoción", _classes: "text-center" },
          { key: "modulStatus", label: "Modulos Aprobados", _classes: "text-center" },
      ],
      tableItems: [
        {
          avatar: { url: "img/avatars/1.jpg", status: "success" },
          user: {
            name: "Yiorgos Avraamu",
            new: true,
            registered: "Jan 1, 2015"
          },
          country: { name: "USA", flag: "cif-us" },
          usage: { value: 50, period: "Jun 11, 2015 - Jul 10, 2015" },
          payment: { name: "Mastercard", icon: "cib-cc-mastercard" },
          activity: "10 sec ago"
        },
        {
          avatar: { url: "img/avatars/2.jpg", status: "danger" },
          user: {
            name: "Avram Tarasios",
            new: false,
            registered: "Jan 1, 2015"
          },
          country: { name: "Brazil", flag: "cif-br" },
          usage: { value: 22, period: "Jun 11, 2015 - Jul 10, 2015" },
          payment: { name: "Visa", icon: "cib-cc-visa" },
          activity: "5 minutes ago"
        },
        {
          avatar: { url: "img/avatars/3.jpg", status: "warning" },
          user: { name: "Quintin Ed", new: true, registered: "Jan 1, 2015" },
          country: { name: "India", flag: "cif-in" },
          usage: { value: 74, period: "Jun 11, 2015 - Jul 10, 2015" },
          payment: { name: "Stripe", icon: "cib-stripe" },
          activity: "1 hour ago"
        },
        {
          avatar: { url: "img/avatars/4.jpg", status: "" },
          user: { name: "Enéas Kwadwo", new: true, registered: "Jan 1, 2015" },
          country: { name: "France", flag: "cif-fr" },
          usage: { value: 98, period: "Jun 11, 2015 - Jul 10, 2015" },
          payment: { name: "PayPal", icon: "cib-paypal" },
          activity: "Last month"
        },
        {
          avatar: { url: "img/avatars/5.jpg", status: "success" },
          user: {
            name: "Agapetus Tadeáš",
            new: true,
            registered: "Jan 1, 2015"
          },
          country: { name: "Spain", flag: "cif-es" },
          usage: { value: 22, period: "Jun 11, 2015 - Jul 10, 2015" },
          payment: { name: "Google Wallet", icon: "cib-google-pay" },
          activity: "Last week"
        },
        {
          avatar: { url: "img/avatars/6.jpg", status: "danger" },
          user: {
            name: "Friderik Dávid",
            new: true,
            registered: "Jan 1, 2015"
          },
          country: { name: "Poland", flag: "cif-pl" },
          usage: { value: 43, period: "Jun 11, 2015 - Jul 10, 2015" },
          payment: { name: "Amex", icon: "cib-cc-amex" },
          activity: "Last week"
        }
      ],
      tableFields: [
        { key: "avatar", label: "", _classes: "text-center" },
        { key: "user", label: "Alumno" },
        { key: "country", _classes: "text-center" },
        { key: "usage", label: "Modulos Aprobados", _classes: "text-center" },
        { key: "payment", label: "Payment method", _classes: "text-center" },
        { key: "activity" }
      ]
    };
  },
  created() {
    this.$store.dispatch("getStudents");
  },
  computed: {
    ...mapState(["students"])
  },
  methods: {
    color(value) {
      let $color;
      if (value <= 25) {
        $color = "danger";
      } else if (value > 25 && value <= 50) {
        $color = "warning";
      } else if (value > 50 && value <= 75) {
        $color = "info";
      } else if (value > 75 && value <= 100) {
        $color = "success";
      }
      return $color;
    }
  }
};
</script>