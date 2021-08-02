import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title, Text } = Typography;

export const mainHeader = ({ company }) => {
  return (
    <Header
      className="site-layout-background"
      style={{
        textAlign: 'center',
        padding: 0,
        lineHeight: 0,
        background: '#f0f2f5',
        height: '8ch',
      }}
    >
      <Title
        style={{ lineHeight: 1.5, fontSize: '2rem' }}
      >{`${company.companyName} ${company.companySuffix}`}</Title>
      <Text
        style={{ lineHeight: 0, fontSize: '1.25em' }}
        italic={true}
      >{`"${company.catchPhrase}"`}</Text>
    </Header>
  );
};