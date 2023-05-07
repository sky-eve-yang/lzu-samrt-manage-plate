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
 
export const crudOptions = vm => {
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
        selectionRow: {
            align: 'center',
            width: 46
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
                    return vm.hasPermissions("Delete");
                }
            },
            custom: [
                {
                    thin: true,
                    text: '通过',
                    size: 'small',
                    type: 'success',
                    icon: 'el-icon-refresh-left',
                    show() {
                        return vm.hasPermissions('Audit')
                    },
                    emit: 'approve'
                },
                {
                    thin: true,
                    text: '驳回',
                    size: 'small',
                    type: 'danger',
                    icon: 'el-icon-refresh-right',
                    show() {
                        return vm.hasPermissions('Audit')
                    },
                    emit: 'reject'
                }
            ]
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
                title: "ID",
                key: "id",
                disabled: true,
                width: 90,
                form: {
                    disabled: true
                }
            },
            {
                title: "会议主题",
                key: "meeting_theme",
                search: {
                    disabled: false
                },
                minWidth: 100,
                type: "input",
                form: {
                    rules: [
                        // 表单校验规则
                        {
                            required: true,
                            message: "会议主题必填"
                        }
                    ],
                    component: {
                        props: {
                            clearable: true
                        },
                        placeholder: "请输入会议主题"
                    },
                    itemProps: {
                        class: { yxtInput: true }
                    }
                },
                sortable: true,
            },
            {
                title: "会议时间",
                key: "meeting_time",
                search: {
                    disabled: true
                },
                sortable: true,
                minWidth: 100,
                type: "date",
                form: {
                    rules: [
                        {
                            required: true,
                            message: "会议时间必填"
                        }
                    ],
                    component: {
                        name: 'el-date-picker',
                        placeholder: "请输入会议时间"
                    },
                    itemProps: {
                        class: { yxtInput: true }
                    }
                },
                component: { name: 'date-format', props: { format: 'YYYY-MM-DD' } }
            },
            {
                title: "会议地点",
                key: "meeting_place",
                minWidth: 100,
                type: "input",
                form: {
                    rules: [
                        // 表单校验规则
                        {
                            required: true,
                            message: "会议地点必填"
                        }
                    ],
                    component: {
                        props: {
                            clearable: true
                        },
                        placeholder: "请输入会议地点"
                    },
                    itemProps: {
                        class: { yxtInput: true }
                    }
                }
            },
            {
                title: "参会人数",
                key: "number_participants",
                minWidth: 100,
                type: "number",
                form: {
                    rules: [
                        // 表单校验规则
                        {
                            required: true,
                            message: "参会人数必填"
                        }
                    ],
                    component: {
                        props: {
                            clearable: true
                        },
                        placeholder: "请输入参会人数"
                    },
                    itemProps: {
                        class: { yxtInput: true }
                    }
                }
            },
            {
                title: "班级",
                key: "class_name",
                search: {
                    disabled: false
                },
                minWidth: 200,

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
                title: "学院",
                key: "college_name",
                search: {
                    disabled: false
                },
                minWidth: 150,

                type: 'tree-selector',
                dict: {
                    cache: true,
                    isTree: true,
                    url: '/api/system/dept/get_parent_dept/',
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
                // component: {
                //     name: 'foreignKey',
                //     valueBinding: 'dept_name'
                // }
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
                        // ...
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
                title: "会议图片",
                key: "metting_images",
                width: 100,
                align: 'left',
                type: "image-uploader",
                form: {
                    rules: [
                        // 表单校验规则
                        {
                            required: true,
                            message: "会议图片必传"
                        }
                    ],
                    component: {
                        props: {
                            btnSize: 'small', // type=file-uploader时按钮的大小
                            btnName: '选择图片',// type=file-uploader时按钮文字
                            accept: '.jpg || .png', // 接受的文件后缀类型
                            // type: 'form', // 当前使用哪种存储后端【cos/qiniu/alioss/form】
                            elProps: { // 与el-uploader 配置一致
                                multiple: true,
                                limit: 10 // 限制10个文件
                            },
                            width: 100,
                            sizeLimit: 5 * 1024 * 1024 // 不能超过限制
                        },
                        span: 24
                    },
                    helper: '限制单张图片大小不能超过5M'

                }
            },
            {
                title: "审核状态",
                key: "audit_results",
                search: {
                    disabled: false
                },
                formatter: (row, column, cellValue) => {
                    if (cellValue === 1) {
                        return '通过';
                    } else if (cellValue === 0) {
                        return '未通过';
                    } else if (cellValue === -1) {
                        return '待审核'; // 你可以根据需要修改这里的文本
                    } else {
                        return '未知状态'
                    }
                },
                render: 'renderAuditStatus',
                width: 100,
                sortable: false,
                type: "select",
                dict: {
                    data: [
                        { value: '1', label: '通过' },
                        { value: '0', label: '未通过' },
                        { value: '-1', label: '待审核' }, // ...
                    ]
                },
                form: {
                    disabled: true,
                    editDisabled: true,
                    rules: [
                        // 表单校验规则
                        {
                            show: false,
                            required: false,
                            message: ""
                        }
                    ],
                    component: {
                        props: {
                            clearable: true
                        },
                        
                    },
                    itemProps: {
                        class: { yxtInput: true }
                    }
                }
            },

        ].concat(vm.commonEndColumns())
    };
};
