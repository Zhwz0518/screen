import Vue from 'vue'
import { tokenTableName, tokenName, baseURL } from '@/config'
Vue.mixin({
  computed: {
    baseUploadUrl() {
      return baseURL + '/api/uploadFile'
    },
  },
  methods: {
    getUpLoadHeaders() {
      return {
        [tokenName]: sessionStorage.getItem(tokenTableName),
      }
    },
  },
})
