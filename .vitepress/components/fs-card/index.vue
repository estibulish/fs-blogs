<template>
    <div class="fs-card">
        <!-- <slot></slot> -->
        <div class="card-header">
            <slot name="ui"></slot>
        </div>
        <!-- <div class="">
            <div class="card_operate">
                <el-space wrap>
                    <el-icon><DocumentCopy /></el-icon>
                    <el-icon @click="toggle"><Rank /></el-icon>
                </el-space>
            </div>
            <div class="card-code" v-if="active">
                <slot name="code"></slot>
                <slot></slot>
            </div>
        </div> -->
    </div>
</template>

<script>
    export default {
        name: 'fs-card',
        data() {
            return {
                active: false
            }
        },
    }
</script>
<script setup>
import { ref } from 'vue'
import {
    DocumentCopy,Rank
} from '@element-plus/icons-vue'
const active = ref(false)
const toggle = () => {
    active.value = !active.value;
}
</script>

<style lang="scss" scoped>
.fs-card {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    .card-header {
        padding: 1.2rem;
        margin: .5px;
    }
    .card_operate {
        border-top: 1px solid #dcdfe6;
        padding: 10px;
        display: flex;
        justify-content: flex-end;
        cursor: pointer;
    }
    .card-code {
        padding: 1.0rem;
        background-color: #f5f7fa;
    }
}
</style>