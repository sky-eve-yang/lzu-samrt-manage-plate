<!--
 * @Author: sky 1326906378@qq.com
 * @Date: 2023-03-09 21:19:34
 * @LastEditors: sky 1326906378@qq.com
 * @LastEditTime: 2023-03-12 16:13:24
 * @FilePath: \2023-03-09-易班工作室-校园党史学习平台建设\django-vue-admin\web\src\views\tasks\party_history_study\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <d2-crud-x  @reject="reject" @approve="approve" ref="d2Crud" v-bind="_crudProps"
      v-on="_crudListeners">
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" />
        <el-button-group>
          <el-button size="small" v-permission="'Create'" type="primary" @click="addRow">
            <i class="el-icon-plus" /> 新增
          </el-button>
          <!-- <el-button size="small" type="danger" @click="batchDelete" v-permission="'Delete'">
            <i class="el-icon-delete"></i> 批量删除
          </el-button> -->
          <!-- <el-button size="small" type="warning" @click="onExport" v-permission="'Export'"><i class="el-icon-download" />
            导出
          </el-button> -->
          <!-- <importExcel api="api/system/user/" v-permission="'Import'">导入
          </importExcel>  -->
        </el-button-group>
        <crud-toolbar :export="true" @export="handleExport" :search.sync="crud.searchOptions.show"
          :compact.sync="crud.pageOptions.compact" :columns="crud.columns" @refresh="doRefresh()"
          @columns-filter-changed="handleColumnsFilterChanged" />
      </div>
      <span slot="PaginationPrefixSlot" class="prefix">
        <el-button class="square" size="mini" title="批量删除" @click="batchDelete" icon="el-icon-delete"
          :disabled="!multipleSelection || multipleSelection.length == 0" />
      </span>
    </d2-crud-x>
  </d2-container>
</template>
  
<script>
import log from '@/plugin/log/index'
import * as api from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'party_history_study',
  mixins: [d2CrudPlus.crud],
  data() {
    return {
      dialogFormVisible: false,

    }
  },
  async created() {
    
  },
  methods: {

    getCrudOptions() {
      this.crud.searchOptions.form.user_type = 0
      const options = crudOptions(this)
      return options
    },
    pageRequest(query) {
      return api.GetList(query)
    },
    addRequest(row) {
      return api.AddObj(row)
    },
    updateRequest(row) {
      return api.UpdateObj(row)
    },
    delRequest(row) {
      return api.DelObj(row.id)
    },
    getSearch() {
      return this.$refs[this.crud.format.ref.search]
    },
    approve({ row }) {
      return api.approve(row.id)
    },
    reject({ row }) {
      return api.reject(row.id)
    },
    // batchDelRequest (ids) {
    //   return api.BatchDel(ids)
    // },
    onExport() {
      this.$confirm('是否确认导出所有数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        // const query = that.getD2CrudTableData()
        // console.log(query);
        // console.log({... query});
        // return api.exportData(... query)
        return api.exportData()
      })
    },
    // 部门懒加载
    loadChildrenMethod({ row }) {
      return new Promise(resolve => {
        setTimeout(() => {
          const childs = [
            { id: row.id + 100000, parent: row.id, name: row.name + 'Test45', type: 'mp4', size: null, date: '2021-10-03', hasChild: true },
            { id: row.id + 150000, parent: row.id, name: row.name + 'Test56', type: 'mp3', size: null, date: '2021-07-09', hasChild: false }
          ]
          resolve(childs)
        }, 500)
      })
    }
  }
}
</script>
  
<style lang="scss">
.yxtInput {
  .el-form-item__label {
    color: #49a1ff;
  }
}

.audited-reject {
  color: red;
}

.audited-approve {
  color: green;
}

.to-audite {
  color: grey;
}
</style>
  