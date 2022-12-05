export type Node = {
  node_type: string;
  name: string;
  id: number;
  self_size: number;
  edge_count: number;
  trace_node_id: number;
  retained_size: number;
  edges: {
    edge_type: string;
    to_node: number;
    name_or_index: string;
    is_weak_retainer: boolean;
    is_retainer: boolean;
  }[];
  parents: number[];
}