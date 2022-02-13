import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import ContentEditor from './ContentEditor';

export default function StudyItemUpdate({ articleId, refresh }) {
  const { studyId } = useParams();
  const yourId = useSelector((state) => state.user.userInfo.userId);

  const [modalState, setModalState] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [종목기본정보, setBasicInfo] = useState('');
  const [투자아이디어, setIdea] = useState('');
  const [주요제품_서비스, setService] = useState('');
  const [경쟁사, setcompetition] = useState('');

  const [item, setItem] = useState('');

  // 마운트때는 실행하지 않고 item state가 변경됐을때만 실행 (처음 렌더링때 실행 안 한다)
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) setModalState(true);
    else didMount.current = true;
  }, [item]);

  const [itemChecked, setItemChecked] = useState([false, false, false, false]);

  const setText = (val) => {
    setContent(val);
  };

  const modalOpen = () => {
    axios
      .get(`/study/${studyId}/${articleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => console.log(err));
  };
  const modalClose = () => {
    setModalState(false);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleBasicInfo = (e) => {
    setBasicInfo(e.target.value);
  };
  const handleIdea = (e) => {
    setIdea(e.target.value);
  };
  const handleService = (e) => {
    setService(e.target.value);
  };
  const handleCompetition = (e) => {
    setcompetition(e.target.value);
  };
  const handleToggle = (value) => () => {
    const newChecked = [...itemChecked];
    newChecked[value] = !itemChecked[value];
    setItemChecked(newChecked);
  };

  // input form 양식
  const itemLabel = [
    '종목 기본정보',
    '투자 아이디어',
    '주요제품/서비스',
    '경쟁사',
  ];
  const itemRows = [3, 2, 2, 2];
  const itemInput = [
    handleBasicInfo,
    handleIdea,
    handleService,
    handleCompetition,
  ];

  // 작성 버튼 클릭
  const updateArticle = () => {
    const body = {
      title,
      content,
      loginUserId: yourId,
      // 종목기본정보,
      // 투자아이디어,
      // 주요제품_서비스,
      // 경쟁사,
    };
    console.log(종목기본정보, 투자아이디어, 주요제품_서비스, 경쟁사);

    axios
      .put(`/study/${studyId}/${articleId}`, [], {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: body,
      })
      .then((res) => {
        console.log(res);
        refresh();
        modalClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ----------------------------css ----------------------------
  const DialogTitleDesign = {
    backgroundColor: '#001E60',
    textAlign: 'left',
    color: 'white',
    marginLeft: '1.5rem',
    borderBottomLeftRadius: '1.5rem',
    fontWeight: 'bold',
  };

  return (
    <div>
      <button
        key={`updateButton${articleId}`}
        type="submit"
        onClick={modalOpen}
      >
        수정
      </button>
      <Dialog open={modalState} fullWidth maxWidth="md">
        <DialogTitle style={DialogTitleDesign}>
          게시글을 수정해주세요.
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="제목"
            type="title"
            fullWidth
            variant="standard"
            defaultValue={item.title}
            onChange={handleTitle}
          />
          <ContentEditor setText={setText} initialValue={item.content} />

          {/* ------------------체크박스------------------ */}
          <List
            sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }}
          >
            {[0, 1, 2, 3].map((value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem
                  key={value}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      <CommentIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(value)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={itemChecked[value]}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={`${itemLabel[value]}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          {/* -------체크박스 상태에 따라 보여지는 인풋 form------- */}
          {[0, 1, 2, 3].map(
            (index) =>
              itemChecked[index] && (
                <TextField
                  // autoFocus
                  key={index}
                  margin="dense"
                  label={itemLabel[index]}
                  type="text"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={itemRows[index]}
                  onChange={itemInput[index]}
                />
              )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={updateArticle}>완료</Button>
          <Button onClick={modalClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
