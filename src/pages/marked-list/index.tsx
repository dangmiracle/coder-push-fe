import styles from './index.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faBackward,
  faHeart,
  faTimes,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import httpClient from '@/services/http-client';
import { calculateAge } from './../../../helper';
import { history } from 'umi';

export default class MarkedList extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      markedLst: [],
    };
  }

  componentDidMount() {
    this.getMarkedLst({ currentUserId: localStorage.getItem('currentUserId') });
  }

  getMarkedLst(data: any) {
    httpClient
      .post(`/users/marked-list`, { currentUserId: data.currentUserId })
      .then((res: { data: { data: any } }) => {
        this.setState({
          markedLst: res.data.data,
        });
      });
  }

  render() {
    const { markedLst, random } = this.state;
    const listItems = markedLst.map((user: any) => (
      <li key={user.id}>
        <img
          src={user?.picture}
          width={'40px'}
          style={{ borderRadius: 50 }}
        ></img>
        <span style={{ paddingLeft: 10 }}>
          {user?.firstName + ' ' + user?.lastName + ' '}
        </span>
        <span>{calculateAge(user?.dateOfBirth)}</span>
        <span style={{ paddingLeft: 10 }}>
          {user?.markVal == 1 ? (
            <FontAwesomeIcon icon={faHeart} size={'2x'} color={'red'} />
          ) : (
            <FontAwesomeIcon icon={faTimes} size={'2x'} color={'grey'} />
          )}
        </span>
      </li>
    ));
    return (
      <div className={styles.wrapper}>
        <div className={styles.contentBox}>
          <div className={styles.imageBox}>
            <div className={styles.imageContent}>
              <ul className={styles.scrollY}>{listItems}</ul>
            </div>
          </div>
          <div className={styles.actionBox}>
            <div
              className={styles.actionButton}
              onClick={() => history.push('/')}
            >
              <FontAwesomeIcon icon={faArrowLeft} size={'2x'} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
