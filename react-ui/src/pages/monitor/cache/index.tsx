import React, { useEffect, useState } from 'react';
import { getCacheInfo } from './service';
import { Card, Col, Row, Table } from 'antd';
import styles from './index.less';
import type { CacheInfoResponseType } from './data';
import WrapContent from '@/components/WrapContent';
import type { VisitDataType } from '@/pages/dashboard/analysis/data';
import Gauge from '@/pages/dashboard/monitor/components/Charts/Gauge';
import Pie from '@/pages/dashboard/analysis/components/Charts/Pie';



/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */


const columns = [
  {
    title: 'col1',
    dataIndex: 'col1',
    key: 'col1',
  },
  {
    title: 'col2',
    dataIndex: 'col2',
    key: 'col2',
  },
  {
    title: 'col3',
    dataIndex: 'col3',
    key: 'col3',
  },
  {
    title: 'col4',
    dataIndex: 'col4',
    key: 'col4',
  },
  {
    title: 'col5',
    dataIndex: 'col5',
    key: 'col5',
  },
  {
    title: 'col6',
    dataIndex: 'col6',
    key: 'col6',
  },
  {
    title: 'col7',
    dataIndex: 'col7',
    key: 'col7',
  },
  {
    title: 'col8',
    dataIndex: 'col8',
    key: 'col8',
  },
];

const usageFormatter = (val: string): string => {
  switch (val) {
    case '10':
      return '100%';
    case '8':
      return '80%';
    case '6':
      return '60%';
    case '4':
      return '40%';
    case '2':
      return '20%';
    case '0':
      return '0%';
    default:
      return '';
  }
};

const CacheInfo: React.FC = () => {
  const [baseInfoData, setBaseInfoData] = useState<any>([]);
  const [memUsage, setMemUsage] = useState<any>([]);
  const [memUsageTitle, setMemUsageTitle] = useState<any>([]);
  const [cmdInfoData, setCmdInfoData] = useState<VisitDataType[]>([]);

  useEffect(() => {
    getCacheInfo().then((res: CacheInfoResponseType) => {
      if (res.code === 200) {
        const baseinfo = [];
        baseinfo.push({
          col1: 'Redis版本',
          col2: res.data.info.redis_version,
          col3: '运行模式',
          col4: res.data.info.redis_mode === 'standalone' ? '单机' : '集群',
          col5: '端口',
          col6: res.data.info.tcp_port,
          col7: '客户端数',
          col8: res.data.info.connected_clients,
        });
        baseinfo.push({
          col1: '运行时间(天)',
          col2: res.data.info.uptime_in_days,
          col3: '使用内存',
          col4: res.data.info.used_memory_human,
          col5: '使用CPU',
          col6: `${res.data.info.used_cpu_user_children}%`,
          col7: '内存配置',
          col8: res.data.info.maxmemory_human,
        });
        baseinfo.push({
          col1: 'AOF是否开启',
          col2: res.data.info.aof_enabled === '0' ? '否' : '是',
          col3: 'RDB是否成功',
          col4: res.data.info.rdb_last_bgsave_status,
          col5: 'Key数量',
          col6: res.data.dbSize,
          col7: '网络入口/出口',
          col8: `${res.data.info.instantaneous_input_kbps}/${res.data.info.instantaneous_output_kbps}kps`,
        });
        setBaseInfoData(baseinfo);

        const data: VisitDataType[] = res.data.commandStats.map((item) => {
          return {
            x: item.name,
            y: Number(item.value),
          };
        });

        setCmdInfoData(data);
        setMemUsageTitle(res.data.info.used_memory_human);
        setMemUsage(res.data.info.used_memory / res.data.info.total_system_memory);
      }
    });
  }, []);

  return (
    <WrapContent>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card title="基本信息" className={styles.card}>
            <Table
              pagination={false}
              showHeader={false}
              dataSource={baseInfoData}
              columns={columns}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card title="命令统计" className={styles.card}>
            <Pie hasLegend data={cmdInfoData} height={320} lineWidth={4} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="内存信息" className={styles.card}>
            <Gauge
              title={memUsageTitle}
              height={320}
              percent={memUsage}
              formatter={usageFormatter}
            />
          </Card>
        </Col>
      </Row>
    </WrapContent>
  );
};

export default CacheInfo;
