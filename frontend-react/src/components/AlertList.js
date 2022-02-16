import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Badge, IconButton, ClickAwayListener } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';

export default function AlertList() {
  const [alertList, setAlertList] = useState([]);
  const [open, setOpen] = useState(false);
  const yourId = useSelector((state) => state.user.userInfo.userId);
  const count = useSelector((state) => state.user.alertLength);

  const getAlert = () => {
    axios
      .get(`/api/alert/${yourId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        setAlertList(res.data);
      })
      .catch((err) => console.log(err));
  };
  const openTooltip = () => {
    if (open === false) {
      getAlert();
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const closeTooltip = () => {
    setOpen(false);
  };

  // 링크 연결중 (시간되면 article 바로 띄워주는걸로)
  const getLink = (item) => {
    switch (item.type) {
      case 'MATCH':
        return `/study/${item.studyId}`;
      case 'INVITE':
        return '링크';
      case 'ARTICLE':
        return `/study/${item.studyId}`;
      case 'COMMENT':
        return `/study/${item.studyId}`;
      default:
        return '/';
    }
  };

  function notificationsLabel(cnt) {
    if (cnt === 0) {
      return 'no notifications';
    }
    if (cnt > 99) {
      return 'more than 99 notifications';
    }
    return `${cnt} notifications`;
  }

  const studyAccept = (studyId) => {
    axios
      .post(`/api/study/${studyId}/member/${yourId}`, [], {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then();
  };

  const studyReject = () => {
    axios.post(`/api/`);
  };

  const deleteAlert = (alertId) => {
    axios
      .delete(`/api/alert/${yourId}/${alertId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then(() => {
        getAlert();
        alert('수락되었어요!');
      })
      .catch(alert('요청에 실패하였습니다.'));
  };

  // ---------------------------css----------------------------------
  const ItemDesign = {
    textDecorationLine: 'none',
  };

  const styles = {
    position: 'absolute',
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: '1px solid',
    p: 1,
    backgroundColor: 'white',
    width: '400px',
  };

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={closeTooltip}
    >
      <div>
        <IconButton
          onClick={openTooltip}
          aria-label={notificationsLabel(count)}
        >
          <Badge color="primary" badgeContent={count}>
            <CampaignIcon />
          </Badge>
        </IconButton>
        {open ? (
          <div style={styles}>
            {alertList.length >= 1 ? (
              alertList.map((item) => (
                <div key={`alertItem${item.alertId}`}>
                  <a style={ItemDesign} href={getLink(item)}>
                    {item.message}
                  </a>
                  <button
                    key={`delete${item.alertId}`}
                    onClick={deleteAlert}
                    type="submit"
                  >
                    삭제
                  </button>
                  {item.type === 'INVITE' && (
                    <div>
                      <button
                        key={`accept${item.alertId}`}
                        onClick={() => studyAccept(item.studyId)}
                        type="submit"
                      >
                        수락
                      </button>
                      <button
                        key={`reject${item.alertId}`}
                        onClick={() => studyReject(item.studyId)}
                        type="submit"
                      >
                        거부
                      </button>
                    </div>
                  )}
                  <hr />
                </div>
              ))
            ) : (
              <div>아무 소식이 없어요..</div>
            )}
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}
