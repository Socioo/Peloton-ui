import React from 'react'
import { Progress, Card, Row, Col } from 'antd';
import Rechart from '../components/rechart';
import SummaryCard from '../components/SummaryCard';

export default function Dashboard() {
  return (
    <Row gutter={[24, 24]}>
      <Col span={8}>
      <SummaryCard 
        title="Total Products"
        value={5}/>
      </Col>
      <Col span={8}>
        <SummaryCard 
        title="Total Purchase"
        value={30}
        />
      </Col>
      <Col span={8}>
        <SummaryCard
          title="Total Sale"
          value={43}
        />
      </Col>
      <Col span={12} style={{ height: "400px" }}>
        <Rechart />
      </Col>
      <Col span={12}>
      <Card  title="Products Sales" >
        <Progress percent={30} />
        <Progress percent={50} status="active" />
        <Progress percent={70} status="exception" />
        <Progress percent={100} />
        <Progress percent={50} showInfo={false} />
      </Card>
      </Col>
      <Col span={12}>
      {/* <Card title="title">
        <Progress percent={30} />
        <Progress percent={50} format={(percent) => `${percent} Days`} status="active" />
        <Progress percent={70} status="exception" />
        <Progress percent={100} />
        <Progress percent={50} showInfo={false} />
      </Card> */}
      </Col>
    </Row>
  )
}
