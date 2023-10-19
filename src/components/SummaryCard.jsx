import { Card, Statistic  } from 'antd';
import React from 'react';

const SummaryCard = ({ title, value, loading }) => {
  if (loading) return <div>Loader...</div>
  return (
    <Card style={{ width: 300 }}>
      <Statistic 
        title={title} 
        value={value} />
    </Card>
  )
}

export default SummaryCard;