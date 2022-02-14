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
      .get(`/alert/${yourId}`, {
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

  const getLink = (item) => {
    switch (item.alertType) {
      case 'MATCH':
        return '/match';
      case 'INVITE':
        return '링크';
      case 'ARTICLE':
        return `/study/${item.studyId}`;
      case 'COMMENT':
        return '링크';
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
                <div key={`alertItem${item.articleId}`}>
                  <a style={ItemDesign} href={getLink(item)}>
                    {item.message}
                  </a>
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
