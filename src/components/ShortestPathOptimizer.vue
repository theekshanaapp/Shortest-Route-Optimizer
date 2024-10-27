<template>
  <div class="card mt-[-175px] flex flex-col justify-center items-center">
    <div class="toggle-wrapper flex relative bg-white rounded-[8px] px-3 py-2 max-w-[270px] justify-center mb-6">
      <Toggle
        :label="mode === 'random' ? 'Disable Random Mode' : 'Enable Random Mode'"
        :hasRefreshIcon="hasRefreshIcon"
        :modelValue="mode === 'random'"
        @update:checked="handleToggleChange"
        @refreshClick="fetchRandomRefreshHandler"
      />
    </div>

    <div class="w-[721px] bg-white rounded-[8px] shadow-md flex flex-col md:w-[400px]">
      <div class="card-inner">
        <div class="grid grid-cols-2 card-grid md:grid-cols-1">
          <div class="card-left py-[32px] pl-[32px] pr-[24px]">
            <h3 class="text-lg text-color-primary font-semibold mb-[24px]">
              Select Path
            </h3>
            <div class="form-row mb-[24px] md:mb-0">
              <Select
                id="fromNode"
                placeholder="Select"
                label="From node:"
                :options="SELECT_OPTIONS"
                :value="fromSelectedOption"
                :disabled="isSelectDisabled"
                @change="handleFromChange" 
              />
            </div>
            <div class="form-row mb-[24px] mt-4">
              <Select
                id="toNode"
                placeholder="Select"
                label="To node:"
                :options="SELECT_OPTIONS"
                :value="toSelectedOption"
                :disabled="isSelectDisabled"
                @change="handleToChange"
              />
            </div>

            <div class="flex items-center justify-start">
              <Button
                appearance="outline"
                class="mr-[12px] h-[44px] w-full"
                style="width: 50%;"
                type="reset"
                :disabled="isClearBtnDisabled"
                @click="clearBtnHandler"
                v-if="mode !== 'random'"
              >
                Clear
              </Button>
              <Button
                appearance="solid"
                hasIcon
                :loading="isAppLoading"
                :disabled="isCalculateBtnDisabled"
                class="min-w-[146px] h-[44px] w-full"
                @click="calculateHandler"
                :icon="calculatorIcon"
              >
                {{ mode === 'input' ? 'Calculate' : 'Calculate Random' }}
              </Button>
            </div>

            <Message v-if="isInputValidationErr" label="Please select valid FROM and TO nodes." status="error" />
            <Message v-if="isAppError" :label="`Something went wrong. Status code: ${resultResStatus}`" status="error" />
          </div>
          <div class='relative flex items-center justify-center w-full h-full card-right'>
            <ImagePlaceholder v-if="isAppDefault" />
            <Loader v-if="isAppLoading" />
            <ResultCard
              v-if="isAppSuccess"
              :fromNode="fromNode"
              :toNode="toNode"
              :nodeNames="resultNodeNames"
              :distance="resultDistance"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, toRaw, defineExpose} from 'vue';
import Toggle from './Toggle/Toggle.vue';
import Select from './Select/Select.vue';
import Button from './Button/Button.vue';
import ImagePlaceholder from './ImagePlaceholder/ImagePlaceholder.vue';
import ResultCard from './ResultCard/ResultCard.vue';
import Message from './Message/Message.vue';
import Loader from './Loader/Loader.vue';
import calculatorIcon from '../assets/calculator.svg';
import { OptionType } from './Select/Select.vue';

import addEdge from '../utils/addEdge'
import addVertexData from '../utils/addVertexData'
import {GraphState} from './Types/index'
import { dijkstra } from '../utils/dijkstra'
import sendDataToEchoAPI from '../utils/SendShortestPathData';
import getRandomNumbers from '../utils/getRandomNumbers';

// Define reactive states
const mode = ref('input');
const hasRefreshIcon = true;
const fromSelectedOption = ref<OptionType | null>(null); 
const toSelectedOption = ref<OptionType | null>(null); 
const isSelectDisabled = ref(false); 
const isClearBtnDisabled = ref(false); 
const isCalculateBtnDisabled = ref(false); 
const isAppLoading = ref(false);
const isAppDefault = ref(true);
const isAppSuccess = ref(false);
const isAppError = ref(false);
const isInputValidationErr = ref(false);
const resultResStatus = ref<number | undefined>(undefined);
const resultNodeNames = ref<string[]>([]);
const resultDistance = ref<number | undefined>(undefined);

// Define fromNode and toNode
const fromNode = ref<string | undefined>(undefined);
const toNode = ref<string | undefined>(undefined);

const SELECT_OPTIONS: OptionType[] = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
  { value: 'G', label: 'G' },
  { value: 'H', label: 'H' },
  { value: 'I', label: 'I' },
];

const graphState = ref<GraphState>({
  vertexData: Array(9).fill(''),
  adjacencyList: {},
});

onMounted(() => {
  addVertexData(0, 'A', graphState);
  addVertexData(1, 'B', graphState);
  addVertexData(2, 'C', graphState);
  addVertexData(3, 'D', graphState);
  addVertexData(4, 'E', graphState);
  addVertexData(5, 'F', graphState);
  addVertexData(6, 'G', graphState);
  addVertexData(7, 'H', graphState);
  addVertexData(8, 'I', graphState);

  addEdge('A', 'B', 4, graphState);
  addEdge('A', 'C', 6, graphState);
  addEdge('B', 'F', 2, graphState);
  addEdge('C', 'D', 8, graphState);
  addEdge('D', 'C', 8, graphState);
  addEdge('D', 'E', 4, graphState);
  addEdge('D', 'G', 1, graphState);
  addEdge('E', 'B', 2, graphState);
  addEdge('E', 'F', 3, graphState);
  addEdge('E', 'I', 8, graphState);
  addEdge('E', 'D', 4, graphState);
  addEdge('F', 'B', 2, graphState);
  addEdge('F', 'E', 3, graphState);
  addEdge('F', 'G', 4, graphState);
  addEdge('G', 'D', 1, graphState);
  addEdge('G', 'F', 4, graphState);
  addEdge('G', 'I', 5, graphState);
  addEdge('I', 'E', 8, graphState);
  addEdge('I', 'G', 5, graphState);
});

// Function to handle toggle change
const handleToggleChange = async (checked: boolean) => {
  mode.value = checked ? 'random' : 'input';
  isSelectDisabled.value = checked;
  isAppDefault.value = true;
  isAppSuccess.value = false;

  if (mode.value === 'random') {
    isCalculateBtnDisabled.value = true;
    try {
      const randomLetters = await getRandomNumbers();

      const fromOption = SELECT_OPTIONS.find(option => option.value === randomLetters.fromNode);
      const toOption = SELECT_OPTIONS.find(option => option.value === randomLetters.toNode);

      if (fromOption && toOption) {
        fromSelectedOption.value = fromOption;
        toSelectedOption.value = toOption;
      } else {
        console.warn("Randomly selected nodes not found in options.");
      }

      isCalculateBtnDisabled.value = false;
      
    } catch (error) {
      console.error("Error fetching random numbers:", error);
    }
  } else {
    
  }
};

const handleFromChange = (selectedOption: OptionType | null) => {
  fromSelectedOption.value = selectedOption;
};

const handleToChange = (selectedOption: OptionType | null) => {
  toSelectedOption.value = selectedOption;
};

const fetchRandomRefreshHandler = () => {
  handleToggleChange(true);
};

const clearBtnHandler = () => {
  fromSelectedOption.value = null;
  toSelectedOption.value = null;
  fromNode.value = undefined; // Reset fromNode
  toNode.value = undefined; // Reset toNode
  isAppDefault.value = true;
  isAppSuccess.value = false;
  isAppError.value = false;
  isInputValidationErr.value = false;
};

const calculateHandler = async () => {
  if (!fromSelectedOption.value || !toSelectedOption.value) {
    isInputValidationErr.value = true;
    return;
  }

  isInputValidationErr.value = false;
  isAppLoading.value = true;
  isAppDefault.value = false;
  isAppSuccess.value = false;

  const fromNodeValue = fromSelectedOption.value.label;
  const toNodeValue = toSelectedOption.value.label;

  fromNode.value = fromNodeValue;
  toNode.value = toNodeValue;

  try {
    const { nodeNames, distance } = dijkstra(toRaw(graphState.value), fromNodeValue, toNodeValue);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const apiData = {
      nodeNames: nodeNames.length ? nodeNames : ['No path found'],
      distance: distance !== -1 ? distance : Infinity,
    };

    const response = await sendDataToEchoAPI(apiData);

    if (response?.data?.parsedBody) {
      const { nodeNames, distance } = response.data.parsedBody;
      resultNodeNames.value = nodeNames?.length ? nodeNames : ['No path found'];
      resultDistance.value = distance !== -1 ? distance : Infinity;
    } else {
      // Fallback if response data is missing or not in expected format
      resultNodeNames.value = ['No path found'];
      resultDistance.value = Infinity;
    }

    isAppSuccess.value = true;
  } catch (error) {
    console.error("Error calculating path:", error);
    resultNodeNames.value = ['Error occurred'];
    resultDistance.value = Infinity;
    isAppSuccess.value = false;
  } finally {
    isAppLoading.value = false;
  }
};

// Exposing the methods for testing
defineExpose({
  calculateHandler: calculateHandler as () => Promise<void>,
  handleFromChange: handleFromChange as (selected: OptionType | null) => void,
  handleToChange: handleToChange as (selected: OptionType | null) => void,
});
</script>
