import React, { useEffect, useState } from 'react';
import { getServerInfo } from './service';
import { Card, Col, Row, Table } from 'antd';
import styles from './style.less';
import { FormattedMessage } from 'umi';
import type { CpuRowType, MemRowType, ServerInfoResponseType, DiskInfoType } from './data';
import WrapContent from '@/components/WrapContent';


/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */


const columns = [
  {
    title: '属性',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '值',
    dataIndex: 'value',
    key: 'value',
  },
];

const memColumns = [
  {
    title: '属性',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '内存',
    dataIndex: 'mem',
    key: 'mem',
  },
  {
    title: 'JVM',
    dataIndex: 'jvm',
    key: 'jvm',
  },
];

const hostColumns = [
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
];

const diskColumns = [
  {
    title: <FormattedMessage id="monitor.server.disk.dirName" defaultMessage="盘符路径" />,
    dataIndex: 'dirName',
    key: 'dirName',
  },
  {
    title: <FormattedMessage id="monitor.server.disk.sysTypeName" defaultMessage="文件系统" />,
    dataIndex: 'sysTypeName',
    key: 'sysTypeName',
  },
  {
    title: <FormattedMessage id="monitor.server.disk.typeName" defaultMessage="盘符类型" />,
    dataIndex: 'typeName',
    key: 'typeName',
  },
  {
    title: <FormattedMessage id="monitor.server.disk.total" defaultMessage="总大小" />,
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: <FormattedMessage id="monitor.server.disk.free" defaultMessage="可用大小" />,
    dataIndex: 'free',
    key: 'free',
  },
  {
    title: <FormattedMessage id="monitor.server.disk.used" defaultMessage="已用大小" />,
    dataIndex: 'used',
    key: 'used',
  },
  {
    title: <FormattedMessage id="monitor.server.disk.usage" defaultMessage="已用百分比" />,
    dataIndex: 'usage',
    key: 'usage',
  },
];

const ServerInfo: React.FC = () => {
  const [cpuData, setCpuData] = useState<CpuRowType[]>([]);
  const [memData, setMemData] = useState<MemRowType[]>([]);
  const [hostData, setHostData] = useState<any>([]);
  const [jvmData, setJvmData] = useState<any>([]);
  const [diskData, setDiskData] = useState<any>([]);

  useEffect(() => {
    getServerInfo().then((res: ServerInfoResponseType) => {
      if (res.code === 200) {
        // const cpuinfo: CpuRowType[] = [];
        // Object.keys(res.data.cpu).forEach((item: any) => {
        //   cpuinfo.push({
        //     name: item,
        //     value: res.data.cpu[item],
        //   });
        // });
        // setCpuData(cpuinfo);

        const cpuinfo: CpuRowType[] = [];
        cpuinfo.push({ name: '核心数', value: res.data.cpu.cpuNum });
        cpuinfo.push({ name: '用户使用率', value: `${res.data.cpu.used}%` });
        cpuinfo.push({ name: '系统使用率', value: `${res.data.cpu.sys}%` });
        cpuinfo.push({ name: '当前空闲率', value: `${res.data.cpu.free}%` });

        setCpuData(cpuinfo);

        const memDatas: MemRowType[] = [];
        memDatas.push({
          name: '总内存',
          mem: `${res.data.mem.total}G`,
          jvm: `${res.data.jvm.total}M`,
        });
        memDatas.push({
          name: '已用内存',
          mem: `${res.data.mem.used}G`,
          jvm: `${res.data.jvm.used}M`,
        });
        memDatas.push({
          name: '剩余内存',
          mem: `${res.data.mem.free}G`,
          jvm: `${res.data.jvm.free}M`,
        });
        memDatas.push({
          name: '使用率',
          mem: `${res.data.mem.usage}%`,
          jvm: `${res.data.jvm.usage}%`,
        });
        setMemData(memDatas);

        const hostinfo = [];
        hostinfo.push({
          col1: '服务器名称',
          col2: res.data.sys.computerName,
          col3: '操作系统',
          col4: res.data.sys.osName,
        });
        hostinfo.push({
          col1: '服务器IP',
          col2: res.data.sys.computerIp,
          col3: '系统架构',
          col4: res.data.sys.osArch,
        });
        setHostData(hostinfo);

        const jvminfo = [];
        jvminfo.push({
          col1: 'Java名称',
          col2: res.data.jvm.name,
          col3: 'Java版本',
          col4: res.data.jvm.version,
        });
        jvminfo.push({
          col1: '启动时间',
          col2: res.data.jvm.startTime,
          col3: '运行时长',
          col4: res.data.jvm.runTime,
        });
        jvminfo.push({
          col1: '安装路径',
          col2: res.data.jvm.home,
          col3: '项目路径',
          col4: res.data.sys.userDir,
        });
        setJvmData(jvminfo);

        const diskinfo = res.data.sysFiles.map((item: DiskInfoType) => {
          return {
            dirName: item.dirName,
            sysTypeName: item.sysTypeName,
            typeName: item.typeName,
            total: item.total,
            free: item.free,
            used: item.used,
            usage: `${item.usage}%`,
          };
        });
        setDiskData(diskinfo);
      }
    });
  }, []);

  return (
    <WrapContent>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card title="CPU" className={styles.card}>
            <Table pagination={false} showHeader={false} dataSource={cpuData} columns={columns} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="内存" className={styles.card}>
            <Table
              pagination={false}
              showHeader={false}
              dataSource={memData}
              columns={memColumns}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="服务器信息" className={styles.card}>
            <Table
              pagination={false}
              showHeader={false}
              dataSource={hostData}
              columns={hostColumns}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Java虚拟机信息" className={styles.card}>
            <Table
              pagination={false}
              showHeader={false}
              dataSource={jvmData}
              columns={hostColumns}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="磁盘状态" className={styles.card}>
            <Table pagination={false} dataSource={diskData} columns={diskColumns} />
          </Card>
        </Col>
      </Row>
    </WrapContent>
  );
};

export default ServerInfo;
