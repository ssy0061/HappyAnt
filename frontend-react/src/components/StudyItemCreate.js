import React, { useState } from 'react';
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
import { Wysiwyg } from '@mui/icons-material';
import ContentEditor from './ContentEditor';

export default function StudyItemCreate(props) {
  const { studyId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [종목기본정보, setBasicInfo] = useState('');
  const [투자아이디어, setIdea] = useState('');
  const [주요제품_서비스, setService] = useState('');
  const [경쟁사, setcompetition] = useState('');
  const [itemChecked, setItemChecked] = React.useState([
    false,
    false,
    false,
    false,
  ]);

  const userId = useSelector((state) => state.user.userInfo.userId);
  const { handleClickClose } = props;

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  // const handleContent = (e) => {
  //   setContent(e.target.value);
  // };
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
  const onClickCreate = () => {
    const body = {
      title,
      content,
      종목기본정보,
      투자아이디어,
      주요제품_서비스,
      경쟁사,
    };

    if (title === '' || content === '') {
      console.log('내용을 기입해주세요.');
    } else {
      axios
        .post(`/study/${studyId}`, body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          params: {
            loginUserId: userId,
          },
        })
        .then((res) => {
          console.log(res);
          handleClickClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // -----------------------------------css--------------------------------
  const DialogTitleDesign = {
    display: 'table',
    backgroundColor: '#001E60',
    textAlign: 'left',
    color: 'white',
    marginLeft: '1.5rem',
    borderBottomLeftRadius: '1.5rem',
    fontWeight: 'bold',
  };

  const DialogTitleText = {
    display: 'table-cell',
    verticalAlign: 'middle',
    marginTop: '0px',
    marginBottom: '0px',
  };
  const DialogTitleIcon = {
    display: 'table-cell',
    verticalAlign: 'middle',
    marginTop: '3px',
    marginRight: '-20px',
    marginBottom: '0px',
  };

  return (
    <div>
      <Dialog open fullWidth maxWidth="md">
        <DialogTitle style={DialogTitleDesign}>
          <Wysiwyg sx={{ fontSize: 25 }} style={DialogTitleIcon} />
          <p style={DialogTitleText}>Study 글쓰기</p>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="제목을 입력해 주세요."
            type="title"
            fullWidth
            variant="standard"
            onChange={handleTitle}
          />
          <ContentEditor setText={setContent} />
          {/* <TextField
            autoFocus
            margin="dense"
            label="내용"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={15}
            onChange={handleContent}
          /> */}
          <hr />
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
          <Button onClick={onClickCreate}>작성</Button>
          <Button onClick={handleClickClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
