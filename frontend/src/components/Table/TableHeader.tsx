import React from 'react';

const TableHeader = ({ readonly }) => (
  <thead>
    <tr>
      <th>Day</th>
      <th>Goal</th>
      <th>Done</th>
      <th>Comment</th>
      {!readonly && <th>Actions</th>}
    </tr>
  </thead>
);

export default TableHeader;
