import { Ref } from 'vue';
import { GraphState } from '../components/Types/index';

const addVertexData = (vertex: number, data: string, graphState: Ref<GraphState>) => {
  graphState.value.vertexData[vertex] = data;
};

export default addVertexData;
