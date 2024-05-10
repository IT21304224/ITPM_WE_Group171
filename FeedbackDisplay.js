// components/FeedbackPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/v1/feedback/all');
        setFeedbacks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Feedback',
      dataIndex: 'feedback',
      key: 'feedback',
      ellipsis: true,
    },
    {
      title: 'Submitted At',
      dataIndex: 'submittedAt',
      key: 'submittedAt',
      render: (submittedAt) => new Date(submittedAt).toLocaleString(),
    },
   
  ];

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div>
      <h2>All Feedbacks</h2>
      <Spin indicator={antIcon} spinning={loading}>
        <Table
          dataSource={feedbacks}
          columns={columns}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 10 }}
        />
      </Spin>
    </div>
  );
};

export default FeedbackPage;
