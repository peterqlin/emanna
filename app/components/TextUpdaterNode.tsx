import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }: { data: any; isConnectable: boolean }) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node border border-gray-200 p-1.5 rounded bg-white">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text" className="block text-gray-500 text-xs">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
        <div className="text-xs">{data.label}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
