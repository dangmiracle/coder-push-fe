import styles from './index.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
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
    this.initCurrentUser();
    this.getUsersLst();
  }
  initCurrentUser() {
    let currentUserId = localStorage.getItem('currentUserId');
    if (!currentUserId) {
      localStorage.setItem('currentUserId', '1'); // fix for current user
    }
  }

  getUsersLst() {
    fetch(process.env.BACKEND_API_URL + '/users', {})
      .then((response) => response.json())
      .then((json) =>
        this.setState({
          userLst: json.data,
          random: 2 + Math.round(Math.random() * 48),
        }),
      );
  }

  markUser(data: any) {
    fetch(process.env.BACKEND_API_URL + '/users/mark', data).then((response) =>
      this.getUsersLst(),
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
            <div
              className={styles.actionButton}
              onClick={() =>
                this.markUser({
                  fromUserMarkValue: 0,
                  fromUserId: localStorage.getItem('currentUserId'),
                  toUserId: userLst[random]?.id,
                })
              }
            >
              <FontAwesomeIcon icon={faTimes} size={'2x'} color={'grey'} />
            </div>
            <div
              className={styles.actionButton}
              onClick={() =>
                this.markUser({
                  fromUserMarkValue: 1,
                  fromUserId: localStorage.getItem('currentUserId'),
                  toUserId: userLst[random]?.id,
                })
              }
            >
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
