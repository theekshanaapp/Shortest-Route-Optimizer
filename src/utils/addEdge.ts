import { Ref } from 'vue';
import { GraphState } from '../components/Types/index';

const addEdge = (u: string, v: string, weight: number, graphState: Ref<GraphState>) => {
  if (!graphState.value.adjacencyList[u]) {
    graphState.value.adjacencyList[u] = {};
  }
  graphState.value.adjacencyList[u][v] = weight;
};

export default addEdge;