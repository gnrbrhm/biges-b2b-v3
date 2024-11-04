<template>
    <div>
      <div class="tab-group">
        <div v-for="(item, i) in list" :key="i + '-collapse-' + id" class="tab">
          <input :id="i + '-' + id" type="checkbox" name="tabs" />
          <label :for="i + '-' + id">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <g clip-path="url(#clip0)">
                <path
                  d="M0.46875 7.5H14.5312"
                  stroke="#1f1f1f4d"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.5 0.46875V14.5312"
                  stroke="#1f1f1f4d"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="15" height="15" fill="white" />
                </clipPath>
              </defs>
            </svg>
  
            {{ item.question }}
          </label>
          <div class="tab-content">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  // Props tanımlaması
  const props = defineProps({
    id: {
      required: true,
      type: String
    },
    list: {
      type: Array,
      default: () => []
    }
  })
  </script>
  
  <style lang="scss" scoped>
  .tab-group {
    width: 100%;
  }
  
  .tab {
    position: relative;
    width: 100%;
    background: rgba(31, 31, 31, 0.05);
    border: 1px solid rgba(31, 31, 31, 0);
    border-radius: 3px;
    margin-bottom: 0.5em;
  }
  
  .tab input {
    left: 0;
    position: absolute;
    top: 0;
    z-index: -999;
    visibility: hidden !important;
  }
  
  .tab label {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    color: rgba(31, 31, 31, 0.8);
    cursor: pointer;
    display: block;
    display: grid;
    grid-template-columns: 16px auto;
    grid-column-gap: 25px;
    align-items: center;
    padding: 25px;
  }
  
  .tab:hover {
    background: #ffffff;
    border: 1px solid rgba(31, 31, 31, 0.1);
    box-sizing: border-box;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }
  
  .tab-content {
    max-height: 0;
    overflow: hidden;
    transition: all 0.35s;
    padding-left: 65px;
  }
  
  .tab-content p {
    margin: 1em 0;
    font-style: normal;
    font-weight: normal;
   
  