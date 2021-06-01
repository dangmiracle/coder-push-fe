import styles from './index.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faHeart,
  faTimes,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
export default class extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      userLst: [],
      random: 0,
    };
  }

  componentDidMount() {
    fetch('https://dummyapi.io/data/api/user?limit=50', {
      headers: {
        'app-id': '60349db146ff8b0837d18351',
      },
    })
      .then((response) => response.json())
      .then((json) =>
        this.setState({
          userLst: json.data,
          random: Math.round(Math.random() * 50),
        }),
      );
  }

  render() {
    const { userLst, random } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.contentBox}>
          <div className={styles.imageBox}>
            <div className={styles.imageContent}>
              <img src={userLst[random]?.picture} width={'100%'}></img>
            </div>
          </div>
          <div className={styles.infoBox}>
            {userLst[random]?.firstName ? userLst[random]?.firstName : ''}{' '}
            {userLst[random]?.lastName ? userLst[random]?.lastName : ''}
          </div>
          <div className={styles.actionBox}>
            <div className={styles.actionButton}>
              <FontAwesomeIcon icon={faTimes} size={'2x'} color={'grey'} />
            </div>
            <div className={styles.actionButton}>
              <FontAwesomeIcon icon={faHeart} size={'2x'} color={'red'} />
            </div>
            <div className={styles.actionButton}>
              <FontAwesomeIcon icon={faUsers} size={'2x'} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
