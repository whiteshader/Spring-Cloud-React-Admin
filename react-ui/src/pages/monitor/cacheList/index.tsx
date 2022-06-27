import React, { useEffect, useState } from 'react';
import { clearCacheAll, clearCacheKey, clearCacheName, getCacheValue, listCacheKey, listCacheName } from './service';
import { Button, Card, Col, Form, Input, message, Row, Table } from 'antd';
import styles from './index.less';
import type { CacheNamesResponseType, CacheDataType } from './data';
import WrapContent from '@/components/WrapContent';
import { FormattedMessage } from 'umi';
import { ReloadOutlined } from '@ant-design/icons';

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
  const [cacheContent, setCacheContent] = useState<CacheDataType>();
  const [form] = Form.useForm();

  const getCacheNames = () => {
    listCacheName().then((res: CacheNamesResponseType) => {
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

  const onClearAll = () => {
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
      width: '220px',
      valueType: 'option',
      render: (_: any, record: CacheDataType) => [
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
      width: '220px',
      valueType: 'option',
      render: (_: any, record: CacheDataType) => [
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
    <WrapContent>
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <Card title="缓存列表" extra={<Button icon={<ReloadOutlined />} onClick={()=>{ refreshCacheNames()}} type="link" />} className={styles.card}>
            <Table
              dataSource={cacheNames}
              columns={columns}
              onRow={(record: CacheDataType) => {
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
              dataSource={cacheKeys}
              columns={cacheKeysColumns}
              onRow={(record: any) => {
                return {
                  onClick: () => {
                    getCacheValue(currentCacheName, record.cacheKey).then(res => {
                      if (res.code === 200) {
                        setCacheContent(res.data);
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
            <Form
              name="basic"
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ cacheName: cacheContent?.cacheName }}
              onFinish={onClearAll}
              onFinishFailed={onClearAllFailed}
              autoComplete="off"
            >
              <Form.Item
                label="cacheName"
                name="cacheName"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="cacheKey"
                name="cacheKey"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="cacheValue"
                name="cacheValue"
                rules={[{ required: true }]}
              >
                <TextArea autoSize={{ minRows: 2 }} />
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </WrapContent>
  );
};

export default CacheList;
