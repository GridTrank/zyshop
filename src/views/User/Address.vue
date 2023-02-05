<template>
    <div class="con-wrap">
        <div class="title">我的地址</div>
        <div class="info">
            <el-form :model="model" label-width="120px">
                <el-form-item label="地址信息：">
                    <el-cascader style="width: 500px" clearable :options="addressData" :disabled="false" @change="handleAddress"  v-model="addressSelections" placeholder="请选择省市区"></el-cascader>
                </el-form-item>
                <el-form-item label="详细地址：">
                    <el-input style="width: 500px;" placeholder="请输入详细地址" v-model="model.detail"></el-input>
                </el-form-item>
                <el-form-item label="收货人姓名：">
                    <el-input style="width: 500px;" placeholder="请输入收货人姓名" v-model="model.name"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：">
                    <el-input style="width: 500px;" placeholder="请输入联系电话" v-model="model.mobile"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-checkbox v-model="model.checked">设为默认地址</el-checkbox>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary">保存</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" border>
                <el-table-column label="收货人"></el-table-column>
                <el-table-column label="所在地区"></el-table-column>
                <el-table-column label="详细地址"></el-table-column>
                <el-table-column label="电话/手机"></el-table-column>
                <el-table-column label="操作"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
export default {
    data() {
        return {
            //地址信息
            addressData: regionData,
            addressSelections: [],
            model:{},
            tableData:[]
        }
    },
    created() { },
    computed: {},
    methods: {
        handleAddress(e) {
            console.log(123123, this.getCodeToText(e))
        },
        getCodeToText( codeArray) {
            if ( null === codeArray) {
                return null;
            }
            let area = "";
            switch (codeArray.length) {
                case 1:
                    area += CodeToText[codeArray[0]];
                    break;
                case 2:
                    area += CodeToText[codeArray[0]] + "/" + CodeToText[codeArray[1]];
                    break;
                case 3:
                    area +=
                        CodeToText[codeArray[0]] +
                        "/" +
                        CodeToText[codeArray[1]] +
                        "/" +
                        CodeToText[codeArray[2]];
                    break;
                default:
                    break;
            }
            return area;
        }

    },
}
</script>
<style lang="less" scoped>
.con-wrap {
    padding: 20px;
    border-style: solid;
    border-color: #f1f1f1;
    border-width: 1px;

    .title {
        color: #000;
        font-weight: 600;
    }

    .info {
        margin-top: 30px;

    }
}
</style>