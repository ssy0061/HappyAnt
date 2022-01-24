import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Changeprofile from './Changeprofile';

// 37번째 줄 sx={style} 모달창 가운데 정렬하여 띄우기
const style = {
  position: 'absolute',
  // 배치(가운데 정렬)
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // 크기
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Btnguide() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>비밀번호 변경</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Changeprofile />
        </Box>
      </Modal>
    </div>
  );
}

export default Btnguide;
