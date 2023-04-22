import React, { useEffect, useState, useRef } from 'react';
import { clearCacheAll, clearCacheKey, clearCacheName, getCacheValue, listCacheKey, listCacheName } from '@/services/monitor/cachelist';
import { Button, Card, Col, Form, FormInstance, Input, message, Row, Table } from 'antd';
import styles from './index.less';  
import { FormattedMessage } from '@umijs/max';
import { ReloadOutlined } from '@ant-design/icons';
import { ProForm } from '@ant-design/pro-components';

const { TextArea } = Input;


/* *
 *
 * @author whiteshader@163.com
 * @datetime  2022/06/27
 * 
 * */



const CacheList: React.FC = () => {
  const [cacheNames, setCacheNames] = useState<any>([]);
  const [currentCacheName, setCurrentCacheName] = useState<any>([]);
  const [cacheKeys, setCacheKeys] = useState<any>([]);
  const [form] = Form.useForm();

  const getCacheNames = () => {
    listCacheName().then((res) => {
      if (res.code === 200) {
        setCacheNames(res.data);
      }
    });
  }

  useEffect(() => {
    getCacheNames();
  }, []);

  const getCacheKeys = (cacheName: string) => {
    listCacheKey(cacheName).then(res => {
      if (res.code === 200) {
        let index = 0;
        const keysData = res.data.map((item: any) => {
          return {
            index: index++,
            cacheKey: item
          }
        })
        setCacheKeys(keysData);
      }
    });
  };

  const onClearAll = async () => {
    clearCacheAll().then(res => {
      if(res.code === 200) {
        message.success("清理全部缓存成功");
      }
    });
  };

  const onClearAllFailed = (errorInfo: any) => {
    message.error('Failed:', errorInfo);
  };
  
  const refreshCacheNames = () => {    
    getCacheNames();
    message.success("刷新缓存列表成功");
  };

  const refreshCacheKeys = () => {
    getCacheKeys(currentCacheName);
    message.success("刷新键名列表成功");
  };

  const columns = [
    {
      title: '缓存名称',
      dataIndex: 'cacheName',
      key: 'cacheName',
      render: (_: any, record: any) => {
        return record.cacheName.replace(":", "");
      }
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      dataIndex: 'option',
      width: '40px',
      valueType: 'option',
      render: (_: any, record: API.Monitor.CacheContent) => [
        <Button
          type="link"
          size="small"
          key="remove"
          onClick={() => {
            clearCacheName(record.cacheName).then(res => {
              if(res.code === 200) {
                message.success("清理缓存名称[" + record.cacheName + "]成功");
                getCacheKeys(currentCacheName);
              }
            });
          }}
        >
          <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />
        </Button>,
      ]
    }
  ];

  const cacheKeysColumns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index'
    },
    {
      title: '缓存键名',
      dataIndex: 'cacheKey',
      key: 'cacheKey',
      render: (_: any, record: any) => {
        return record.cacheKey.replace(currentCacheName, "");
      }
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      dataIndex: 'option',
      width: '40px',
      valueType: 'option',
      render: (_: any, record: API.Monitor.CacheContent) => [
        <Button
          type="link"
          size="small"
          key="remove"
          onClick={() => {
            console.log(record)
            clearCacheKey(record.cacheKey).then(res => {
              if(res.code === 200) {
                message.success("清理缓存键名[" + record.cacheKey + "]成功");
                getCacheKeys(currentCacheName);
              }
            });
          }}
        >
          <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />
        </Button>,
      ]
    }
  ];

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <Card title="缓存列表" extra={<Button icon={<ReloadOutlined />} onClick={()=>{ refreshCacheNames()}} type="link" />} className={styles.card}>
            <Table
              rowKey="cacheName"
              dataSource={cacheNames}
              columns={columns}
              onRow={(record: API.Monitor.CacheContent) => {
                return {
                  onClick: () => {
                    setCurrentCacheName(record.cacheName);
                    getCacheKeys(record.cacheName);
                  },
                };
              }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="键名列表" extra={<Button icon={<ReloadOutlined />} onClick={()=>{ refreshCacheKeys()}} type="link" />} className={styles.card}>
            <Table
              rowKey="index"
              dataSource={cacheKeys}
              columns={cacheKeysColumns}
              onRow={(record: any) => {
                return {
                  onClick: () => {
                    getCacheValue(currentCacheName, record.cacheKey).then(res => {
                      if (res.code === 200) {
                        form.resetFields();
                        form.setFieldsValue({
                          cacheName: res.data.cacheName,
                          cacheKey: res.data.cacheKey,
                          cacheValue: res.data.cacheValue,
                          remark: res.data.remark,
                        });
                      }
                    });
                  },
                };
              }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="缓存内容" extra={<Button icon={<ReloadOutlined />} onClick={()=>{ onClearAll()}} type="link" >清理全部</Button>} className={styles.card}>
            <ProForm
              name="basic"
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onClearAll}
              onFinishFailed={onClearAllFailed}
              autoComplete="off"
            >
              <Form.Item
                label="缓存名称"
                name="cacheName"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="缓存键名"
                name="cacheKey"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="缓存内容"
                name="cacheValue"
              >
                <TextArea autoSize={{ minRows: 2 }} />
              </Form.Item>
            </ProForm>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CacheList;
