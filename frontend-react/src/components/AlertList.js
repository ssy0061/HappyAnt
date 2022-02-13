import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Tooltip, ClickAwayListener, Badge, IconButton } from '@mui/material';
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

  return (
    <ClickAwayListener onClickAway={closeTooltip}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={closeTooltip}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={
          alertList.length >= 1 ? (
            alertList.map((item) => (
              <div key={`alertItem${item.articleId}`}>
                <a style={ItemDesign} href={`/study/${item.studyId}`}>
                  {item.message}
                </a>
                <hr />
              </div>
            ))
          ) : (
            <div>아무 소식이 없어요</div>
          )
        }
      >
        <IconButton
          onClickAway={closeTooltip}
          aria-label={notificationsLabel(count)}
        >
          <Badge color="primary" badgeContent={count} onClick={openTooltip}>
            <CampaignIcon />
          </Badge>
        </IconButton>
      </Tooltip>
    </ClickAwayListener>
  );
}
