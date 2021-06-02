import styles from './home.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import httpClient from '@/services/http-client';
import { calculateAge } from '../../helper';
import { history } from 'umi';

export default class Home extends React.Component {
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
    httpClient.get(`/users`).then((res: { data: { data: any } }) => {
      this.setState({
        userLst: res.data.data,
        random: 2 + Math.round(Math.random() * 48),
      });
    });
  }

  markUser(data: any) {
    httpClient.post('/users/mark', data).then((response: any) => {
      this.getUsersLst();
    });
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
            {userLst[random]?.lastName ? userLst[random]?.lastName : ''}{' '}
            {userLst[random]?.dateOfBirth
              ? calculateAge(userLst[random]?.dateOfBirth)
              : ''}
            {}
          </div>
          <div className={styles.actionBox}>
            <div
              className={styles.actionButton}
              onClick={() => {
                this.markUser({
                  fromUserId: localStorage.getItem('currentUserId'),
                  markVal: 0,
                  toUserId: userLst[random]?.id,
                });
              }}
            >
              <FontAwesomeIcon icon={faTimes} size={'2x'} color={'grey'} />
            </div>
            <div
              className={styles.actionButton}
              onClick={() =>
                this.markUser({
                  fromUserId: localStorage.getItem('currentUserId'),
                  markVal: 1,
                  toUserId: userLst[random]?.id,
                })
              }
            >
              <FontAwesomeIcon icon={faHeart} size={'2x'} color={'red'} />
            </div>
            <div
              className={styles.actionButton}
              onClick={() => history.push('/marked-list')}
            >
              <FontAwesomeIcon icon={faUsers} size={'2x'} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
