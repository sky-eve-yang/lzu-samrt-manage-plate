/*
 * @Author: sky-eve-yang
 * @Date: 2023-03-09 21:19:27
 * @LastEditTime: 2023-03-12 16:13:00
 * @LastEditors: sky 1326906378@qq.com
 * @Description: 
 * @FilePath: \django-vue-admin\web\src\views\tasks\party_history_study\crud.js
 * @签名：清风无意，忘川归心
 */


import { request } from "@/api/service";
import { BUTTON_STATUS_NUMBER } from "@/config/button";
import { urlPrefix as bookPrefix } from "./api";
import util from '@/libs/util'
// crud.js
export const crudOptions = (vm) => {
  return {
    pageOptions: {
      compact: true,
      // 有效的导出配置
      export: {
        local: true,//本地导出，false为服务端导出
        title: '数据导出',//导出的文件名
        type: 'excel', //导出文件类型，可选： [ csv | excel ]
        formatter(row, context) {
          // 数据格式化，row.xxx = parseInt(row.xxx)
          row.audit_results = row.audit_results === 1 ? '通过' : row.audit_results === 0 ? '未通过' : '待审核'
        },
        // 以下是 vue-table-export 插件的参数
        // excel
        header: '',// 第一行
        merges: false, // 合并单元格
        // csv
        noHeader: false, // 不导出表头
        separator: ',', // 数据分隔符	非	String		,
        quoted: false	//每项数据是否加引号
      },
    },
    options: {
      tableType: "vxe-table",
      rowKey: true, // 必须设置，true or false
      rowId: "id",
      height: "100%", // 表格高度100%, 使用toolbar必须设置
      highlightCurrentRow: false
    },
    rowHandle: {
      width: 240,
      fixed: 'right',
      view: {
        thin: true,
        text: "",
        disabled() {
          return !vm.hasPermissions("Retrieve");
        }
      },
      edit: {
        thin: true,
        text: "",
        disabled() {
          return !vm.hasPermissions("Update");
        },
        show() {
          return vm.hasPermissions("Delete");
        }
      },
      remove: {
        thin: true,
        text: "",
        show() {
          return false;
        }
      },

    },
    viewOptions: {
      componentType: "form"
    },
    formOptions: {
      defaultSpan: 12, // 默认的表单 span
    },
    indexRow: {
      // 或者直接传true,不显示title，不居中
      title: "序号",
      align: "center",
      width: 60
    },
    columns: [
      {
        title: '学院',
        key: 'college_name',
        minWidth: 100,
        type: 'tree-selector',
        search: {
          disabled: true
        },
        dict: {
          cache: true,
          isTree: true,
          url: '/api/system/dept/all_dept/',
          value: 'name', // 数据字典中value字段的属性名
          label: 'name' // 数据字典中label字段的属性名
        },
        form: {
          rules: [ // 表单校验规则
            {
              required: true,
              message: '学院必填'
            }
          ],
          itemProps: {
            class: { yxtInput: true }
          },
          component: {
            span: 12,
            pagination: true,
            props: { multiple: false }
          }
        },
      },
      {
        title: "年级",
        key: "grade",
        search: {
          disabled: false
        },
        width: 100,
        sortable: true,
        type: "select",
        dict: {
          data: [
            { value: 2016, label: '2016 级' },
            { value: 2017, label: '2017 级' },
            { value: 2018, label: '2018 级' },
            { value: 2019, label: '2019 级' },
            { value: 2020, label: '2020 级' },
            { value: 2021, label: '2021 级' },
            { value: 2022, label: '2022 级' },
            { value: 2023, label: '2023 级' },
            { value: 2024, label: '2024 级' },
            { value: 2025, label: '2025 级' },
            { value: 2026, label: '2026 级' },
            { value: 2027, label: '2027 级' },
            { value: 2028, label: '2028 级' },
            { value: 2029, label: '2029 级' },
            { value: 2030, label: '2030 级' },
            { value: 2031, label: '2031 级' },
            { value: 2032, label: '2032 级' },
            { value: 2033, label: '2033 级' },
            { value: 2034, label: '2034 级' },
            { value: 2035, label: '2035 级' },
            { value: 2036, label: '2036 级' },
            { value: 2037, label: '2037 级' },
            { value: 2038, label: '2038 级' },
            { value: 2039, label: '2039 级' },
            { value: 2040, label: '2040 级' },
            { value: 2041, label: '2041 级' },
            { value: 2042, label: '2042 级' },
            { value: 2043, label: '2043 级' },
            { value: 2044, label: '2044 级' },
            { value: 2045, label: '2045 级' },
            { value: 2046, label: '2046 级' },
            { value: 2047, label: '2047 级' },
            { value: 2048, label: '2048 级' },
            { value: 2049, label: '2049 级' },
            { value: 2050, label: '2050 级' },
            { value: 2051, label: '2051 级' },
            { value: 2052, label: '2052 级' },
            { value: 2053, label: '2053 级' },
            { value: 2054, label: '2054 级' },
            { value: 2055, label: '2055 级' },
            { value: 2056, label: '2056 级' },
            { value: 2057, label: '2057 级' },
            { value: 2058, label: '2058 级' },
            { value: 2059, label: '2059 级' },
            { value: 2060, label: '2060 级' },
            { value: 2061, label: '2061 级' },
            { value: 2062, label: '2062 级' },
            { value: 2063, label: '2063 级' },
            { value: 2064, label: '2064 级' },
            { value: 2065, label: '2065 级' },
            { value: 2066, label: '2066 级' },
            { value: 2067, label: '2067 级' },
            { value: 2068, label: '2068 级' },
            { value: 2069, label: '2069 级' },
            { value: 2070, label: '2070 级' },
            { value: 2071, label: '2071 级' },
            { value: 2072, label: '2072 级' },
            { value: 2073, label: '2073 级' },
            { value: 2074, label: '2074 级' },
            { value: 2075, label: '2075 级' },
            { value: 2076, label: '2076 级' },
            { value: 2077, label: '2077 级' }
          ]
        },
        form: {
          rules: [
            // 表单校验规则
            {
              required: true,
              message: "年级必填"
            }
          ],
          component: {
            props: {
              clearable: true
            },
            placeholder: "选择年级"
          },

        }
      },
      {
        title: '班级',
        key: 'class_name',
        minWidth: 100,
        type: 'tree-selector',
        dict: {
          cache: true,
          isTree: true,
          url: '/api/system/dept/all_dept/',
          value: 'name', // 数据字典中value字段的属性名
          label: 'name' // 数据字典中label字段的属性名
        },
        form: {
          rules: [ // 表单校验规则
            {
              required: true,
              message: '班级必填'
            }
          ],
          itemProps: {
            class: { yxtInput: true }
          },
          component: {
            span: 12,
            pagination: true,
            props: { multiple: false }
          }
        },
      },
      {
        title: '是否提交',
        key: 'is_submitted',
        minWidth: 100,
        type: 'select',
        dict: {
          data: [
            { value: true, label: '已提交' },
            { value: false, label: '未提交' },
          ]
        },
        formatter: (row, column, cellValue) => {
          return cellValue ? '是' : '否'
        }

      },
      {
        title: '时间',
        key: 'meeting_time',
        minWidth: 100,
        type: 'date',
        search: {
          disabled: false
        },
        form: {
          component: {
            type: 'month',
            placeholder: '请选择月份'
          },
          rules: [
            {
              required: true,
              message: '月份不能为空'
            }
          ]
        }
      },
      // {
      //   title: '提交状态',
      //   key: 'submission_status',
      //   minWidth: 100,
      //   type: 'select',
      //   search: {
      //     disabled: false
      //   },
      //   dict: {
      //     data: [
      //       { value: 'submitted', label: '已提交' },
      //       { value: 'not_submitted', label: '未提交' }
      //     ]
      //   },
      //   form: {
      //     component: {
      //       placeholder: '请选择提交状态'
      //     },
      //     rules: [
      //       {
      //         required: true,
      //         message: '提交状态不能为空'
      //       }
      //     ]
      //   }
      // }
    ]
  }
}
