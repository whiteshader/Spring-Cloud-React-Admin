import styles from './index.less';

const WrapContent: React.FC = (props) => {
    return (
        <div className={styles.wraper} >{props.children}</div>
    )
};

export default WrapContent;