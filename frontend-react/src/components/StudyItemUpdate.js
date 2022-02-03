// import React, { useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
// } from '@mui/material';

// export default function StudyItemUpdate(props) {
//   const { item } = props;
//   const [inputTitle, setInputTitle] = useState('');
//   const [inputContent, setInputContent] = useState('');
//   const [inputCategory, setInputCategory] = useState('');
//   // const { handleClickClose } = props;

//   const handleInputTitle = (e) => {
//     setInputTitle(e.target.value);
//   };
//   const handleInputContent = (e) => {
//     setInputContent(e.target.value);
//   };
//   const handleInputCategory = (e) => {
//     setInputCategory(e.target.value);
//   };

//   const clickSubmit = () => {
//     axios
//       .put(
//         `/match/${item.articleId}?title=${inputTitle}&content=${inputContent}&category=${inputCategory}`
//       )
//       .then(goDetail)
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div>
//       <Dialog open fullWidth maxWidth="md">
//         <DialogTitle>(스터디)글 작성 폼</DialogTitle>
//         <DialogContent>
//           <div>
//             <TextField
//               autoFocus
//               margin="dense"
//               id="name"
//               label="제목"
//               type="title"
//               fullWidth
//               defaultValue={item.title}
//               variant="standard"
//               onChange={handleInputTitle}
//             />
//           </div>
//           <div>
//             <TextField
//               autoFocus
//               margin="dense"
//               label="카테고리"
//               type="text"
//               fullWidth
//               variant="outlined"
//               defaultValue={item.category}
//               multiline
//               onChange={handleInputCategory}
//             />
//           </div>
//           <div>
//             <TextField
//               autoFocus
//               margin="dense"
//               label="내용"
//               type="text"
//               fullWidth
//               variant="outlined"
//               defaultValue={item.content}
//               multiline
//               rows={15}
//               onChange={handleInputContent}
//             />
//           </div>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={onClickCreate}>작성</Button>
//           {/* <Button onClick={handleClickClose}>취소</Button> */}
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
